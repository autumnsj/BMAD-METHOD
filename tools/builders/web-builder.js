const fs = require('node:fs').promises;
const path = require('node:path');
const DependencyResolver = require('../lib/dependency-resolver');
const yamlUtilities = require('../lib/yaml-utils');

class WebBuilder {
  constructor(options = {}) {
    this.rootDir = options.rootDir || process.cwd();
    this.outputDirs = options.outputDirs || [path.join(this.rootDir, 'dist')];
    this.resolver = new DependencyResolver(this.rootDir);
    this.templatePath = path.join(
      this.rootDir,
      'tools',
      'md-assets',
      'web-agent-startup-instructions.md',
    );
  }

  parseYaml(content) {
    const yaml = require('js-yaml');
    return yaml.load(content);
  }

  convertToWebPath(filePath, bundleRoot = 'bmad-core') {
    // Convert absolute paths to web bundle paths with dot prefix
    // All resources get installed under the bundle root, so use that path
    const relativePath = path.relative(this.rootDir, filePath);
    const pathParts = relativePath.split(path.sep);

    let resourcePath;
    if (pathParts[0] === 'expansion-packs') {
      // For expansion packs, remove 'expansion-packs/packname' and use the rest
      resourcePath = pathParts.slice(2).join('/');
    } else {
      // For bmad-core, common, etc., remove the first part
      resourcePath = pathParts.slice(1).join('/');
    }

    return `.${bundleRoot}/${resourcePath}`;
  }

  generateWebInstructions(bundleType, packName = null) {
    // Generate dynamic web instructions based on bundle type
    const rootExample = packName ? `.${packName}` : '.bmad-core';
    const examplePath = packName
      ? `.${packName}/folder/filename.md`
      : '.bmad-core/folder/filename.md';
    const personasExample = packName
      ? `.${packName}/personas/analyst.md`
      : '.bmad-core/personas/analyst.md';
    const tasksExample = packName
      ? `.${packName}/tasks/create-story.md`
      : '.bmad-core/tasks/create-story.md';
    const utilitiesExample = packName
      ? `.${packName}/utils/template-format.md`
      : '.bmad-core/utils/template-format.md';
    const tasksReference = packName
      ? `.${packName}/tasks/create-story.md`
      : '.bmad-core/tasks/create-story.md';

    return `# Web 代理捆绑包说明

您现在作为 BMad-Method 框架中的专业 AI 代理运行。这是一个捆绑的 Web 兼容版本，包含您角色所需的所有资源。

## 重要说明

1. **遵循所有启动命令**：您的代理配置包含定义您的行为、个性和方法的启动说明。这些必须严格遵守。

2. **资源导航**：此捆绑包包含您所需的所有资源。资源标有以下标签：

- \`==================== START: ${examplePath} ====================\`
- \`==================== END: ${examplePath} ====================\`

当您需要引用说明中提到的资源时：

- 查找相应的 START/END 标签
- 格式始终是带有点前缀的完整路径（例如，\`${personasExample}\`、\`${tasksExample}\`）
- 如果指定了某个部分（例如，\`{root}/tasks/create-story.md#section-name\`），请导航到文件中的该部分

**理解 YAML 引用**：在代理配置中，资源在依赖项部分中引用。例如：

\`\`\`yaml
dependencies:
  utils:
    - template-format
  tasks:
    - create-story
\`\`\`

这些引用直接映射到捆绑包部分：

- \`utils: template-format\` → 查找 \`==================== START: ${utilitiesExample} ====================\`
- \`tasks: create-story\` → 查找 \`==================== START: ${tasksReference} ====================\`

3. **执行上下文**：您正在 Web 环境中运行。您的所有能力和知识都包含在此捆绑包中。在此限制内工作，以提供最佳帮助。

4. **主要指令**：您的主要目标在下面的代理配置中定义。专注于根据 BMad-Method 框架履行您指定的角色。

---

`;
  }

  async cleanOutputDirs() {
    for (const dir of this.outputDirs) {
      try {
        await fs.rm(dir, { recursive: true, force: true });
        console.log(`已清理: ${path.relative(this.rootDir, dir)}`);
      } catch (error) {
        console.debug(`清理目录 ${dir} 失败:`, error.message);
        // Directory might not exist, that's fine
      }
    }
  }

  async buildAgents() {
    const agents = await this.resolver.listAgents();

    for (const agentId of agents) {
      console.log(`  正在构建代理: ${agentId}`);
      const bundle = await this.buildAgentBundle(agentId);

      // Write to all output directories
      for (const outputDir of this.outputDirs) {
        const outputPath = path.join(outputDir, 'agents');
        await fs.mkdir(outputPath, { recursive: true });
        const outputFile = path.join(outputPath, `${agentId}.txt`);
        await fs.writeFile(outputFile, bundle, 'utf8');
      }
    }

    console.log(`已在 ${this.outputDirs.length} 个位置构建了 ${agents.length} 个代理捆绑包`);
  }

  async buildTeams() {
    const teams = await this.resolver.listTeams();

    for (const teamId of teams) {
      console.log(`  正在构建团队: ${teamId}`);
      const bundle = await this.buildTeamBundle(teamId);

      // Write to all output directories
      for (const outputDir of this.outputDirs) {
        const outputPath = path.join(outputDir, 'teams');
        await fs.mkdir(outputPath, { recursive: true });
        const outputFile = path.join(outputPath, `${teamId}.txt`);
        await fs.writeFile(outputFile, bundle, 'utf8');
      }
    }

    console.log(`已在 ${this.outputDirs.length} 个位置构建了 ${teams.length} 个团队捆绑包`);
  }

  async buildAgentBundle(agentId) {
    const dependencies = await this.resolver.resolveAgentDependencies(agentId);
    const template = this.generateWebInstructions('agent');

    const sections = [template];

    // Add agent configuration
    const agentPath = this.convertToWebPath(dependencies.agent.path, 'bmad-core');
    sections.push(this.formatSection(agentPath, dependencies.agent.content, 'bmad-core'));

    // Add all dependencies
    for (const resource of dependencies.resources) {
      const resourcePath = this.convertToWebPath(resource.path, 'bmad-core');
      sections.push(this.formatSection(resourcePath, resource.content, 'bmad-core'));
    }

    return sections.join('\n');
  }

  async buildTeamBundle(teamId) {
    const dependencies = await this.resolver.resolveTeamDependencies(teamId);
    const template = this.generateWebInstructions('team');

    const sections = [template];

    // Add team configuration
    const teamPath = this.convertToWebPath(dependencies.team.path, 'bmad-core');
    sections.push(this.formatSection(teamPath, dependencies.team.content, 'bmad-core'));

    // Add all agents
    for (const agent of dependencies.agents) {
      const agentPath = this.convertToWebPath(agent.path, 'bmad-core');
      sections.push(this.formatSection(agentPath, agent.content, 'bmad-core'));
    }

    // Add all deduplicated resources
    for (const resource of dependencies.resources) {
      const resourcePath = this.convertToWebPath(resource.path, 'bmad-core');
      sections.push(this.formatSection(resourcePath, resource.content, 'bmad-core'));
    }

    return sections.join('\n');
  }

  processAgentContent(content) {
    // First, replace content before YAML with the template
    const yamlContent = yamlUtilities.extractYamlFromAgent(content);
    if (!yamlContent) return content;

    const yamlMatch = content.match(/```ya?ml\n([\s\S]*?)\n```/);
    if (!yamlMatch) return content;

    const yamlStartIndex = content.indexOf(yamlMatch[0]);
    const yamlEndIndex = yamlStartIndex + yamlMatch[0].length;

    // Parse YAML and remove root and IDE-FILE-RESOLUTION properties
    try {
      const yaml = require('js-yaml');
      const parsed = yaml.load(yamlContent);

      // Remove the properties if they exist at root level
      delete parsed.root;
      delete parsed['IDE-FILE-RESOLUTION'];
      delete parsed['REQUEST-RESOLUTION'];

      // Also remove from activation-instructions if they exist
      if (parsed['activation-instructions'] && Array.isArray(parsed['activation-instructions'])) {
        parsed['activation-instructions'] = parsed['activation-instructions'].filter(
          (instruction) => {
            return (
              typeof instruction === 'string' &&
              !instruction.startsWith('IDE-FILE-RESOLUTION:') &&
              !instruction.startsWith('REQUEST-RESOLUTION:')
            );
          },
        );
      }

      // Reconstruct the YAML
      const cleanedYaml = yaml.dump(parsed, { lineWidth: -1 });

      // Get the agent name from the YAML for the header
      const agentName = parsed.agent?.id || 'agent';

      // Build the new content with just the agent header and YAML
      const newHeader = `# ${agentName}\n\n重要提示：阅读完整的 YAML，开始激活以改变您的存在状态，遵循启动部分说明，在此状态下保持直到被告知退出此模式：\n\n`;
      const afterYaml = content.slice(Math.max(0, yamlEndIndex));

      return newHeader + '```yaml\n' + cleanedYaml.trim() + '\n```' + afterYaml;
    } catch (error) {
      console.warn('处理代理 YAML 失败:', error.message);
      // If parsing fails, return original content
      return content;
    }
  }

  formatSection(path, content, bundleRoot = 'bmad-core') {
    const separator = '====================';

    // Process agent content if this is an agent file
    if (path.includes('/agents/')) {
      content = this.processAgentContent(content);
    }

    // Replace {root} references with the actual bundle root
    content = this.replaceRootReferences(content, bundleRoot);

    return [
      `${separator} START: ${path} ${separator}`,
      content.trim(),
      `${separator} END: ${path} ${separator}`,
      '',
    ].join('\n');
  }

  replaceRootReferences(content, bundleRoot) {
    // Replace {root} with the appropriate bundle root path
    return content.replaceAll('{root}', `.${bundleRoot}`);
  }

  async validate() {
    console.log('正在验证代理配置...');
    const agents = await this.resolver.listAgents();
    for (const agentId of agents) {
      try {
        await this.resolver.resolveAgentDependencies(agentId);
        console.log(`  ✓ ${agentId}`);
      } catch (error) {
        console.log(`  ✗ ${agentId}: ${error.message}`);
        throw error;
      }
    }

    console.log('\n正在验证团队配置...');
    const teams = await this.resolver.listTeams();
    for (const teamId of teams) {
      try {
        await this.resolver.resolveTeamDependencies(teamId);
        console.log(`  ✓ ${teamId}`);
      } catch (error) {
        console.log(`  ✗ ${teamId}: ${error.message}`);
        throw error;
      }
    }
  }

  async buildAllExpansionPacks(options = {}) {
    const expansionPacks = await this.listExpansionPacks();

    for (const packName of expansionPacks) {
      console.log(`  正在构建扩展包: ${packName}`);
      await this.buildExpansionPack(packName, options);
    }

    console.log(`已构建 ${expansionPacks.length} 个扩展包捆绑包`);
  }

  async buildExpansionPack(packName, options = {}) {
    const packDir = path.join(this.rootDir, 'expansion-packs', packName);
    const outputDirectories = [path.join(this.rootDir, 'dist', 'expansion-packs', packName)];

    // Clean output directories if requested
    if (options.clean !== false) {
      for (const outputDir of outputDirectories) {
        try {
          await fs.rm(outputDir, { recursive: true, force: true });
        } catch {
          // Directory might not exist, that's fine
        }
      }
    }

    // Build individual agents first
    const agentsDir = path.join(packDir, 'agents');
    try {
      const agentFiles = await fs.readdir(agentsDir);
      const agentMarkdownFiles = agentFiles.filter((f) => f.endsWith('.md'));

      if (agentMarkdownFiles.length > 0) {
        console.log(`    正在为 ${packName} 构建单个代理:`);

        for (const agentFile of agentMarkdownFiles) {
          const agentName = agentFile.replace('.md', '');
          console.log(`      - ${agentName}`);

          // Build individual agent bundle
          const bundle = await this.buildExpansionAgentBundle(packName, packDir, agentName);

          // Write to all output directories
          for (const outputDir of outputDirectories) {
            const agentsOutputDir = path.join(outputDir, 'agents');
            await fs.mkdir(agentsOutputDir, { recursive: true });
            const outputFile = path.join(agentsOutputDir, `${agentName}.txt`);
            await fs.writeFile(outputFile, bundle, 'utf8');
          }
        }
      }
    } catch {
      console.debug(`    未找到 ${packName} 的代理目录`);
    }

    // Build team bundle
    const agentTeamsDir = path.join(packDir, 'agent-teams');
    try {
      const teamFiles = await fs.readdir(agentTeamsDir);
      const teamFile = teamFiles.find((f) => f.endsWith('.yaml'));

      if (teamFile) {
        console.log(`    正在为 ${packName} 构建团队捆绑包`);
        const teamConfigPath = path.join(agentTeamsDir, teamFile);

        // Build expansion pack as a team bundle
        const bundle = await this.buildExpansionTeamBundle(packName, packDir, teamConfigPath);

        // Write to all output directories
        for (const outputDir of outputDirectories) {
          const teamsOutputDir = path.join(outputDir, 'teams');
          await fs.mkdir(teamsOutputDir, { recursive: true });
          const outputFile = path.join(teamsOutputDir, teamFile.replace('.yaml', '.txt'));
          await fs.writeFile(outputFile, bundle, 'utf8');
          console.log(`    ✓ 已创建捆绑包: ${path.relative(this.rootDir, outputFile)}`);
        }
      } else {
        console.warn(`    ⚠ 在 ${packName}/agent-teams/ 中未找到团队配置`);
      }
    } catch {
      console.warn(`    ⚠ 未找到 ${packName} 的 agent-teams 目录`);
    }
  }

  async buildExpansionAgentBundle(packName, packDir, agentName) {
    const template = this.generateWebInstructions('expansion-agent', packName);
    const sections = [template];

    // Add agent configuration
    const agentPath = path.join(packDir, 'agents', `${agentName}.md`);
    const agentContent = await fs.readFile(agentPath, 'utf8');
    const agentWebPath = this.convertToWebPath(agentPath, packName);
    sections.push(this.formatSection(agentWebPath, agentContent, packName));

    // Resolve and add agent dependencies
    const yamlContent = yamlUtilities.extractYamlFromAgent(agentContent);
    if (yamlContent) {
      try {
        const yaml = require('js-yaml');
        const agentConfig = yaml.load(yamlContent);

        if (agentConfig.dependencies) {
          // Add resources, first try expansion pack, then core
          for (const [resourceType, resources] of Object.entries(agentConfig.dependencies)) {
            if (Array.isArray(resources)) {
              for (const resourceName of resources) {
                let found = false;

                // Try expansion pack first
                const resourcePath = path.join(packDir, resourceType, resourceName);
                try {
                  const resourceContent = await fs.readFile(resourcePath, 'utf8');
                  const resourceWebPath = this.convertToWebPath(resourcePath, packName);
                  sections.push(this.formatSection(resourceWebPath, resourceContent, packName));
                  found = true;
                } catch {
                  // Not in expansion pack, continue
                }

                // If not found in expansion pack, try core
                if (!found) {
                  const corePath = path.join(this.rootDir, 'bmad-core', resourceType, resourceName);
                  try {
                    const coreContent = await fs.readFile(corePath, 'utf8');
                    const coreWebPath = this.convertToWebPath(corePath, packName);
                    sections.push(this.formatSection(coreWebPath, coreContent, packName));
                    found = true;
                  } catch {
                    // Not in core either, continue
                  }
                }

                // If not found in core, try common folder
                if (!found) {
                  const commonPath = path.join(this.rootDir, 'common', resourceType, resourceName);
                  try {
                    const commonContent = await fs.readFile(commonPath, 'utf8');
                    const commonWebPath = this.convertToWebPath(commonPath, packName);
                    sections.push(this.formatSection(commonWebPath, commonContent, packName));
                    found = true;
                  } catch {
                    // Not in common either, continue
                  }
                }

                if (!found) {
                  console.warn(
                    `    ⚠ 依赖项 ${resourceType}#${resourceName} 在扩展包或核心中未找到`,
                  );
                }
              }
            }
          }
        }
      } catch (error) {
        console.debug(`解析代理 YAML 失败 ${agentName}:`, error.message);
      }
    }

    return sections.join('\n');
  }

  async buildExpansionTeamBundle(packName, packDir, teamConfigPath) {
    const template = this.generateWebInstructions('expansion-team', packName);

    const sections = [template];

    // Add team configuration and parse to get agent list
    const teamContent = await fs.readFile(teamConfigPath, 'utf8');
    const teamFileName = path.basename(teamConfigPath, '.yaml');
    const teamConfig = this.parseYaml(teamContent);
    const teamWebPath = this.convertToWebPath(teamConfigPath, packName);
    sections.push(this.formatSection(teamWebPath, teamContent, packName));

    // Get list of expansion pack agents
    const expansionAgents = new Set();
    const agentsDir = path.join(packDir, 'agents');
    try {
      const agentFiles = await fs.readdir(agentsDir);
      for (const agentFile of agentFiles.filter((f) => f.endsWith('.md'))) {
        const agentName = agentFile.replace('.md', '');
        expansionAgents.add(agentName);
      }
    } catch {
      console.warn(`    ⚠ 在 ${packName} 中未找到代理目录`);
    }

    // Build a map of all available expansion pack resources for override checking
    const expansionResources = new Map();
    const resourceDirectories = ['templates', 'tasks', 'checklists', 'workflows', 'data'];
    for (const resourceDir of resourceDirectories) {
      const resourcePath = path.join(packDir, resourceDir);
      try {
        const resourceFiles = await fs.readdir(resourcePath);
        for (const resourceFile of resourceFiles.filter(
          (f) => f.endsWith('.md') || f.endsWith('.yaml'),
        )) {
          expansionResources.set(`${resourceDir}#${resourceFile}`, true);
        }
      } catch {
        // Directory might not exist, that's fine
      }
    }

    // Process all agents listed in team configuration
    const agentsToProcess = teamConfig.agents || [];

    // Ensure bmad-orchestrator is always included for teams
    if (!agentsToProcess.includes('bmad-orchestrator')) {
      console.warn(`    ⚠ 团队 ${teamFileName} 缺少 bmad-orchestrator，已自动添加`);
      agentsToProcess.unshift('bmad-orchestrator');
    }

    // Track all dependencies from all agents (deduplicated)
    const allDependencies = new Map();

    for (const agentId of agentsToProcess) {
      if (expansionAgents.has(agentId)) {
        // Use expansion pack version (override)
        const agentPath = path.join(agentsDir, `${agentId}.md`);
        const agentContent = await fs.readFile(agentPath, 'utf8');
        const expansionAgentWebPath = this.convertToWebPath(agentPath, packName);
        sections.push(this.formatSection(expansionAgentWebPath, agentContent, packName));

        // Parse and collect dependencies from expansion agent
        const agentYaml = agentContent.match(/```yaml\n([\s\S]*?)\n```/);
        if (agentYaml) {
          try {
            const agentConfig = this.parseYaml(agentYaml[1]);
            if (agentConfig.dependencies) {
              for (const [resourceType, resources] of Object.entries(agentConfig.dependencies)) {
                if (Array.isArray(resources)) {
                  for (const resourceName of resources) {
                    const key = `${resourceType}#${resourceName}`;
                    if (!allDependencies.has(key)) {
                      allDependencies.set(key, { type: resourceType, name: resourceName });
                    }
                  }
                }
              }
            }
          } catch (error) {
            console.debug(`解析代理 YAML 失败 ${agentId}:`, error.message);
          }
        }
      } else {
        // Use core BMad version
        try {
          const coreAgentPath = path.join(this.rootDir, 'bmad-core', 'agents', `${agentId}.md`);
          const coreAgentContent = await fs.readFile(coreAgentPath, 'utf8');
          const coreAgentWebPath = this.convertToWebPath(coreAgentPath, packName);
          sections.push(this.formatSection(coreAgentWebPath, coreAgentContent, packName));

          // Parse and collect dependencies from core agent
          const yamlContent = yamlUtilities.extractYamlFromAgent(coreAgentContent, true);
          if (yamlContent) {
            try {
              const agentConfig = this.parseYaml(yamlContent);
              if (agentConfig.dependencies) {
                for (const [resourceType, resources] of Object.entries(agentConfig.dependencies)) {
                  if (Array.isArray(resources)) {
                    for (const resourceName of resources) {
                      const key = `${resourceType}#${resourceName}`;
                      if (!allDependencies.has(key)) {
                        allDependencies.set(key, { type: resourceType, name: resourceName });
                      }
                    }
                  }
                }
              }
            } catch (error) {
              console.debug(`解析代理 YAML 失败 ${agentId}:`, error.message);
            }
          }
        } catch {
          console.warn(`    ⚠ 代理 ${agentId} 在核心或扩展包中未找到`);
        }
      }
    }

    // Add all collected dependencies from agents
    // Always prefer expansion pack versions if they exist
    for (const [key, dep] of allDependencies) {
      let found = false;

      // Always check expansion pack first, even if the dependency came from a core agent
      if (expansionResources.has(key)) {
        // We know it exists in expansion pack, find and load it
        const expansionPath = path.join(packDir, dep.type, dep.name);
        try {
          const content = await fs.readFile(expansionPath, 'utf8');
          const expansionWebPath = this.convertToWebPath(expansionPath, packName);
          sections.push(this.formatSection(expansionWebPath, content, packName));
          console.log(`      ✓ 正在使用 ${key} 的扩展覆盖`);
          found = true;
        } catch {
          // Try next extension
        }
      }

      // If not found in expansion pack (or doesn't exist there), try core
      if (!found) {
        const corePath = path.join(this.rootDir, 'bmad-core', dep.type, dep.name);
        try {
          const content = await fs.readFile(corePath, 'utf8');
          const coreWebPath = this.convertToWebPath(corePath, packName);
          sections.push(this.formatSection(coreWebPath, content, packName));
          found = true;
        } catch {
          // Not in core either, continue
        }
      }

      // If not found in core, try common folder
      if (!found) {
        const commonPath = path.join(this.rootDir, 'common', dep.type, dep.name);
        try {
          const content = await fs.readFile(commonPath, 'utf8');
          const commonWebPath = this.convertToWebPath(commonPath, packName);
          sections.push(this.formatSection(commonWebPath, content, packName));
          found = true;
        } catch {
          // Not in common either, continue
        }
      }

      if (!found) {
        console.warn(`    ⚠ 依赖项 ${key} 在扩展包或核心中未找到`);
      }
    }

    // Add remaining expansion pack resources not already included as dependencies
    for (const resourceDir of resourceDirectories) {
      const resourcePath = path.join(packDir, resourceDir);
      try {
        const resourceFiles = await fs.readdir(resourcePath);
        for (const resourceFile of resourceFiles.filter(
          (f) => f.endsWith('.md') || f.endsWith('.yaml'),
        )) {
          const filePath = path.join(resourcePath, resourceFile);
          const fileContent = await fs.readFile(filePath, 'utf8');
          const fileName = resourceFile.replace(/\.(md|yaml)$/, '');

          // Only add if not already included as a dependency
          const resourceKey = `${resourceDir}#${fileName}`;
          if (!allDependencies.has(resourceKey)) {
            const fullResourcePath = path.join(resourcePath, resourceFile);
            const resourceWebPath = this.convertToWebPath(fullResourcePath, packName);
            sections.push(this.formatSection(resourceWebPath, fileContent, packName));
          }
        }
      } catch {
        // Directory might not exist, that's fine
      }
    }

    return sections.join('\n');
  }

  async listExpansionPacks() {
    const expansionPacksDir = path.join(this.rootDir, 'expansion-packs');
    try {
      const entries = await fs.readdir(expansionPacksDir, { withFileTypes: true });
      return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
    } catch {
      console.warn('未找到 expansion-packs 目录');
      return [];
    }
  }

  listAgents() {
    return this.resolver.listAgents();
  }
}

module.exports = WebBuilder;

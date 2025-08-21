<!-- 由 BMAD™ 核心驱动 -->

# BMad 知识库 - 2D Unity 游戏开发

## 概述

这是 BMad-Method（敏捷 AI 驱动开发的突破性方法）的游戏开发扩展，专门用于使用 Unity 和 C# 创建 2D 游戏。v4 系统引入了模块化架构，改进了依赖管理、包优化，并支持 Web 和 IDE 环境，特别为游戏开发工作流程进行了优化。

### 游戏开发的主要特点

- **游戏专用代理系统**：为每个游戏开发角色（设计师、开发者、Scrum Master）配备的 AI 代理
- **Unity 优化的构建系统**：游戏资产和脚本的自动依赖解析
- **双环境支持**：针对 Web UI 和游戏开发 IDE 进行了优化
- **游戏开发资源**：针对 2D Unity 游戏的专用模板、任务和清单
- **性能优先方法**：内置用于跨平台游戏部署的优化模式

### 游戏开发重点

- **目标引擎**：Unity 2022 LTS 或更新版本，使用 C# 10+
- **平台策略**：跨平台（PC、主机、移动设备），专注于 2D
- **开发方法**：采用游戏特定工作流程的敏捷故事驱动开发
- **性能目标**：在目标设备上实现稳定的帧率
- **架构**：使用 Unity 最佳实践的基于组件的架构

### 何时使用 BMad 进行游戏开发

- **新游戏项目（绿地）**：从概念到部署的完整端到端游戏开发
- **现有游戏项目（棕地）**：功能添加、关卡扩展和游戏性增强
- **游戏团队协作**：多个专业角色共同开发游戏功能
- **游戏质量保证**：结构化测试、性能验证和游戏性平衡
- **游戏文档**：专业的游戏设计文档、技术架构、用户故事

## BMad 如何用于游戏开发

### 核心方法

BMad 将您转变为“玩家体验 CEO”——通过结构化的工作流程指导一支专业的游戏开发 AI 代理团队。工作方式如下：

1. **您指导，AI 执行**：您提供游戏愿景和创意决策；代理处理实施细节
2. **专业游戏代理**：每个代理都精通一个游戏开发角色（设计师、开发者、Scrum Master）
3. **以游戏为中心的工作流程**：经过验证的模式指导您从游戏概念到已部署的 2D Unity 游戏
4. **清晰的交接**：全新的上下文窗口确保代理在游戏开发中保持专注和高效

### 两阶段游戏开发方法

#### 阶段 1：游戏设计与规划（Web UI - 经济高效）

- 使用大型上下文窗口进行全面的游戏设计
- 生成完整的游戏设计文档和技术架构
- 利用多个代理进行创意头脑风暴和机制优化
- 一次创建，贯穿整个游戏开发过程

#### 阶段 2：游戏开发（IDE - 实施）

- 将游戏设计文档分片为可管理的部分
- 为游戏功能执行专注的 SM → Dev 周期
- 一次一个游戏故事，顺序进行
- 实时 Unity 操作、C# 编码和游戏测试

### 游戏开发循环

```text
1. 游戏 SM 代理（新聊天）→ 从分片文档中创建下一个游戏故事
2. 您 → 审查并批准游戏故事
3. 游戏开发代理（新聊天）→ 在 Unity 中实施已批准的游戏功能
4. QA 代理（新聊天）→ 审查代码并测试游戏性
5. 您 → 验证游戏功能完成情况
6. 重复直到游戏史诗完成
```

### 为什么这适用于游戏

- **上下文优化**：干净的聊天 = 更好的 AI 性能，适用于复杂的游戏逻辑
- **角色清晰**：代理不进行上下文切换 = 更高质量的游戏功能
- **增量进展**：小游戏故事 = 可管理的复杂性
- **以玩家为中心的监督**：您验证每个游戏功能 = 质量控制
- **设计驱动**：游戏规格指导一切 = 一致的玩家体验

### 核心游戏开发理念

#### 玩家至上的开发

您正在以“玩家体验 CEO”的身份开发游戏——像一位拥有无限创意资源和对玩家享受有单一愿景的游戏总监一样思考。

#### 游戏开发原则

1. **最大化玩家参与度**：推动 AI 创造引人入胜的游戏性。挑战机制并进行迭代。
2. **游戏性质量控制**：您是乐趣的最终仲裁者。审查所有游戏功能。
3. **创意监督**：保持高层次的游戏愿景并确保设计一致性。
4. **迭代优化**：期望重新审视游戏机制。游戏开发不是线性的。
5. **清晰的游戏说明**：精确的游戏要求带来更好的实施。
6. **文档是关键**：好的游戏设计文档带来好的游戏功能。
7. **从小处着手，快速扩展**：首先测试核心机制，然后扩展和润色。
8. **拥抱创意混乱**：适应并克服游戏开发挑战。

## 开始游戏开发

### 游戏开发快速入门选项

#### 选项 1：用于游戏设计的 Web UI

**最适合**：希望从全面规划开始的游戏设计师

1. 导航到 `dist/teams/`（构建后）
2. 复制 `unity-2d-game-team.txt` 内容
3. 创建新的 Gemini Gem 或 CustomGPT
4. 上传文件并附上说明：“您的关键操作说明已附上，请按指示不要脱离角色”
5. 输入 `/help` 查看可用的游戏开发命令

#### 选项 2：用于游戏开发的 IDE 集成

**最适合**：使用 Cursor、Claude Code、Windsurf、Trae、Cline、Roo Code、Github Copilot 的 Unity 开发者

```bash
# 交互式安装（推荐）
npx bmad-method install
# 出现提示时选择 bmad-2d-unity-game-dev 扩展包
```

**游戏开发安装步骤**：

- 出现提示时选择“安装扩展包”
- 从列表中选择“bmad-2d-unity-game-dev”
- 从支持的选项中选择您的 IDE：
  - **Cursor**：具有 Unity 支持的原生 AI 集成
  - **Claude Code**：Anthropic 的官方 IDE
  - **Windsurf**：内置 AI 功能
  - **Trae**：内置 AI 功能
  - **Cline**：具有 AI 功能的 VS Code 扩展
  - **Roo Code**：具有代理支持的基于 Web 的 IDE
  - **GitHub Copilot**：具有 AI 同行编程助手的 VS Code 扩展

**验证游戏开发安装**：

- 创建了 `.bmad-core/` 文件夹，包含所有核心代理
- `.bmad-2d-unity-game-dev/` 文件夹，包含游戏开发代理
- 创建了特定于 IDE 的集成文件
- 游戏开发代理可通过 `/bmad2du` 前缀使用（根据 config.yaml）

### 游戏开发环境选择指南

**使用 Web UI 用于**：

- 游戏设计文档创建和头脑风暴
- 经济高效的全面游戏规划（尤其是在使用 Gemini 时）
- 多代理游戏设计咨询
- 创意构思和机制优化

**使用 IDE 用于**：

- Unity 项目开发和 C# 编码
- 游戏资产操作和项目集成
- 游戏故事管理和开发工作流程
- Unity 测试、分析和调试

**游戏开发成本节约技巧**：在 Web UI 中创建大型游戏设计文档，然后在切换到 IDE 进行开发之前，将它们复制到 Unity 项目的 `docs/game-design-doc.md` 和 `docs/game-architecture.md` 中。

### 仅 IDE 的游戏开发工作流程考虑

**您可以在 IDE 中完成所有事情吗？** 是的，但要了解游戏开发的权衡：

**仅 IDE 游戏开发的优点**：

- 从设计到 Unity 部署的单一环境工作流程
- 从一开始就直接进行 Unity 项目操作
- 无需在环境之间复制/粘贴
- 即时 Unity 项目集成

**仅 IDE 游戏开发的缺点**：

- 创建大型游戏设计文档的 token 成本更高
- 用于全面游戏规划的上下文窗口较小
- 在创意头脑风暴阶段可能会达到限制
- 对于广泛的游戏设计迭代来说，成本效益较低

**游戏开发的关键规则**：

- **始终使用游戏 SM 代理创建故事** - 切勿使用 bmad-master 或 bmad-orchestrator
- **始终使用游戏开发代理进行 Unity 实施** - 切勿使用 bmad-master 或 bmad-orchestrator
- **为什么这很重要**：游戏 SM 和游戏开发代理专门针对 Unity 工作流程进行了优化
- **无例外**：即使使用 bmad-master 进行设计，也要切换到游戏 SM → 游戏开发进行实施

## 游戏开发的核心配置 (core-config.yaml)

**V4 中的新功能**：`expansion-packs/bmad-2d-unity-game-dev/core-config.yaml` 文件使 BMad 能够与任何 Unity 项目结构无缝协作，为游戏开发提供最大的灵活性。

### 游戏开发配置

该扩展包遵循标准的 BMad 配置模式。将您的 core-config.yaml 文件复制到 expansion-packs/bmad-2d-unity-game-dev/ 并将游戏特定配置添加到您项目的 `core-config.yaml` 中：

```yaml
markdownExploder: true
prd:
  prdFile: docs/prd.md
  prdVersion: v4
  prdSharded: true
  prdShardedLocation: docs/prd
  epicFilePattern: epic-{n}*.md
architecture:
  architectureFile: docs/architecture.md
  architectureVersion: v4
  architectureSharded: true
  architectureShardedLocation: docs/architecture
gdd:
  gddVersion: v4
  gddSharded: true
  gddLocation: docs/game-design-doc.md
  gddShardedLocation: docs/gdd
  epicFilePattern: epic-{n}*.md
gamearchitecture:
  gamearchitectureFile: docs/architecture.md
  gamearchitectureVersion: v3
  gamearchitectureLocation: docs/game-architecture.md
  gamearchitectureSharded: true
  gamearchitectureShardedLocation: docs/game-architecture
gamebriefdocLocation: docs/game-brief.md
levelDesignLocation: docs/level-design.md
#指定您的 unity 编辑器的位置
unityEditorLocation: /home/USER/Unity/Hub/Editor/VERSION/Editor/Unity
customTechnicalDocuments: null
devDebugLog: .ai/debug-log.md
devStoryLocation: docs/stories
slashPrefix: bmad2du
#在分片您的 gamearchitecture 文档后，用这个替换旧的 devLoadAlwaysFiles
devLoadAlwaysFiles:
  - docs/game-architecture/9-coding-standards.md
  - docs/game-architecture/3-tech-stack.md
  - docs/game-architecture/8-unity-project-structure.md
```

## 完整的游戏开发工作流程

### 规划阶段（推荐使用 Web UI - 尤其是 Gemini 用于游戏设计！）

**对于具有 Gemini 大量上下文的游戏头脑风暴，具有成本效益的理想选择：**

**对于所有游戏项目**：

1. **游戏概念头脑风暴**：`/bmad2du/game-designer` - 使用 `*game-design-brainstorming` 任务
2. **游戏简介**：使用 `game-brief-tmpl` 创建基础游戏文档
3. **游戏设计文档创建**：`/bmad2du/game-designer` - 使用 `game-design-doc-tmpl` 获取全面的游戏要求
4. **游戏架构设计**：`/bmad2du/game-architect` - 使用 `game-architecture-tmpl` 获取 Unity 技术基础
5. **关卡设计框架**：`/bmad2du/game-designer` - 使用 `level-design-doc-tmpl` 进行关卡结构规划
6. **文档准备**：将最终文档复制到 Unity 项目中，作为 `docs/game-design-doc.md`、`docs/game-brief.md`、`docs/level-design.md` 和 `docs/game-architecture.md`

#### 游戏规划提示示例

**用于游戏设计文档创建**：

```text
"我想构建一个 [类型] 的 2D 游戏，它 [核心游戏性]。
帮我进行机制头脑风暴并创建一个全面的游戏设计文档。"
```

**用于游戏架构设计**：

```text
"基于这个游戏设计文档，设计一个可扩展的 Unity 架构
，可以处理 [特定游戏要求] 并具有稳定的性能。"
```

### 关键过渡：从 Web UI 到 Unity IDE

**游戏规划完成后，您必须切换到 IDE 进行 Unity 开发：**

- **原因**：Unity 开发工作流程需要 C# 操作、资产管理和实时 Unity 测试
- **成本效益**：Web UI 对于大型游戏设计创建更具成本效益；IDE 针对 Unity 开发进行了优化
- **所需文件**：确保您的 Unity 项目中存在 `docs/game-design-doc.md` 和 `docs/game-architecture.md`

### Unity IDE 开发工作流程

**先决条件**：游戏规划文档必须存在于 Unity 项目的 `docs/` 文件夹中

1. **文档分片**（游戏开发的关键步骤）：
   - 由游戏设计师/架构师创建的文档（在 Web 或 IDE 中）必须为开发进行分片
   - 使用核心 BMad 代理或工具进行分片：
     a) **手动**：如果可用，使用核心 BMad `shard-doc` 任务
     b) **代理**：要求核心 `@bmad-master` 代理对文档进行分片
   - 将 `docs/game-design-doc.md` 分片到 `docs/game-design/` 文件夹
   - 将 `docs/game-architecture.md` 分片到 `docs/game-architecture/` 文件夹
   - **警告**：不要在 Web UI 中进行分片 - 将许多小文件复制到 Unity 很痛苦！

2. **验证分片的游戏内容**：
   - `docs/game-design/` 中至少有一个 `feature-n.md` 文件，其中包含按开发顺序排列的游戏故事
   - 用于游戏开发代理参考的 Unity 系统文档和编码标准
   - 用于游戏 SM 代理故事创建的分片文档

生成的 Unity 项目文件夹结构：

- `docs/game-design/` - 分解的游戏设计部分
- `docs/game-architecture/` - 分解的 Unity 架构部分
- `docs/game-stories/` - 生成的游戏开发故事

3. **游戏开发周期**（顺序进行，一次一个游戏故事）：

   **Unity 开发的关键上下文管理**：
   - **上下文窗口很重要！** 始终使用全新的、干净的上下文窗口
   - **模型选择很重要！** 为游戏 SM 故事创建使用最强大的思维模型
   - **始终在游戏 SM、游戏开发和 QA 工作之间开始新的聊天**

   **步骤 1 - 游戏故事创建**：
   - **新的干净聊天** → 选择强大的模型 → `/bmad2du/game-sm` → `*draft`
   - 游戏 SM 使用 `game-story-tmpl` 执行 create-game-story 任务
   - 在 `docs/game-stories/` 中审查生成的故事
   - 将状态从“草稿”更新为“已批准”

   **步骤 2 - Unity 游戏故事实施**：
   - **新的干净聊天** → `/bmad2du/game-developer`
   - 代理询问要实施哪个游戏故事
   - 包括故事文件内容以节省游戏开发代理的查找时间
   - 游戏开发人员遵循任务/子任务，标记完成情况
   - 游戏开发人员维护所有 Unity/C# 更改的文件列表
   - 游戏开发人员在完成所有 Unity 测试后将故事标记为“审查”

   **步骤 3 - 游戏 QA 审查**：
   - **新的干净聊天** → 使用核心 `@qa` 代理 → 执行 review-story 任务
   - QA 执行高级 Unity 开发者代码审查
   - QA 可以直接重构和改进 Unity 代码
   - QA 将结果附加到故事的 QA 结果部分
   - 如果批准：状态 → “完成”
   - 如果需要更改：状态保持“审查”，未选中的项目留给游戏开发人员

   **步骤 4 - 重复**：继续游戏 SM → 游戏开发 → QA 周期，直到所有游戏功能故事完成

**重要提示**：一次只进行一个游戏故事，按顺序进行，直到所有游戏功能故事完成。

### 游戏故事状态跟踪工作流程

游戏故事通过定义的状态进行：

- **草稿** → **已批准** → **进行中** → **完成**

每个状态更改都需要用户验证和批准才能继续。

### 游戏开发工作流程类型

#### 绿地游戏开发

- 游戏概念头脑风暴和机制设计
- 游戏设计要求和功能定义
- Unity 系统架构和技术设计
- 游戏开发执行
- 游戏测试、性能优化和部署

#### 棕地游戏增强（现有 Unity 项目）

**关键概念**：棕地游戏开发需要对您现有的 Unity 项目进行全面的文档记录，以便 AI 代理了解游戏机制、Unity 模式和技术限制。

**棕地游戏增强工作流程**：

由于此扩展包不包括特定的棕地模板，您将需要调整现有模板：

1. **将 Unity 项目上传到 Web UI**（GitHub URL、文件或 zip）
2. **创建调整后的游戏设计文档**：`/bmad2du/game-designer` - 修改 `game-design-doc-tmpl` 以包括：
   - 对现有游戏系统的分析
   - 新功能的集成点
   - 兼容性要求
   - 更改的风险评估

3. **游戏架构规划**：
   - 使用 `/bmad2du/game-architect` 和 `game-architecture-tmpl`
   - 专注于新功能如何与现有 Unity 系统集成
   - 计划逐步推出和测试

4. **为增强功能创建故事**：
   - 使用 `/bmad2du/game-sm` 和 `*create-game-story`
   - 故事应明确引用要修改的现有代码
   - 包括集成测试要求

**何时使用每种游戏开发方法**：

**完整游戏增强工作流程**（推荐用于）：

- 主要游戏功能添加
- 游戏系统现代化
- 复杂的 Unity 集成
- 多个相关的游戏性更改

**快速故事创建**（用于）：

- 单一、专注的游戏增强
- 孤立的游戏性修复
- 小功能添加
- 文档齐全的现有 Unity 游戏

**游戏开发的关键成功因素**：

1. **游戏文档优先**：在进行更改之前，始终要彻底记录现有代码
2. **Unity 上下文很重要**：为代理提供对相关 Unity 脚本和游戏系统的访问权限
3. **专注于游戏性集成**：强调兼容性和对游戏机制的非破坏性更改
4. **增量方法**：计划逐步推出和广泛的游戏测试

## 游戏开发文档创建最佳实践

### 游戏框架集成的必需文件命名

- `docs/game-design-doc.md` - 游戏设计文档
- `docs/game-architecture.md` - Unity 系统架构文档

**为什么这些名称对游戏开发很重要**：

- 游戏代理在 Unity 开发期间自动引用这些文件
- 游戏分片任务需要这些特定的文件名
- 游戏工作流程自动化取决于标准命名

### 经济高效的游戏文档创建工作流程

**推荐用于大型游戏文档（游戏设计文档、游戏架构）：**

1. **使用 Web UI**：在 Web 界面中创建游戏文档以提高成本效益
2. **复制最终输出**：将完整的 markdown 保存到您的 Unity 项目
3. **标准名称**：另存为 `docs/game-design-doc.md` 和 `docs/game-architecture.md`
4. **切换到 Unity IDE**：使用 IDE 代理进行 Unity 开发和较小的游戏文档

### 游戏文档分片

具有 2 级标题（`##`）的游戏模板可以自动分片：

**原始游戏设计文档**：

```markdown
## 核心游戏机制

## 玩家进程系统

## 关卡设计框架

## 技术要求
```

**分片后**：

- `docs/game-design/core-gameplay-mechanics.md`
- `docs/game-design/player-progression-system.md`
- `docs/game-design/level-design-framework.md`
- `docs/game-design/technical-requirements.md`

使用 `shard-doc` 任务或 `@kayvan/markdown-tree-parser` 工具进行自动游戏文档分片。

## 游戏代理系统

### 核心游戏开发团队

| 代理 | 角色 | 主要功能 | 何时使用 |
| ---------------- | ----------------- | ------------------------------------------- | ------------------------------------------- |
| `game-designer` | 游戏设计师 | 游戏机制、创意设计、GDD | 游戏概念、机制、创意方向 |
| `game-developer` | Unity 开发者 | C# 实施、Unity 优化 | 所有 Unity 开发任务 |
| `game-sm` | 游戏 Scrum Master | 游戏故事创建、冲刺规划 | 游戏项目管理、工作流程 |
| `game-architect` | 游戏架构师 | Unity 系统设计、技术架构 | 复杂的 Unity 系统、性能规划 |

**注意**：对于 QA 和其他角色，请使用核心 BMad 代理（例如，来自 bmad-core 的 `@qa`）。

### 游戏代理交互命令

#### 游戏开发的 IDE 特定语法

**按 IDE 加载游戏代理**：

- **Claude Code**：`/bmad2du/game-designer`、`/bmad2du/game-developer`、`/bmad2du/game-sm`、`/bmad2du/game-architect`
- **Cursor**：`@bmad2du/game-designer`、`@bmad2du/game-developer`、`@bmad2du/game-sm`、`@bmad2du/game-architect`
- **Windsurf**：`/bmad2du/game-designer`、`/bmad2du/game-developer`、`/bmad2du/game-sm`、`/bmad2du/game-architect`
- **Trae**：`@bmad2du/game-designer`、`@bmad2du/game-developer`、`@bmad2du/game-sm`、`@bmad2du/game-architect`
- **Roo Code**：从带有 bmad2du 前缀的模式选择器中选择模式
- **GitHub Copilot**：打开聊天视图（Mac 上为 `⌃⌘I`，Windows/Linux 上为 `Ctrl+Alt+I`）并选择适当的游戏代理。

**常见的游戏开发任务命令**：

- `*help` - 显示可用的游戏开发命令
- `*status` - 显示当前游戏开发上下文/进度
- `*exit` - 退出游戏代理模式
- `*game-design-brainstorming` - 头脑风暴游戏概念和机制（游戏设计师）
- `*draft` - 创建下一个游戏开发故事（游戏 SM 代理）
- `*validate-game-story` - 验证游戏故事实施（使用核心 QA 代理）
- `*correct-course-game` - 游戏开发问题的课程修正
- `*advanced-elicitation` - 深入了解游戏要求

**在 Web UI 中（使用 unity-2d-game-team 构建后）**：

```text
/bmad2du/game-designer - 访问游戏设计师代理
/bmad2du/game-architect - 访问游戏架构师代理
/bmad2du/game-developer - 访问游戏开发者代理
/bmad2du/game-sm - 访问游戏 scrum master 代理
/help - 显示可用的游戏开发命令
/switch agent-name - 更改活动代理（如果协调器可用）
```

## 游戏特定开发指南

### Unity + C# 标准

**项目结构：**

```text
UnityProject/
├── Assets/
│   └── _Project
│       ├── Scenes/          # 游戏场景 (Boot, Menu, Game, 等)
│       ├── Scripts/         # C# 脚本
│       │   ├── Editor/      # 编辑器特定脚本
│       │   └── Runtime/     # 运行时脚本
│       ├── Prefabs/         # 可重用游戏对象
│       ├── Art/             # 艺术资产 (精灵, 模型, 等)
│       ├── Audio/           # 音频资产
│       ├── Data/            # ScriptableObjects 和其他数据
│       └── Tests/           # Unity 测试框架测试
│           ├── EditMode/
│           └── PlayMode/
├── Packages/            # 包管理器清单
└── ProjectSettings/     # Unity 项目设置
```

**性能要求：**

- 在目标设备上保持稳定的帧率
- 每个级别的内存使用量低于指定限制
- 关卡加载时间低于3秒
- 流畅的动画和响应迅速的控制

**代码质量：**

- 符合 C# 最佳实践
- 基于组件的架构（SOLID 原则）
- 高效使用 MonoBehaviour 生命周期
- 错误处理和优雅降级

### 游戏开发故事结构

**故事要求：**

- 清晰引用游戏设计文档部分
- 针对游戏功能的具体验收标准
- Unity 和 C# 的技术实施细节
- 性能要求和优化考虑
- 包括游戏性验证在内的测试要求

**故事类别：**

- **核心机制**：基础游戏系统
- **关卡内容**：单个关卡和内容实施
- **UI/UX**：用户界面和玩家体验功能
- **性能**：优化和技术改进
- **润色**：视觉效果、音频和游戏感觉增强

### 游戏质量保证

**测试方法：**

- C# 逻辑的单元测试（EditMode 测试）
- 游戏系统的集成测试（PlayMode 测试）
- 使用 Unity Profiler 进行性能基准测试和分析
- 游戏性测试和平衡验证
- 跨平台兼容性测试

**性能监控：**

- 帧率一致性跟踪
- 内存使用监控
- 资产加载性能
- 输入响应性验证
- 电池使用优化（移动端）

## 游戏开发的使用模式和最佳实践

### 游戏的特定环境使用

**Web UI 最适合游戏开发**：

- 初始游戏设计和创意头脑风暴阶段
- 经济高效的大型游戏文档创建
- 游戏代理咨询和机制优化
- 与协调器的多代理游戏工作流程

**Unity IDE 最适合游戏开发**：

- 活跃的 Unity 开发和 C# 实施
- Unity 资产操作和项目集成
- 游戏故事管理和开发周期
- Unity 测试、分析和调试

### 游戏开发质量保证

- 使用适当的游戏代理来完成专门的任务
- 遵循敏捷仪式和游戏审查流程
- 使用游戏特定的清单：
  - `game-architect-checklist` 用于架构审查
  - `game-change-checklist` 用于变更验证
  - `game-design-checklist` 用于设计审查
  - `game-story-dod-checklist` 用于故事质量
- 定期使用游戏模板进行验证

### 游戏开发性能优化

- 使用特定的游戏代理 vs. `bmad-master` 来完成专注的 Unity 任务
- 为项目需求选择合适的游戏团队规模
- 利用游戏特定的技术偏好以保持一致性
- 为 Unity 工作流程进行定期的上下文管理和缓存清理

## 游戏开发团队角色

### 游戏设计师

- **主要关注点**：游戏机制、玩家体验、设计文档
- **主要产出**：游戏简介、游戏设计文档、关卡设计框架
- **专长**：头脑风暴、游戏平衡、玩家心理、创意指导

### 游戏开发者

- **主要关注点**：Unity 实施、C# 卓越、性能优化
- **主要产出**：可工作的游戏功能、优化的 Unity 代码、技术架构
- **专长**：C#/Unity、性能优化、跨平台开发

### 游戏 Scrum Master

- **主要关注点**：游戏故事创建、开发规划、敏捷流程
- **主要产出**：详细的实施故事、冲刺计划、质量保证
- **专长**：故事分解、开发者交接、流程优化

## 平台特定考虑

### 跨平台开发

- 使用新的输入系统抽象输入
- 对特定逻辑使用平台相关的编译
- 定期在所有目标平台上测试
- 针对不同的屏幕分辨率和宽高比进行优化

### 移动端优化

- 触摸手势支持和响应式控制
- 电池使用优化
- 针对不同设备能力的性能扩展
- 应用商店合规性和打包

### 性能目标

- **PC/主机**：目标分辨率下 60+ FPS
- **移动端**：中端设备上 60 FPS，低端设备上最低 30 FPS
- **加载**：初始加载低于 5 秒，场景转换低于 2 秒
- **内存**：在平台特定的内存预算内

## 游戏开发成功指标

### 技术指标

- 帧率一致性（>90% 的时间在目标 FPS）
- 内存使用在预算范围内
- 满足加载时间目标
- 核心游戏系统中无严重错误

### 玩家体验指标

- 教程完成率 >80%
- 关卡完成率与难度曲线相适应
- 平均会话时长达到设计目标
- 玩家留存率和参与度指标

### 开发过程指标

- 在预估时间内完成故事
- 代码质量指标（测试覆盖率、代码分析）
- 文档的完整性和准确性
- 团队速度和交付一致性

## 常见的 Unity 开发模式

### 场景管理

- 使用加载场景异步加载游戏场景
- 对大型关卡或流式传输使用附加场景加载
- 使用专门的 SceneManager 类管理场景

### 游戏状态管理

- 使用 ScriptableObjects 存储共享游戏状态
- 为复杂行为实施有限状态机 (FSM)
- 使用 GameManager 单例进行全局状态管理

### 输入处理

- 使用新的输入系统进行稳健的跨平台输入
- 为不同的输入上下文创建动作映射（例如，菜单、游戏性）
- 使用 PlayerInput 组件轻松处理玩家输入

### 性能优化

- 对频繁实例化的对象（例如，子弹、敌人）使用对象池
- 使用 Unity Profiler 识别性能瓶颈
- 优化物理设置和碰撞检测
- 对复杂模型使用 LOD（细节层次）

## 游戏开发成功技巧

- **使用 Gemini 进行游戏设计规划** - team-game-dev 包提供协作式游戏专业知识
- **使用 bmad-master 进行游戏文档组织** - 分片创建可管理的游戏功能块
- **严格遵循游戏 SM → 游戏开发周期** - 这确保了系统化的游戏进展
- **保持对话专注** - 每个对话一个游戏代理，一个 Unity 任务
- **审查一切** - 在标记游戏功能完成之前，始终审查并批准

## 为 BMad-Method 游戏开发做贡献

### 游戏开发贡献指南

有关完整详细信息，请参阅 `CONTRIBUTING.md`。游戏开发的关键点：

**游戏开发的分支工作流程**：

1. Fork 仓库
2. 创建游戏开发功能分支
3. 将 PR 提交到 `next` 分支（默认）或仅对关键游戏开发修复提交到 `main`
4. 保持 PR 小：200-400 行是理想的，最多 800 行
5. 每个 PR 一个游戏功能/修复

**游戏开发 PR 要求**：

- 清晰的描述（最多 200 字），包含游戏功能的 What/Why/How/Testing
- 使用常规提交（feat:、fix:、docs:）并附带游戏上下文
- 原子提交 - 每个提交一个逻辑游戏更改
- 必须与游戏开发指导原则保持一致

**游戏开发核心原则**：

- **游戏开发代理必须精简**：最小化依赖关系，为 Unity 代码节省上下文
- **自然语言优先**：所有内容都在 markdown 中，游戏开发核心中没有代码
- **核心 vs 游戏扩展包**：核心用于通用需求，游戏包用于 Unity 专业化
- **游戏设计理念**：“游戏开发代理编写 Unity 代码，游戏规划代理规划游戏性”

## 游戏开发扩展包系统

### 此游戏开发扩展包

这个 2D Unity 游戏开发扩展包将 BMad-Method 从传统的软件开发扩展到专业的游戏开发。它提供了专门的游戏代理团队、Unity 模板和游戏工作流程，同时保持核心框架的精简和专注于通用开发。

### 为什么使用此游戏开发扩展包？

1. **保持核心精简**：游戏开发代理为 Unity 编码保持最大的上下文
2. **游戏领域专业知识**：深入、专业的 Unity 和游戏开发知识
3. **社区游戏创新**：游戏开发者可以贡献和分享 Unity 模式
4. **模块化游戏设计**：仅安装您需要的游戏开发功能

### 使用此游戏开发扩展包

1. **通过 CLI 安装**：

   ```bash
   npx bmad-method install
   # 选择“安装游戏开发扩展包”选项
   ```

2. **在您的游戏工作流程中使用**：安装的游戏代理与现有的 BMad 代理无缝集成

### 创建自定义游戏开发扩展

使用 **expansion-creator** 包来构建您自己的游戏开发扩展：

1. **定义游戏领域**：您正在捕获什么游戏开发专业知识？
2. **设计游戏代理**：创建具有清晰 Unity 边界的专业游戏角色
3. **构建游戏资源**：为您的游戏领域创建任务、模板、清单
4. **测试与分享**：用真实的 Unity 用例进行验证，与游戏开发社区分享

**关键原则**：游戏开发扩展包通过 AI 代理使专业的 Unity 和游戏设计知识易于访问，从而使游戏开发专业知识大众化。

## 获取游戏开发帮助

- **命令**：在任何环境中使用 `*/*help` 查看可用的游戏开发命令
- **游戏代理切换**：使用 `*/*switch game-agent-name` 和协调器进行角色更改
- **游戏文档**：检查 `docs/` 文件夹以获取 Unity 项目特定的上下文
- **游戏社区**：可通过 Discord 和 GitHub 获取游戏开发支持资源
- **游戏贡献**：有关完整的游戏开发指南，请参阅 `CONTRIBUTING.md`

该知识库为使用 BMad-Method 框架进行有效的游戏开发提供了基础，并特别关注使用 Unity 和 C# 创建 2D 游戏。

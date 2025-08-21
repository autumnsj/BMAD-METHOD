<!-- 由 BMAD™ 核心驱动 -->

# 创建游戏故事任务

## 目的

根据项目进度和史诗定义，确定下一个合乎逻辑的游戏故事，然后使用`游戏故事模板`准备一份全面、独立且可操作的故事文件。此任务确保故事富含所有必要的技术背景、Unity 特定要求和验收标准，使其可供游戏开发代理高效实施，而无需额外研究或寻找自身背景。

## 顺序任务执行（在当前任务完成前不要继续）

### 0. 加载核心配置并检查工作流程

- 从项目根目录加载 `{root}/core-config.yaml`
- 如果文件不存在，暂停并通知用户：“未找到 core-config.yaml。创建故事需要此文件。您可以：1) 从 GITHUB bmad-core/ 复制 core-config.yaml 并为您的游戏项目配置它 或 2) 对您的项目运行 BMad 安装程序以自动升级并添加文件。请在继续之前添加并配置。”
- 提取关键配置：`devStoryLocation`、`gdd.*`、`gamearchitecture.*`、`workflow.*`

### 1. 确定下一个要准备的故事

#### 1.1 定位史诗文件并审查现有故事

- 根据配置中的 `gddSharded`，定位史诗文件（分片位置/模式或单片 GDD 部分）
- 如果 `devStoryLocation` 有故事文件，加载最高的 `{epicNum}.{storyNum}.story.md` 文件
- **如果最高的故事存在：**
  - 验证状态是否为“完成”。如果不是，提醒用户：“警报：发现未完成的故事！文件：{lastEpicNum}.{lastStoryNum}.story.md 状态：[当前状态] 您应首先修复此故事，但您想接受风险并覆盖以创建下一个草稿故事吗？”
  - 如果继续，选择当前史诗中的下一个顺序故事
  - 如果史诗已完成，提示用户：“史诗 {epicNum} 已完成：史诗 {epicNum} 中的所有故事均已完成。您想：1) 以故事 1 开始史诗 {epicNum + 1} 2) 选择一个特定的故事进行处理 3) 取消故事创建”
  - **关键**：切勿自动跳到另一个史诗。用户必须明确指示要创建哪个故事。
- **如果没有故事文件：** 下一个故事始终是 1.1（第一个史诗的第一个故事）
- 向用户宣布已确定的故事：“已确定下一个要准备的故事：{epicNum}.{storyNum} - {故事标题}”

### 2. 收集故事要求和先前故事的背景

- 从已确定的史诗文件或 GDD 部分提取故事要求
- 如果存在先前故事，请审查开发代理记录部分以获取：
  - 完成说明和调试日志参考
  - 实施偏差和技术决策
  - Unity 特定的挑战（预制件问题、场景管理、性能）
  - 资产管道决策和优化
- 提取为当前故事准备提供信息的见解

### 3. 收集架构背景

#### 3.1 确定架构阅读策略

- **如果 `gamearchitectureVersion: >= v3` 且 `gamearchitectureSharded: true`**：阅读 `{gamearchitectureShardedLocation}/index.md` 然后遵循下面的结构化阅读顺序
- **否则**：对类似部分使用单片 `gamearchitectureFile`

#### 3.2 根据故事类型阅读架构文档

**对于所有游戏故事：** tech-stack.md、unity-project-structure.md、coding-standards.md、testing-resilience-architecture.md

**对于游戏性/机制故事，另外：** gameplay-systems-architecture.md、component-architecture-details.md、physics-config.md、input-system.md、state-machines.md、game-data-models.md

**对于 UI/UX 故事，另外：** ui-architecture.md、ui-components.md、ui-state-management.md、scene-management.md

**对于后端/服务故事，另外：** game-data-models.md、data-persistence.md、save-system.md、analytics-integration.md、multiplayer-architecture.md

**对于图形/渲染故事，另外：** rendering-pipeline.md、shader-guidelines.md、sprite-management.md、particle-systems.md

**对于音频故事，另外：** audio-architecture.md、audio-mixing.md、sound-banks.md

#### 3.3 提取特定于故事的技术细节

仅提取与实施当前故事直接相关的信息。不要发明源文档中没有的新模式、系统或标准。

提取：

- 故事将使用的特定 Unity 组件和 MonoBehaviour
- Unity 包管理器依赖项及其 API（例如，Cinemachine、Input System、URP）
- 包特定的配置和设置要求
- 预制件结构和场景组织要求
- 输入系统绑定和配置
- 物理设置和碰撞层
- UI 画布和布局规范
- 资产命名约定和文件夹结构
- 性能预算（目标 FPS、内存限制、绘制调用）
- 平台特定的考虑因素（移动 vs 桌面）
- 特定于 Unity 功能的测试要求

始终引用源文档：`[来源: gamearchitecture/{filename}.md#{section}]`

### 4. Unity 特定的技术分析

#### 4.1 包依赖性分析

- 确定故事所需的 Unity 包管理器包
- 从 manifest.json 记录包版本
- 注意正在使用的任何包特定的 API 或组件
- 列出包配置要求（例如，输入系统设置、URP 资产配置）
- 确定任何第三方 Asset Store 包及其集成点

#### 4.2 场景和预制件规划

- 确定将要修改或创建的场景
- 列出需要创建或更新的预制件
- 记录预制件变体要求
- 指定场景加载/卸载要求

#### 4.3 组件架构

- 定义所需的 MonoBehaviour 脚本
- 指定所需的 ScriptableObject 资产
- 记录组件依赖关系和执行顺序
- 确定所需的 Unity 事件和 UnityActions
- 注意任何包特定的组件（例如，Cinemachine VirtualCamera、InputActionAsset）

#### 4.4 资产要求

- 列出带有分辨率规格的精灵/纹理要求
- 定义所需的动画剪辑和动画控制器
- 指定音频剪辑及其导入设置
- 记录任何着色器或材质要求
- 注意任何包特定的资产（例如，URP 材质、输入动作映射）

### 5. 用完整上下文填充故事模板

- 创建新故事文件：`{devStoryLocation}/{epicNum}.{storyNum}.story.md` 使用游戏故事模板
- 填写基本故事信息：标题、状态（草稿）、故事陈述、来自史诗/GDD 的验收标准
- **`开发说明`部分（关键）：**
  - 关键：此部分必须仅包含从 gamearchitecture 文档和 GDD 提取的信息。切勿发明或假设技术细节。
  - 包括从步骤 2-4 中提取的所有相关技术细节，按类别组织：
    - **先前故事的见解**：从先前故事实施中获得的关键经验
    - **包依赖项**：所需的 Unity 包、版本、配置 [附带源参考]
    - **Unity 组件**：特定的 MonoBehaviour、ScriptableObjects、系统 [附带源参考]
    - **场景和预制件规格**：场景修改、预制件结构、变体 [附带源参考]
    - **输入配置**：输入动作、绑定、控制方案 [附带源参考]
    - **UI 实施**：画布设置、布局组、UI 事件 [附带源参考]
    - **资产管道**：资产要求、导入设置、优化说明
    - **性能目标**：FPS 目标、内存预算、分析器指标
    - **平台考虑**：移动 vs 桌面差异、输入变体
    - **测试要求**：PlayMode 测试、Unity 测试框架细节
  - 每个技术细节都必须包括其源参考：`[来源: gamearchitecture/{filename}.md#{section}]`
  - 如果在 gamearchitecture 文档中找不到某个类别的信息，请明确说明：“在 gamearchitecture 文档中未找到具体指导”
- **`任务/子任务`部分：**
  - 仅根据以下内容生成详细、有序的技术任务列表：史诗/GDD 要求、故事 AC、审查过的 GameArchitecture 信息
  - 包括 Unity 特定的任务：
    - 场景设置和配置
    - 预制件创建和测试
    - 使用正确的生命周期方法实施组件
    - 输入系统集成
    - 物理配置
    - 使用正确锚定的 UI 实施
    - 性能分析检查点
  - 每个任务都必须引用相关的 gamearchitecture 文档
  - 将 PlayMode 测试作为明确的子任务包括在内
  - 在适用的情况下将任务链接到 AC（例如，`任务 1 (AC: 1, 3)`）
- 添加在步骤 4 中发现的 Unity 项目结构对齐或差异的说明

### 6. 故事草稿完成和审查

- 审查所有部分的完整性和准确性
- 验证技术细节的所有源参考都已包括
- 确保 Unity 特定的要求是全面的：
  - 所有场景和预制件都已记录
  - 组件依赖关系清晰
  - 指定了资产要求
  - 定义了性能目标
- 将状态更新为“草稿”并保存故事文件
- 执行 `{root}/tasks/execute-checklist` `{root}/checklists/game-story-dod-checklist`
- 向用户提供摘要，包括：
  - 创建的故事：`{devStoryLocation}/{epicNum}.{storyNum}.story.md`
  - 状态：草稿
  - 包括的关键 Unity 组件和系统
  - 需要的场景/预制件修改
  - 确定的资产要求
  - GDD 和 gamearchitecture 之间注意到的任何偏差或冲突
  - 清单结果
  - 后续步骤：对于复杂的 Unity 功能，建议用户审查故事草稿并可选择在 Unity 编辑器中测试关键假设

### 7. Unity 特定的验证

在最终确定之前，请确保：

- [ ] 所有必需的 Unity 包都已记录版本
- [ ] 包括了包特定的 API 和配置
- [ ] 考虑了所有 MonoBehaviour 生命周期方法
- [ ] 明确定义了预制件工作流程
- [ ] 指定了场景管理方法
- [ ] 输入系统集成已完成（旧版或新输入系统）
- [ ] UI 画布设置遵循 Unity 最佳实践
- [ ] 确定了性能分析点
- [ ] 记录了资产导入设置
- [ ] 注意到了平台特定的代码路径
- [ ] 验证了包兼容性（例如，URP vs 内置管道）

此任务确保游戏开发故事立即可操作，并能高效地通过 AI 驱动开发 Unity 2D 游戏功能。

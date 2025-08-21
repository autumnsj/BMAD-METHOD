<!-- 由 BMAD™ 核心驱动 -->

# 游戏架构师解决方案验证清单

此清单为游戏架构师在游戏开发执行前验证技术设计和架构提供了一个全面的框架。游戏架构师应系统地检查每个项目，确保游戏架构健壮、可扩展、高性能，并与游戏设计文档要求保持一致。

[[LLM: INITIALIZATION INSTRUCTIONS - REQUIRED ARTIFACTS

Before proceeding with this checklist, ensure you have access to:

1. game-architecture.md - The primary game architecture document (check docs/game-architecture.md)
2. game-design-doc.md - Game Design Document for game requirements alignment (check docs/game-design-doc.md)
3. Any system diagrams referenced in the architecture
4. Unity project structure documentation
5. Game balance and configuration specifications
6. Platform target specifications

IMPORTANT: If any required documents are missing or inaccessible, immediately ask the user for their location or content before proceeding.

GAME PROJECT TYPE DETECTION:
First, determine the game project type by checking:

- Is this a 2D Unity game project?
- What platforms are targeted?
- What are the core game mechanics from the GDD?
- Are there specific performance requirements?

VALIDATION APPROACH:
For each section, you must:

1. Deep Analysis - Don't just check boxes, thoroughly analyze each item against the provided documentation
2. Evidence-Based - Cite specific sections or quotes from the documents when validating
3. Critical Thinking - Question assumptions and identify gaps, not just confirm what's present
4. Performance Focus - Consider frame rate impact and mobile optimization for every architectural decision

EXECUTION MODE:
Ask the user if they want to work through the checklist:

- Section by section (interactive mode) - Review each section, present findings, get confirmation before proceeding
- All at once (comprehensive mode) - Complete full analysis and present comprehensive report at end]]

## 1. 游戏设计要求对齐

[[LLM: Before evaluating this section, fully understand the game's core mechanics and player experience from the GDD. What type of gameplay is this? What are the player's primary actions? What must feel responsive and smooth? Keep these in mind as you validate the technical architecture serves the game design.]]

### 1.1 核心机制覆盖

- [ ] 架构支持 GDD 中的所有核心游戏机制
- [ ] 解决了所有游戏系统的技术方法
- [ ] 玩家控制和输入处理已正确架构
- [ ] 游戏状态管理涵盖所有所需状态
- [ ] 所有游戏功能都有对应的技术系统

### 1.2 性能和平台要求

- [ ] 目标帧率要求已通过具体解决方案解决
- [ ] 架构中已考虑移动平台限制
- [ ] 定义了内存使用优化策略
- [ ] 解决了电池寿命考虑因素
- [ ] 跨平台兼容性已正确架构

### 1.3 Unity 特定要求遵守情况

- [ ] 满足 Unity 版本和 LTS 要求
- [ ] 指定了 Unity 包管理器依赖项
- [ ] 解决了目标平台构建设置
- [ ] 优化了 Unity 资产管道使用
- [ ] 正确规划了 MonoBehaviour 生命周期使用

## 2. 游戏架构基础

[[LLM: Game architecture must be clear for rapid iteration. As you review this section, think about how a game developer would implement these systems. Are the component responsibilities clear? Would the architecture support quick gameplay tweaks and balancing changes? Look for Unity-specific patterns and clear separation of game logic.]]

### 2.1 游戏系统清晰度

- [ ] 游戏架构用清晰的系统图记录
- [ ] 定义了主要游戏系统及其职责
- [ ] 映射了系统交互和依赖关系
- [ ] 清晰地说明了游戏数据流
- [ ] 指定了 Unity 特定的实施方法

### 2.2 Unity 组件架构

- [ ] GameObjects、Components 和 ScriptableObjects 之间有明确的分离
- [ ] MonoBehaviour 使用遵循 Unity 最佳实践
- [ ] 定义了预制件组织和实例化模式
- [ ] 场景管理和加载策略清晰
- [ ] 正确利用了 Unity 基于组件的架构

### 2.3 游戏设计模式与实践

- [ ] 采用了适当的游戏编程模式（单例、观察者、状态机等）
- [ ] 始终遵循 Unity 最佳实践
- [ ] 避免了常见的游戏开发反模式
- [ ] 跨游戏系统保持一致的架构风格
- [ ] 模式使用有 Unity 特定的示例记录

### 2.4 可扩展性与迭代支持

- [ ] 游戏系统支持快速迭代和平衡更改
- [ ] 组件可以独立开发和测试
- [ ] 无需更改代码即可进行游戏配置更改
- [ ] 架构支持添加新内容和功能
- [ ] 系统专为 AI 代理实施游戏功能而设计

## 3. UNITY 技术栈与决策

[[LLM: Unity technology choices impact long-term maintainability. For each Unity-specific decision, consider: Is this using Unity's strengths? Will this scale to full production? Are we fighting against Unity's paradigms? Verify that specific Unity versions and package versions are defined.]]

### 3.1 Unity 技术选型

- [ ] 明确定义了 Unity 版本（最好是 LTS）
- [ ] 列出了所需的 Unity 包及其版本
- [ ] 使用的 Unity 功能适合 2D 游戏开发
- [ ] 第三方 Unity 资产有合理的理由并已记录
- [ ] 技术选择有效地利用了 Unity 的 2D 工具链

### 3.2 游戏系统架构

- [ ] 定义了游戏管理器和核心系统架构
- [ ] 指定了使用 Unity AudioMixer 的音频系统
- [ ] 概述了使用 Unity 新输入系统的输入系统
- [ ] 确定了使用 Unity UI 工具包或 UGUI 的 UI 系统
- [ ] 场景管理和加载架构清晰
- [ ] 游戏系统架构涵盖了核心游戏机制和玩家互动
- [ ] 组件架构细节定义了 MonoBehaviour 和 ScriptableObject 模式
- [ ] 全面定义了 Unity 2D 的物理配置
- [ ] 状态机架构涵盖了游戏状态、玩家状态和实体行为
- [ ] 建立了 UI 组件系统和数据绑定模式
- [ ] 定义了跨屏幕和游戏状态的 UI 状态管理
- [ ] 完全指定了数据持久化和保存系统架构
- [ ] 定义了分析集成方法（如果适用）
- [ ] 详细说明了多人游戏架构（如果适用）
- [ ] 渲染管道配置和优化策略清晰
- [ ] 记录了着色器指南和性能考虑
- [ ] 定义了精灵管理和优化策略
- [ ] 建立了粒子系统架构和性能预算
- [ ] 音频架构包括系统设计和类别管理
- [ ] 详细说明了使用 Unity AudioMixer 的音频混合配置
- [ ] 指定了音库管理和资产组织
- [ ] 记录了 Unity 开发约定和最佳实践

### 3.3 数据架构与游戏平衡

- [ ] 正确规划了使用 ScriptableObject 处理游戏数据
- [ ] 完全定义了游戏平衡数据结构
- [ ] 指定了保存/加载系统架构
- [ ] 记录了数据序列化方法
- [ ] 概述了配置和调整数据管理

### 3.4 资产管道与管理

- [ ] 定义了精灵和纹理管理方法
- [ ] 指定了音频资产组织
- [ ] 规划了预制件组织和管理
- [ ] 概述了资产加载和内存管理策略
- [ ] 定义了构建管道和资产捆绑方法

## 4. 游戏性能与优化

[[LLM: Performance is critical for games. This section focuses on Unity-specific performance considerations. Think about frame rate stability, memory allocation, and mobile constraints. Look for specific Unity profiling and optimization strategies.]]

### 4.1 渲染性能

- [ ] 解决了 2D 渲染管道优化问题
- [ ] 规划了精灵批处理和绘制调用优化
- [ ] 考虑了 UI 渲染性能
- [ ] 定义了粒子系统性能限制
- [ ] 解决了目标平台渲染约束

### 4.2 内存管理

- [ ] 为频繁实例化的对象定义了对象池策略
- [ ] 指定了最小化内存分配的方法
- [ ] 资产加载和卸载策略可防止内存泄漏
- [ ] 通过设计最小化了垃圾回收的影响
- [ ] 正确解决了移动内存限制

### 4.3 游戏逻辑性能

- [ ] 定义了更新循环优化策略
- [ ] 解决了物理系统性能考虑
- [ ] 优化了协程使用模式
- [ ] 最小化了事件系统的性能影响
- [ ] 建立了 AI 和游戏逻辑性能预算

### 4.4 移动与跨平台性能

- [ ] 规划了移动端特定的性能优化
- [ ] 定义了电池寿命优化策略
- [ ] 解决了平台特定的性能调整问题
- [ ] 设计了可扩展的质量设置系统
- [ ] 概述了针对目标设备的性能测试方法

## 5. 游戏系统弹性和测试

[[LLM: Games need robust systems that handle edge cases gracefully. Consider what happens when the player does unexpected things, when systems fail, or when running on low-end devices. Look for specific testing strategies for game logic and Unity systems.]]

### 5.1 游戏状态弹性

- [ ] 保存/加载系统错误处理全面
- [ ] 解决了游戏状态损坏恢复问题
- [ ] 指定了无效玩家输入处理
- [ ] 定义了游戏系统故障恢复方法
- [ ] 记录了游戏逻辑中的边缘情况处理

### 5.2 Unity 特定测试

- [ ] 定义了 Unity 测试框架的使用
- [ ] 指定了游戏逻辑单元测试方法
- [ ] 概述了播放模式测试策略
- [ ] 规划了使用 Unity Profiler 进行性能测试
- [ ] 定义了跨目标平台的设备测试方法

### 5.3 游戏平衡与配置测试

- [ ] 定义了游戏平衡测试方法
- [ ] 指定了配置数据验证
- [ ] 如果需要，考虑了 A/B 测试支持
- [ ] 规划了游戏指标收集
- [ ] 概述了玩家反馈集成方法

## 6. 游戏开发工作流程

[[LLM: Efficient game development requires clear workflows. Consider how designers, artists, and programmers will collaborate. Look for clear asset pipelines, version control strategies, and build processes that support the team.]]

### 6.1 Unity 项目组织

- [ ] 明确定义了 Unity 项目文件夹结构
- [ ] 指定了资产命名约定
- [ ] 记录了场景组织和工作流程
- [ ] 定义了预制件组织和使用模式
- [ ] 概述了 Unity 项目的版本控制策略

### 6.2 内容创作工作流程

- [ ] 定义了艺术资产集成工作流程
- [ ] 指定了音频资产集成过程
- [ ] 概述了关卡设计和创作工作流程
- [ ] 游戏数据配置过程清晰
- [ ] 迭代和测试工作流程支持快速更改

### 6.3 构建与部署

- [ ] 指定了 Unity 构建管道配置
- [ ] 定义了多平台构建策略
- [ ] 概述了构建自动化方法
- [ ] 解决了测试构建部署问题
- [ ] 规划了发布构建优化

## 7. 游戏特定实施指南

[[LLM: Clear implementation guidance prevents game development mistakes. Consider Unity-specific coding patterns, common pitfalls in game development, and clear examples of how game systems should be implemented.]]

### 7.1 Unity C# 编码标准

- [ ] 定义了 Unity 特定的 C# 编码标准
- [ ] 指定了 MonoBehaviour 生命周期使用模式
- [ ] 概述了协程使用指南
- [ ] 定义了事件系统使用模式
- [ ] 记录了 ScriptableObject 创建和使用模式

### 7.2 游戏系统实施模式

- [ ] 指定了游戏管理器的单例模式使用
- [ ] 定义了状态机实施模式
- [ ] 概述了游戏事件的观察者模式使用
- [ ] 记录了对象池实施模式
- [ ] 明确定义了组件通信模式

### 7.3 Unity 开发环境

- [ ] 记录了 Unity 项目设置和配置
- [ ] 指定了所需的 Unity 包和版本
- [ ] 概述了 Unity 编辑器工作流程和工具使用
- [ ] 定义了调试和测试工具配置
- [ ] 记录了 Unity 开发最佳实践

## 8. 游戏内容与资产管理

[[LLM: Games require extensive asset management. Consider how sprites, audio, prefabs, and data will be organized, loaded, and managed throughout the game's lifecycle. Look for scalable approaches that work with Unity's asset pipeline.]]

### 8.1 游戏资产组织

- [ ] 明确定义了精灵和纹理组织
- [ ] 指定了音频资产组织和管理
- [ ] 概述了预制件组织和命名约定
- [ ] 定义了用于游戏数据的 ScriptableObject 组织
- [ ] 解决了资产依赖管理问题

### 8.2 动态资产加载

- [ ] 指定了运行时资产加载策略
- [ ] 如果需要，定义了资产捆绑方法
- [ ] 概述了已加载资产的内存管理
- [ ] 定义了资产缓存和卸载策略
- [ ] 解决了平台特定的资产加载问题

### 8.3 游戏内容可扩展性

- [ ] 关卡和内容组织支持增长
- [ ] 定义了模块化内容设计模式
- [ ] 解决了内容版本控制和更新问题
- [ ] 如果需要，考虑了用户生成内容支持
- [ ] 指定了内容验证和测试方法

## 9. AI 代理游戏开发适用性

[[LLM: This game architecture may be implemented by AI agents. Review with game development clarity in mind. Are Unity patterns consistent? Is game logic complexity minimized? Would an AI agent understand Unity-specific concepts? Look for clear component responsibilities and implementation patterns.]]

### 9.1 Unity 系统模块化

- [ ] 游戏系统的大小适合 AI 实施
- [ ] Unity 组件依赖性最小化且清晰
- [ ] MonoBehaviour 职责单一且定义明确
- [ ] ScriptableObject 使用模式一致
- [ ] 预制件组织支持系统化实施

### 9.2 游戏逻辑清晰度

- [ ] 游戏机制被分解为清晰、可实施的步骤
- [ ] Unity 特定的模式有示例记录
- [ ] 复杂的游戏逻辑被简化为组件交互
- [ ] 状态机和游戏流程被明确定义
- [ ] 组件通信模式是可预测的

### 9.3 实施支持

- [ ] 提供了 Unity 项目结构模板
- [ ] 记录了组件实施模式
- [ ] 确定了常见的 Unity 陷阱并提供了解决方案
- [ ] 明确定义了游戏系统测试模式
- [ ] 性能优化指南是明确的

## 10. 平台与发布考虑

[[LLM: Different platforms have different requirements and constraints. Consider mobile app stores, desktop platforms, and web deployment. Look for platform-specific optimizations and compliance requirements.]]

### 10.1 平台特定架构

- [ ] 正确解决了移动平台限制
- [ ] 适当地利用了桌面平台功能
- [ ] 如果适用，考虑了 Web 平台限制
- [ ] 如果适用，解决了主机平台要求
- [ ] 规划了平台特定的输入处理

### 10.2 发布与分发

- [ ] 解决了应用商店合规性要求
- [ ] 定义了平台特定的构建配置
- [ ] 规划了更新和补丁部署策略
- [ ] 考虑了平台分析集成
- [ ] 如果适用，解决了平台特定的盈利问题

[[LLM: FINAL GAME ARCHITECTURE VALIDATION REPORT

Generate a comprehensive validation report that includes:

1. Executive Summary
   - Overall game architecture readiness (High/Medium/Low)
   - Critical risks for game development
   - Key strengths of the game architecture
   - Unity-specific assessment

2. Game Systems Analysis
   - Pass rate for each major system section
   - Most concerning gaps in game architecture
   - Systems requiring immediate attention
   - Unity integration completeness

3. Performance Risk Assessment
   - Top 5 performance risks for the game
   - Mobile platform specific concerns
   - Frame rate stability risks
   - Memory usage concerns

4. Implementation Recommendations
   - Must-fix items before development
   - Unity-specific improvements needed
   - Game development workflow enhancements

5. AI Agent Implementation Readiness
   - Game-specific concerns for AI implementation
   - Unity component complexity assessment
   - Areas needing additional clarification

6. Game Development Workflow Assessment
   - Asset pipeline completeness
   - Team collaboration workflow clarity
   - Build and deployment readiness
   - Testing strategy completeness

After presenting the report, ask the user if they would like detailed analysis of any specific game system or Unity-specific concerns.]]

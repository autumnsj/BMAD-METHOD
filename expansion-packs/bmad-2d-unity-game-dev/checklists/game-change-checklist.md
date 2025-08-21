<!-- 由 BMAD™ 核心驱动 -->

# 游戏开发变更导航清单

**目的：** 在 Unity 游戏开发过程中，当识别出重大变更（性能问题、平台限制、技术障碍、游戏性反馈）时，系统地指导游戏 SM 代理和用户进行分析和规划。

**说明：** 与用户一起审查每个项目。标记 `[x]` 表示已完成/已确认，`[N/A]` 表示不适用，或添加注释以供讨论。

[[LLM: INITIALIZATION INSTRUCTIONS - GAME CHANGE NAVIGATION

Changes during game development are common - performance issues, platform constraints, gameplay feedback, and technical limitations are part of the process.

Before proceeding, understand:

1. This checklist is for SIGNIFICANT changes affecting game architecture or features
2. Minor tweaks (shader adjustments, UI positioning) don't require this process
3. The goal is to maintain playability while adapting to technical realities
4. Performance and player experience are paramount

Required context:

- The triggering issue (performance metrics, crash logs, feedback)
- Current development state (implemented features, current sprint)
- Access to GDD, technical specs, and performance budgets
- Understanding of remaining features and milestones

APPROACH:
This is an interactive process. Discuss performance implications, platform constraints, and player impact. The user makes final decisions, but provide expert Unity/game dev guidance.

REMEMBER: Game development is iterative. Changes often lead to better gameplay and performance.]]

---

## 1. 理解触发器和背景

[[LLM: Start by understanding the game-specific issue. Ask technical questions:

- What performance metrics triggered this? (FPS, memory, load times)
- Is this platform-specific or universal?
- Can we reproduce it consistently?
- What Unity profiler data do we have?
- Is this a gameplay issue or technical constraint?

Focus on measurable impacts and technical specifics.]]

- [ ] **识别触发元素：** 清楚地识别出揭示问题的游戏功能/系统。
- [ ] **定义问题：** 精确地阐明核心问题。
  - [ ] 性能瓶颈（CPU/GPU/内存）？
  - [ ] 平台特定限制？
  - [ ] Unity 引擎约束？
  - [ ] 来自游戏测试的游戏性/平衡问题？
  - [ ] 资产管道或构建大小问题？
  - [ ] 第三方 SDK/插件冲突？
- [ ] **评估性能影响：** 记录具体指标（当前 FPS、目标 FPS、内存使用、构建大小）。
- [ ] **收集技术证据：** 注意分析器数据、崩溃日志、平台测试结果、玩家反馈。

## 2. 游戏功能影响评估

[[LLM: Game features are interconnected. Evaluate systematically:

1. Can we optimize the current feature without changing gameplay?
2. Do dependent features need adjustment?
3. Are there platform-specific workarounds?
4. Does this affect our performance budget allocation?

Consider both technical and gameplay impacts.]]

- [ ] **分析当前冲刺功能：**
  - [ ] 当前功能是否可以优化（LOD、池化、批处理）？
  - [ ] 是否需要简化游戏性？
  - [ ] 是否应设为平台特定（仅限高端）？
- [ ] **分析依赖系统：**
  - [ ] 审查与受影响功能交互的所有游戏系统。
  - [ ] 物理系统是否需要调整？
  - [ ] UI/HUD 系统是否受到影响？
  - [ ] 保存/加载系统是否需要更改？
  - [ ] 多人游戏系统是否受到影响？
- [ ] **总结功能影响：** 记录对游戏系统和技术架构的影响。

## 3. 游戏产物冲突与影响分析

[[LLM: Game documentation drives development. Check each artifact:

1. Does this invalidate GDD mechanics?
2. Are technical architecture assumptions still valid?
3. Do performance budgets need reallocation?
4. Are platform requirements still achievable?

Missing conflicts cause performance issues later.]]

- [ ] **审查 GDD：**
  - [ ] 问题是否与核心游戏机制冲突？
  - [ ] 游戏功能是否需要为性能进行扩展？
  - [ ] 进程系统是否受到影响？
  - [ ] 平衡参数是否需要调整？
- [ ] **审查技术架构：**
  - [ ] 问题是否与 Unity 架构（场景结构、预制件层次结构）冲突？
  - [ ] 组件系统是否受到影响？
  - [ ] 着色器/渲染方法是否需要修订？
  - [ ] 数据结构对于规模是否最优？
- [ ] **审查性能规格：**
  - [ ] 目标帧率是否仍然可以实现？
  - [ ] 内存预算是否需要重新分配？
  - [ ] 加载时间目标是否现实？
  - [ ] 我们是否需要平台特定的目标？
- [ ] **审查资产规格：**
  - [ ] 纹理分辨率是否需要调整？
  - [ ] 模型多边形数量是否合适？
  - [ ] 音频压缩设置是否需要更改？
  - [ ] 动画预算是否可持续？
- [ ] **总结产物影响：** 列出所有需要更新的游戏文档。

## 4. 前进路径评估

[[LLM: Present game-specific solutions with technical trade-offs:

1. What's the performance gain?
2. How much rework is required?
3. What's the player experience impact?
4. Are there platform-specific solutions?
5. Is this maintainable across updates?

Be specific about Unity implementation details.]]

- [ ] **选项 1：在当前设计内优化：**
  - [ ] 是否可以通过 Unity 优化来提高性能？
    - [ ] 对象池实施？
    - [ ] 添加 LOD 系统？
    - [ ] 纹理图集？
    - [ ] 绘制调用批处理？
    - [ ] 着色器优化？
  - [ ] 定义具体的优化技术。
  - [ ] 估算性能提升潜力。
- [ ] **选项 2：功能扩展/简化：**
  - [ ] 是否可以在保持乐趣的同时简化功能？
  - [ ] 确定要缩减的具体元素。
  - [ ] 定义平台特定的变体。
  - [ ] 评估对玩家体验的影响。
- [ ] **选项 3：架构重构：**
  - [ ] 重构结构是否会显著提高性能？
  - [ ] 确定 Unity 特定的重构需求：
    - [ ] 场景组织变更？
    - [ ] 预制件结构优化？
    - [ ] 组件系统重新设计？
    - [ ] 状态机优化？
  - [ ] 估算开发工作量。
- [ ] **选项 4：范围调整：**
  - [ ] 我们是否可以将功能推迟到发布后？
  - [ ] 某些功能是否应该是平台独有的？
  - [ ] 我们是否需要调整里程碑交付物？
- [ ] **选择推荐路径：** 根据性能增益与工作量进行选择。

## 5. 游戏开发变更提案组件

[[LLM: The proposal must include technical specifics:

1. Performance metrics (before/after projections)
2. Unity implementation details
3. Platform-specific considerations
4. Testing requirements
5. Risk mitigation strategies

Make it actionable for game developers.]]

（确保捕获了前面部分的所有要点）

- [ ] **技术问题摘要：** 带有指标的性能/技术问题。
- [ ] **功能影响摘要：** 受影响的游戏系统和依赖项。
- [ ] **性能预测：** 所选解决方案的预期改进。
- [ ] **实施计划：** Unity 特定的技术方法。
- [ ] **平台考虑：** 任何平台特定的实施。
- [ ] **测试策略：** 性能基准和验证方法。
- [ ] **风险评估：** 技术风险和缓解计划。
- [ ] **更新的游戏故事：** 带有技术限制的修订故事。

## 6. 最终审查与交接

[[LLM: Game changes require technical validation. Before concluding:

1. Are performance targets clearly defined?
2. Is the Unity implementation approach clear?
3. Do we have rollback strategies?
4. Are test scenarios defined?
5. Is platform testing covered?

Get explicit approval on technical approach.

FINAL REPORT:
Provide a technical summary:

- Performance issue and root cause
- Chosen solution with expected gains
- Implementation approach in Unity
- Testing and validation plan
- Timeline and milestone impacts

Keep it technically precise and actionable.]]

- [ ] **审查清单：** 确认所有讨论的技术方面。
- [ ] **审查变更提案：** 确保 Unity 实施细节清晰。
- [ ] **性能验证：** 定义我们将如何衡量成功。
- [ ] **用户批准：** 获得技术方法的批准。
- [ ] **开发者交接：** 确保游戏开发代理拥有所需的所有技术细节。

---

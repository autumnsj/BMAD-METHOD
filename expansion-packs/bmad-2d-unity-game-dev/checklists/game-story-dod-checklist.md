<!-- 由 BMAD™ 核心驱动 -->

# 游戏开发故事完成定义 (DoD) 清单

## 开发代理说明

在将故事标记为“审查”之前，请检查此清单中的每个项目。报告每个项目的状态（例如，[x] 完成，[ ] 未完成，[N/A] 不适用），并在必要时提供简要评论。

[[LLM: INITIALIZATION INSTRUCTIONS - GAME STORY DOD VALIDATION

This checklist is for GAME DEVELOPER AGENTS to self-validate their work before marking a story complete.

IMPORTANT: This is a self-assessment. Be honest about what's actually done vs what should be done. It's better to identify issues now than have them found in review.

EXECUTION APPROACH:

1. Go through each section systematically
2. Mark items as [x] Done, [ ] Not Done, or [N/A] Not Applicable
3. Add brief comments explaining any [ ] or [N/A] items
4. Be specific about what was actually implemented
5. Flag any concerns or technical debt created

The goal is quality delivery, not just checking boxes.]]

## 清单项目

1. **需求满足：**

   [[LLM: Be specific - list each requirement and whether it's complete. Include game-specific requirements from GDD]]
   - [ ] 故事中指定的所有功能需求均已实施。
   - [ ] 故事中定义的所有验收标准均已满足。
   - [ ] 故事中引用的游戏设计文档 (GDD) 要求均已实施。
   - [ ] 故事中指定的玩家体验目标均已实现。

2. **编码标准和项目结构：**

   [[LLM: Code quality matters for maintainability. Check Unity-specific patterns and C# standards]]
   - [ ] 所有新的/修改的代码都严格遵守`操作指南`。
   - [ ] 所有新的/修改的代码都与`项目结构`（Scripts/、Prefabs/、Scenes/ 等）保持一致。
   - [ ] 遵守所用 Unity 版本和包的`技术栈`。
   - [ ] 遵守`Api 参考`和`数据模型`（如果故事涉及 API 或数据模型更改）。
   - [ ] 遵循 Unity 最佳实践（预制件使用、组件设计、事件处理）。
   - [ ] 遵循 C# 编码标准（命名约定、错误处理、内存管理）。
   - [ ] 对新的/修改的代码应用了基本的安全最佳实践。
   - [ ] 没有引入新的 linter 错误或警告。
   - [ ] 在必要时对代码进行了充分注释（澄清复杂逻辑，而非明显语句）。

3. **测试：**

   [[LLM: Testing proves your code works. Include Unity-specific testing with NUnit and manual testing]]
   - [ ] 根据故事和测试策略，所有必需的单元测试 (NUnit) 均已实施。
   - [ ] 所有必需的集成测试（如果适用）均已实施。
   - [ ] 在 Unity 编辑器中对所有游戏功能进行了手动测试。
   - [ ] 所有测试（单元、集成、手动）均成功通过。
   - [ ] 测试覆盖率符合项目标准（如果已定义）。
   - [ ] 进行了性能测试（帧率、内存使用）。
   - [ ] 测试了边缘情况和错误条件。

4. **功能与验证：**

   [[LLM: Did you actually run and test your code in Unity? Be specific about game mechanics tested]]
   - [ ] 功能已在 Unity 编辑器和播放模式下手动验证。
   - [ ] 游戏机制按 GDD 中的规定工作。
   - [ ] 玩家控制和输入处理工作正常。
   - [ ] UI 元素功能正常（如果适用）。
   - [ ] 音频集成工作正常（如果适用）。
   - [ ] 视觉反馈和动画按预期工作。
   - [ ] 优雅地处理了边缘情况和潜在的错误条件。
   - [ ] 验证了跨平台功能（桌面/移动端，如适用）。

5. **故事管理：**

   [[LLM: Documentation helps the next developer. Include Unity-specific implementation notes]]
   - [ ] 故事文件中的所有任务都标记为完成。
   - [ ] 开发过程中做出的任何澄清或决定都已记录。
   - [ ] 记录了 Unity 特定的实施细节（场景更改、预制件修改）。
   - [ ] 故事总结部分已用更改说明完成。
   - [ ] 变更日志已用 Unity 版本和包更改正确更新。

6. **依赖、构建和配置：**

   [[LLM: Build issues block everyone. Ensure Unity project builds for all target platforms]]
   - [ ] Unity 项目成功构建，没有错误。
   - [ ] 项目为所有目标平台（桌面/移动端，如指定）构建。
   - [ ] 任何新的 Unity 包或 Asset Store 项目都经过预先批准或用户批准。
   - [ ] 如果添加了新的依赖项，则已记录并说明理由。
   - [ ] 新添加的依赖项中没有已知的安全漏洞。
   - [ ] 项目设置和配置已正确更新。
   - [ ] 资产导入设置为目标平台进行了优化。

7. **游戏特定质量：**

   [[LLM: Game quality matters. Check performance, game feel, and player experience]]
   - [ ] 在所有平台上帧率均达到目标（30/60 FPS）。
   - [ ] 内存使用在可接受的限制内。
   - [ ] 游戏感觉和响应性符合设计要求。
   - [ ] GDD 中的平衡参数已正确实施。
   - [ ] 状态管理和持久性工作正常。
   - [ ] 加载时间和场景转换可接受。
   - [ ] 满足移动端特定要求（触摸控制、宽高比）。

8. **文档（如果适用）：**

   [[LLM: Good documentation prevents future confusion. Include Unity-specific docs]]
   - [ ] 公共 API 的代码文档（XML 注释）已完成。
   - [ ] Inspector 中的 Unity 组件文档已更新。
   - [ ] 如果更改影响玩家，则更新了面向用户的文档。
   - [ ] 更新了技术文档（架构、系统图）。
   - [ ] 资产文档（预制件用法、场景设置）已完成。

## 最终确认

[[LLM: FINAL GAME DOD SUMMARY

After completing the checklist:

1. Summarize what game features/mechanics were implemented
2. List any items marked as [ ] Not Done with explanations
3. Identify any technical debt or performance concerns
4. Note any challenges with Unity implementation or game design
5. Confirm whether the story is truly ready for review
6. Report final performance metrics (FPS, memory usage)

Be honest - it's better to flag issues now than have them discovered during playtesting.]]

- [ ] 我，游戏开发代理，确认以上所有适用项目均已处理。

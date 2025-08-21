<!-- 由 BMAD™ 核心驱动 -->

# 高级游戏设计启发任务

## 目的

- 提供可选的反思和头脑风暴操作，以提高游戏设计内容的质量
- 通过结构化的启发技巧，实现对游戏机制和玩家体验的更深层次探索
- 通过多种游戏开发视角支持迭代优化
- 将特定于游戏批判性思维应用于设计决策

## 任务说明

### 1. 游戏设计背景和审查

[[LLM: When invoked after outputting a game design section:

1. First, provide a brief 1-2 sentence summary of what the user should look for in the section just presented, with game-specific focus (e.g., "Please review the core mechanics for player engagement and implementation feasibility. Pay special attention to how these mechanics create the intended player experience and whether they're technically achievable with Unity.")

2. If the section contains game flow diagrams, level layouts, or system diagrams, explain each diagram briefly with game development context before offering elicitation options (e.g., "The gameplay loop diagram shows how player actions lead to rewards and progression. Notice how each step maintains player engagement and creates opportunities for skill development.")

3. If the section contains multiple game elements (like multiple mechanics, multiple levels, multiple systems, etc.), inform the user they can apply elicitation actions to:
   - The entire section as a whole
   - Individual game elements within the section (specify which element when selecting an action)

4. Then present the action list as specified below.]]

### 2. 请求审查并呈现游戏设计操作列表

[[LLM: Ask the user to review the drafted game design section. In the SAME message, inform them that they can suggest additions, removals, or modifications, OR they can select an action by number from the 'Advanced Game Design Elicitation & Brainstorming Actions'. If there are multiple game elements in the section, mention they can specify which element(s) to apply the action to. Then, present ONLY the numbered list (0-9) of these actions. Conclude by stating that selecting 9 will proceed to the next section. Await user selection. If an elicitation action (0-8) is chosen, execute it and then re-offer this combined review/elicitation choice. If option 9 is chosen, or if the user provides direct feedback, proceed accordingly.]]

**以这种确切的格式呈现编号列表 (0-9)：**

```text
**高级游戏设计启发与头脑风暴操作**
选择一个操作 (0-9 - 9 以跳过 - HELP 获取这些选项的解释):

0. 针对目标受众进行扩展或精简
1. 解释游戏设计理由（分步说明）
2. 从玩家角度进行批判和完善
3. 分析游戏流程和机制依赖性
4. 评估与玩家体验目标的一致性
5. 识别潜在的玩家困惑和设计风险
6. 从批判性游戏设计角度提出挑战
7. 探索替代游戏设计方法
8. 事后复盘：“要是……”游戏设计反思
9. 继续/无其他操作
```

### 2. 处理指南

**不要显示：**

- 带有 `[[LLM: ...]]` 指令的完整协议文本
- 每个选项的详细解释，除非在执行或用户询问时，在给出定义时可以修改以关联其游戏开发的 relevance
- 任何内部模板标记

**用户从列表中选择后：**

- 根据下面的游戏设计协议指令执行所选操作
- 完成后询问他们是否要选择另一个操作或继续选择选项 9
- 继续直到用户选择选项 9 或表示完成

## 游戏设计操作定义

0. 针对目标受众进行扩展或精简
   [[LLM: Ask the user whether they want to 'expand' on the game design content (add more detail, elaborate on mechanics, include more examples) or 'contract' it (simplify mechanics, focus on core features, reduce complexity). Also, ask if there's a specific player demographic or experience level they have in mind (casual players, hardcore gamers, children, etc.). Once clarified, perform the expansion or contraction from your current game design role's perspective, tailored to the specified player audience if provided.]]

1. 解释游戏设计理由（分步说明）
   [[LLM: Explain the step-by-step game design thinking process that you used to arrive at the current proposal for this game content. Focus on player psychology, engagement mechanics, technical feasibility, and how design decisions support the overall player experience goals.]]

2. 从玩家角度进行批判和完善
   [[LLM: From your current game design role's perspective, review your last output or the current section for potential player confusion, engagement issues, balance problems, or areas for improvement. Consider how players will actually interact with and experience these systems, then suggest a refined version that better serves player enjoyment and understanding.]]

3. 分析游戏流程和机制依赖性
   [[LLM: From your game design role's standpoint, examine the content's structure for logical gameplay progression, mechanic interdependencies, and player learning curve. Confirm if game elements are introduced in an effective order that teaches players naturally and maintains engagement throughout the experience.]]

4. 评估与玩家体验目标的一致性
   [[LLM: Evaluate how well the current game design content contributes to the stated player experience goals and core game pillars. Consider whether the mechanics actually create the intended emotions and engagement patterns. Identify any misalignments between design intentions and likely player reactions.]]

5. 识别潜在的玩家困惑和设计风险
   [[LLM: Based on your game design expertise, brainstorm potential sources of player confusion, overlooked edge cases in gameplay, balance issues, technical implementation risks, or unintended player behaviors that could emerge from the current design. Consider both new and experienced players' perspectives.]]

6. 从批判性游戏设计角度提出挑战
   [[LLM: Adopt a critical game design perspective on the current content. If the user specifies another viewpoint (e.g., 'as a casual player', 'as a speedrunner', 'as a mobile player', 'as a technical implementer'), critique the content from that specified perspective. If no other role is specified, play devil's advocate from your game design expertise, arguing against the current design proposal and highlighting potential weaknesses, player experience issues, or implementation challenges. This can include questioning scope creep, unnecessary complexity, or features that don't serve the core player experience.]]

7. 探索替代游戏设计方法
   [[LLM: From your game design role's perspective, first broadly brainstorm a range of diverse approaches to achieving the same player experience goals or solving the same design challenge. Consider different genres, mechanics, interaction models, or technical approaches. Then, from this wider exploration, select and present 2-3 distinct alternative design approaches, detailing the pros, cons, player experience implications, and technical feasibility you foresee for each.]]

8. 事后复盘：“要是……”游戏设计反思
   [[LLM: In your current game design persona, imagine this is a postmortem for a shipped game based on the current design content. What's the one 'if only we had designed/considered/tested X...' that your role would highlight from a game design perspective? Include the imagined player reactions, review scores, or development consequences. This should be both insightful and somewhat humorous, focusing on common game design pitfalls.]]

9. 继续/无其他操作
   [[LLM: Acknowledge the user's choice to finalize the current game design work, accept the AI's last output as is, or move on to the next step without selecting another action from this list. Prepare to proceed accordingly.]]

## 游戏开发背景整合

该启发任务专为游戏开发而设计，应在以下情况下使用：

- **游戏机制设计**：在定义核心游戏系统和玩家互动时
- **玩家体验规划**：在为特定的情感反应和参与模式进行设计时
- **技术游戏架构**：在平衡设计雄心与实施现实时
- **游戏平衡与进程**：在设计难度曲线和玩家进阶系统时
- **平台考虑**：在为不同设备和输入法调整设计时

所提供的问题和视角应始终考虑：

- 玩家心理和动机
- 使用 Unity 和 C# 的技术可行性
- 对稳定帧率目标的性能影响
- 跨平台兼容性（PC、主机、移动）
- 游戏开发的最佳实践和常见陷阱

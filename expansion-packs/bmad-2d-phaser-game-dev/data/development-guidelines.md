<!-- 由 BMAD™ 核心驱动 -->

# 游戏开发指南

## 概述

本文档为使用 Phaser 3 和 TypeScript 进行 2D 游戏开发建立了编码标准、架构模式和开发实践。这些指南确保了所有游戏开发故事的一致性、性能和可维护性。

## TypeScript 标准

### 严格模式配置

**必需的 tsconfig.json 设置：**

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true
  }
}
```

### 类型定义

**游戏对象接口：**

```typescript
// 核心游戏实体接口
interface GameEntity {
  readonly id: string;
  position: Phaser.Math.Vector2;
  active: boolean;
  destroy(): void;
}

// 玩家控制器接口
interface PlayerController {
  readonly inputEnabled: boolean;
  handleInput(input: InputState): void;
  update(delta: number): void;
}

// 游戏系统接口
interface GameSystem {
  readonly name: string;
  initialize(): void;
  update(delta: number): void;
  shutdown(): void;
}
```

**场景数据接口：**

```typescript
// 场景转换数据
interface SceneData {
  [key: string]: any;
}

// 游戏状态接口
interface GameState {
  currentLevel: number;
  score: number;
  lives: number;
  settings: GameSettings;
}

interface GameSettings {
  musicVolume: number;
  sfxVolume: number;
  difficulty: 'easy' | 'normal' | 'hard';
  controls: ControlScheme;
}
```

### 命名约定

**类和接口：**

- 类使用 PascalCase: `PlayerSprite`, `GameManager`, `AudioSystem`
- 接口使用带 'I' 前缀的 PascalCase: `IGameEntity`, `IPlayerController`
- 使用能表明目的的描述性名称: `CollisionManager` 而不是 `CM`

**方法和变量：**

- 方法和变量使用 camelCase: `updatePosition()`, `playerSpeed`
- 使用描述性名称: `calculateDamage()` 而不是 `calcDmg()`
-布尔变量使用 is/has/can 前缀: `isActive`, `hasCollision`, `canMove`

**常量：**

- 常量使用 UPPER_SNAKE_CASE: `MAX_PLAYER_SPEED`, `DEFAULT_VOLUME`
- 在枚举或 const 对象中对相关常量进行分组

**文件和目录：**

- 文件名使用 kebab-case: `player-controller.ts`, `audio-manager.ts`
- 场景文件使用 PascalCase: `MenuScene.ts`, `GameScene.ts`

## Phaser 3 架构模式

### 场景组织

**场景生命周期管理：**

```typescript
class GameScene extends Phaser.Scene {
  private gameManager!: GameManager;
  private inputManager!: InputManager;

  constructor() {
    super({ key: 'GameScene' });
  }

  preload(): void {
    // 仅加载特定于场景的资产
    this.load.image('player', 'assets/player.png');
  }

  create(data: SceneData): void {
    // 初始化游戏系统
    this.gameManager = new GameManager(this);
    this.inputManager = new InputManager(this);

    // 设置场景特定逻辑
    this.setupGameObjects();
    this.setupEventListeners();
  }

  update(time: number, delta: number): void {
    // 更新所有游戏系统
    this.gameManager.update(delta);
    this.inputManager.update(delta);
  }

  shutdown(): void {
    // 清理资源
    this.gameManager.destroy();
    this.inputManager.destroy();

    // 移除事件监听器
    this.events.off('*');
  }
}
```

**场景转换：**

```typescript
// 带数据的正确场景转换
this.scene.start('NextScene', {
  playerScore: this.playerScore,
  currentLevel: this.currentLevel + 1,
});

// 用于 UI 的场景覆盖
this.scene.launch('PauseMenuScene');
this.scene.pause();
```

### 游戏对象模式

**基于组件的架构：**

```typescript
// 基础游戏实体
abstract class GameEntity extends Phaser.GameObjects.Sprite {
  protected components: Map<string, GameComponent> = new Map();

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
    scene.add.existing(this);
  }

  addComponent<T extends GameComponent>(component: T): T {
    this.components.set(component.name, component);
    return component;
  }

  getComponent<T extends GameComponent>(name: string): T | undefined {
    return this.components.get(name) as T;
  }

  update(delta: number): void {
    this.components.forEach((component) => component.update(delta));
  }

  destroy(): void {
    this.components.forEach((component) => component.destroy());
    this.components.clear();
    super.destroy();
  }
}

// 玩家实现示例
class Player extends GameEntity {
  private movement!: MovementComponent;
  private health!: HealthComponent;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'player');

    this.movement = this.addComponent(new MovementComponent(this));
    this.health = this.addComponent(new HealthComponent(this, 100));
  }
}
```

### 系统管理

**单例管理器：**

```typescript
class GameManager {
  private static instance: GameManager;
  private scene: Phaser.Scene;
  private gameState: GameState;

  constructor(scene: Phaser.Scene) {
    if (GameManager.instance) {
      throw new Error('GameManager already exists!');
    }

    this.scene = scene;
    this.gameState = this.loadGameState();
    GameManager.instance = this;
  }

  static getInstance(): GameManager {
    if (!GameManager.instance) {
      throw new Error('GameManager not initialized!');
    }
    return GameManager.instance;
  }

  update(delta: number): void {
    // 更新游戏逻辑
  }

  destroy(): void {
    GameManager.instance = null!;
  }
}
```

## 性能优化

### 对象池

**高频对象的必需项：**

```typescript
class BulletPool {
  private pool: Bullet[] = [];
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene, initialSize: number = 50) {
    this.scene = scene;

    // 预创建子弹
    for (let i = 0; i < initialSize; i++) {
      const bullet = new Bullet(scene, 0, 0);
      bullet.setActive(false);
      bullet.setVisible(false);
      this.pool.push(bullet);
    }
  }

  getBullet(): Bullet | null {
    const bullet = this.pool.find((b) => !b.active);
    if (bullet) {
      bullet.setActive(true);
      bullet.setVisible(true);
      return bullet;
    }

    // 池已耗尽 - 创建新子弹
    console.warn('Bullet pool exhausted, creating new bullet');
    return new Bullet(this.scene, 0, 0);
  }

  releaseBullet(bullet: Bullet): void {
    bullet.setActive(false);
    bullet.setVisible(false);
    bullet.setPosition(0, 0);
  }
}
```

### 帧率优化

**性能监控：**

```typescript
class PerformanceMonitor {
  private frameCount: number = 0;
  private lastTime: number = 0;
  private frameRate: number = 60;

  update(time: number): void {
    this.frameCount++;

    if (time - this.lastTime >= 1000) {
      this.frameRate = this.frameCount;
      this.frameCount = 0;
      this.lastTime = time;

      if (this.frameRate < 55) {
        console.warn(`Low frame rate detected: ${this.frameRate} FPS`);
        this.optimizePerformance();
      }
    }
  }

  private optimizePerformance(): void {
    // 减少粒子数量，禁用效果等。
  }
}
```

**更新循环优化：**

```typescript
// 避免在更新循环中进行昂贵的操作
class GameScene extends Phaser.Scene {
  private updateTimer: number = 0;
  private readonly UPDATE_INTERVAL = 100; // 毫秒

  update(time: number, delta: number): void {
    // 高频更新（每帧）
    this.updatePlayer(delta);
    this.updatePhysics(delta);

    // 低频更新（每秒10次）
    this.updateTimer += delta;
    if (this.updateTimer >= this.UPDATE_INTERVAL) {
      this.updateUI();
      this.updateAI();
      this.updateTimer = 0;
    }
  }
}
```

## 输入处理

### 跨平台输入

**输入抽象：**

```typescript
interface InputState {
  moveLeft: boolean;
  moveRight: boolean;
  jump: boolean;
  action: boolean;
  pause: boolean;
}

class InputManager {
  private inputState: InputState = {
    moveLeft: false,
    moveRight: false,
    jump: false,
    action: false,
    pause: false,
  };

  private keys!: { [key: string]: Phaser.Input.Keyboard.Key };
  private pointer!: Phaser.Input.Pointer;

  constructor(private scene: Phaser.Scene) {
    this.setupKeyboard();
    this.setupTouch();
  }

  private setupKeyboard(): void {
    this.keys = this.scene.input.keyboard.addKeys('W,A,S,D,SPACE,ESC,UP,DOWN,LEFT,RIGHT');
  }

  private setupTouch(): void {
    this.scene.input.on('pointerdown', this.handlePointerDown, this);
    this.scene.input.on('pointerup', this.handlePointerUp, this);
  }

  update(): void {
    // 从多个来源更新输入状态
    this.inputState.moveLeft = this.keys.A.isDown || this.keys.LEFT.isDown;
    this.inputState.moveRight = this.keys.D.isDown || this.keys.RIGHT.isDown;
    this.inputState.jump = Phaser.Input.Keyboard.JustDown(this.keys.SPACE);
    // ... 处理触摸输入
  }

  getInputState(): InputState {
    return { ...this.inputState };
  }
}
```

## 错误处理

### 优雅降级

**资产加载错误处理：**

```typescript
class AssetManager {
  loadAssets(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.scene.load.on('filecomplete', this.handleFileComplete, this);
      this.scene.load.on('loaderror', this.handleLoadError, this);
      this.scene.load.on('complete', () => resolve());

      this.scene.load.start();
    });
  }

  private handleLoadError(file: Phaser.Loader.File): void {
    console.error(`Failed to load asset: ${file.key}`);

    // 使用备用资产
    this.loadFallbackAsset(file.key);
  }

  private loadFallbackAsset(key: string): void {
    // 加载占位符或默认资产
    switch (key) {
      case 'player':
        this.scene.load.image('player', 'assets/defaults/default-player.png');
        break;
      default:
        console.warn(`No fallback for asset: ${key}`);
    }
  }
}
```

### 运行时错误恢复

**系统错误处理：**

```typescript
class GameSystem {
  protected handleError(error: Error, context: string): void {
    console.error(`Error in ${context}:`, error);

    // 报告给分析/日志服务
    this.reportError(error, context);

    // 尝试恢复
    this.attemptRecovery(context);
  }

  private attemptRecovery(context: string): void {
    switch (context) {
      case 'update':
        // 重置系统状态
        this.reset();
        break;
      case 'render':
        // 禁用视觉效果
        this.disableEffects();
        break;
      default:
        // 通用恢复
        this.safeShutdown();
    }
  }
}
```

## 测试标准

### 单元测试

**游戏逻辑测试：**

```typescript
// 游戏机制测试示例
describe('HealthComponent', () => {
  let healthComponent: HealthComponent;

  beforeEach(() => {
    const mockEntity = {} as GameEntity;
    healthComponent = new HealthComponent(mockEntity, 100);
  });

  test('should initialize with correct health', () => {
    expect(healthComponent.currentHealth).toBe(100);
    expect(healthComponent.maxHealth).toBe(100);
  });

  test('should handle damage correctly', () => {
    healthComponent.takeDamage(25);
    expect(healthComponent.currentHealth).toBe(75);
    expect(healthComponent.isAlive()).toBe(true);
  });

  test('should handle death correctly', () => {
    healthComponent.takeDamage(150);
    expect(healthComponent.currentHealth).toBe(0);
    expect(healthComponent.isAlive()).toBe(false);
  });
});
```

### 集成测试

**场景测试：**

```typescript
describe('GameScene Integration', () => {
  let scene: GameScene;
  let mockGame: Phaser.Game;

  beforeEach(() => {
    // 模拟 Phaser 游戏实例
    mockGame = createMockGame();
    scene = new GameScene();
  });

  test('should initialize all systems', () => {
    scene.create({});

    expect(scene.gameManager).toBeDefined();
    expect(scene.inputManager).toBeDefined();
  });
});
```

## 文件组织

### 项目结构

```
src/
├── scenes/
│   ├── BootScene.ts          # 初始加载和设置
│   ├── PreloadScene.ts       # 带进度的资产加载
│   ├── MenuScene.ts          # 主菜单和导航
│   ├── GameScene.ts          # 核心游戏玩法
│   └── UIScene.ts            # 覆盖 UI 元素
├── gameObjects/
│   ├── entities/
│   │   ├── Player.ts         # 玩家游戏对象
│   │   ├── Enemy.ts          # 敌人基类
│   │   └── Collectible.ts    # 可收集物品
│   ├── components/
│   │   ├── MovementComponent.ts
│   │   ├── HealthComponent.ts
│   │   └── CollisionComponent.ts
│   └── ui/
│       ├── Button.ts         # 交互式按钮
│       ├── HealthBar.ts      # 生命值显示
│       └── ScoreDisplay.ts   # 分数 UI
├── systems/
│   ├── GameManager.ts        # 核心游戏状态管理
│   ├── InputManager.ts       # 跨平台输入处理
│   ├── AudioManager.ts       # 声音和音乐系统
│   ├── SaveManager.ts        # 保存/加载功能
│   └── PerformanceMonitor.ts # 性能跟踪
├── utils/
│   ├── ObjectPool.ts         # 通用对象池
│   ├── MathUtils.ts          # 游戏数学辅助函数
│   ├── AssetLoader.ts        # 资产管理实用程序
│   └── EventBus.ts           # 全局事件系统
├── types/
│   ├── GameTypes.ts          # 核心游戏类型定义
│   ├── UITypes.ts            # UI 相关类型
│   └── SystemTypes.ts        # 系统接口定义
├── config/
│   ├── GameConfig.ts         # Phaser 游戏配置
│   ├── GameBalance.ts        # 游戏平衡参数
│   └── AssetConfig.ts        # 资产加载配置
└── main.ts                   # 应用程序入口点
```

## 开发工作流程

### 故事实施过程

1. **阅读故事要求：**
   - 理解验收标准
   - 确定技术要求
   - 审查性能约束

2. **计划实施：**
   - 确定要创建/修改的文件
   - 考虑组件架构
   - 计划测试方法

3. **实施功能：**
   - 遵循 TypeScript 严格模式
   - 使用既定模式
   - 保持 60 FPS 性能

4. **测试实施：**
   - 为游戏逻辑编写单元测试
   - 测试跨平台功能
   - 验证性能目标

5. **更新文档：**
   - 将故事复选框标记为完成
   - 记录任何偏差
   - 如果需要，更新架构

### 代码审查清单

**提交前：**

- [ ] TypeScript 编译无误
- [ ] 所有测试通过
- [ ] 满足性能目标 (60 FPS)
- [ ] 无控制台错误或警告
- [ ] 已验证跨平台兼容性
- [ ] 内存使用在限制范围内
- [ ] 代码遵循命名约定
- [ ] 已实施错误处理
- [ ] 文档已更新

## 性能目标

### 帧率要求

- **桌面端**：在 1080p 分辨率下保持 60 FPS
- **移动端**：在中端设备上保持 60 FPS，在低端设备上最低 30 FPS
- **优化**：当性能下降时实施动态质量缩放

### 内存管理

- **总内存**：整个游戏低于 100MB
- **每场景**：每个游戏场景低于 50MB
- **资产加载**：渐进式加载以保持在限制内
- **垃圾回收**：最小化更新循环中的对象创建

### 加载性能

- **初始加载**：游戏启动低于 5 秒
- **场景转换**：场景之间低于 2 秒
- **资产流式传输**：为即将到来的内容进行后台加载

这些指南确保了一致、高质量的游戏开发，满足性能目标并在所有实施故事中保持代码质量。

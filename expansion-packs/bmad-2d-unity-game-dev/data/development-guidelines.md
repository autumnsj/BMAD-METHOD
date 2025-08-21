<!-- 由 BMAD™ 核心驱动 -->

# 游戏开发指南 (Unity & C#)

## 概述

本文档为使用 Unity 和 C# 进行 2D 游戏开发建立了编码标准、架构模式和开发实践。这些指南确保了所有游戏开发故事的一致性、性能和可维护性。

## C# 标准

### 命名约定

**类、结构体、枚举和接口：**

- 类型使用 PascalCase: `PlayerController`, `GameData`, `IInteractable`
- 接口以 'I' 为前缀: `IDamageable`, `IControllable`
- 使用能表明目的的描述性名称: `GameStateManager` 而不是 `GSM`

**方法和属性：**

- 方法和属性使用 PascalCase: `CalculateScore()`, `CurrentHealth`
- 方法使用描述性动词短语: `ActivateShield()` 而不是 `shield()`

**字段和变量：**

- `private` 或 `protected` 字段: 使用下划线前缀的 camelCase: `_playerHealth`, `_movementSpeed`
- `public` 字段（谨慎使用，优先使用属性）: PascalCase: `PlayerName`
- `static` 字段: PascalCase: `Instance`, `GameVersion`
- `const` 字段: PascalCase: `MaxHitPoints`
- `local` 变量: camelCase: `damageAmount`, `isJumping`
- 布尔变量使用 is/has/can 前缀: `_isAlive`, `_hasKey`, `_canJump`

**文件和目录：**

- C# 脚本文件使用 PascalCase，与主类名匹配: `PlayerController.cs`
- 场景文件使用 PascalCase: `MainMenu.unity`, `Level01.unity`

### 风格和格式

- **花括号**：使用 Allman 风格（花括号在新的一行）。
- **间距**：使用 4 个空格进行缩进（不要使用制表符）。
- **`using` 指令**：将所有 `using` 指令放在文件顶部，命名空间之外。
- **`this` 关键字**：仅在需要区分字段和局部变量/参数时使用 `this`。

## Unity 架构模式

### 场景生命周期管理

**加载和切换场景：**

```csharp
// SceneLoader.cs - 用于管理场景转换的单例。
using UnityEngine;
using UnityEngine.SceneManagement;
using System.Collections;

public class SceneLoader : MonoBehaviour
{
    public static SceneLoader Instance { get; private set; }

    private void Awake()
    {
        if (Instance != null && Instance != this)
        {
            Destroy(gameObject);
            return;
        }
        Instance = this;
        DontDestroyOnLoad(gameObject);
    }

    public void LoadGameScene()
    {
        // 加载主游戏场景的示例，可能先加载一个加载屏幕。
        StartCoroutine(LoadSceneAsync("Level01"));
    }

    private IEnumerator LoadSceneAsync(string sceneName)
    {
        // 首先加载一个加载屏幕（可选）
        SceneManager.LoadScene("LoadingScreen");

        // 等待一帧让加载屏幕出现
        yield return null;

        // 在后台开始加载目标场景
        AsyncOperation asyncLoad = SceneManager.LoadSceneAsync(sceneName);

        // 在完全加载之前不要激活场景
        asyncLoad.allowSceneActivation = false;

        // 等待异步场景完全加载
        while (!asyncLoad.isDone)
        {
            // 在这里你可以用 asyncLoad.progress 更新进度条
            if (asyncLoad.progress >= 0.9f)
            {
                // 场景已加载，允许激活
                asyncLoad.allowSceneActivation = true;
            }
            yield return null;
        }
    }
}
```

### MonoBehaviour 生命周期

**理解核心 MonoBehaviour 事件：**

```csharp
// 标准 MonoBehaviour 生命周期的示例
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    // AWAKE: 当脚本实例被加载时调用。
    // 用于游戏开始前的初始化。适合缓存组件引用。
    private void Awake()
    {
        Debug.Log("PlayerController Awake!");
    }

    // ONENABLE: 当对象变为启用和活动状态时调用。
    // 适合订阅事件。
    private void OnEnable()
    {
        // 示例: UIManager.OnGamePaused += HandleGamePaused;
    }

    // START: 在脚本启用后的第一帧，在任何 Update 方法被调用之前调用。
    // 适合依赖于其他对象已初始化的逻辑。
    private void Start()
    {
        Debug.Log("PlayerController Start!");
    }

    // FIXEDUPDATE: 每个固定的帧率帧调用。
    // 用于物理计算（例如，对 Rigidbody 施加力）。
    private void FixedUpdate()
    {
        // 在这里处理 Rigidbody 移动。
    }

    // UPDATE: 每帧调用。
    // 用于大多数游戏逻辑，如处理输入和非物理移动。
    private void Update()
    {
        // 在这里处理输入和非物理移动。
    }

    // LATEUPDATE: 每帧调用，在所有 Update 函数被调用之后。
    // 适合需要跟踪在 Update 中移动的目标的相机逻辑。
    private void LateUpdate()
    {
        // 在这里处理相机跟随逻辑。
    }

    // ONDISABLE: 当行为变为禁用或非活动状态时调用。
    // 适合取消订阅事件以防止内存泄漏。
    private void OnDisable()
    {
        // 示例: UIManager.OnGamePaused -= HandleGamePaused;
    }

    // ONDESTROY: 当 MonoBehaviour 将被销毁时调用。
    // 适合任何最终的清理工作。
    private void OnDestroy()
    {
        Debug.Log("PlayerController Destroyed!");
    }
}
```

### 游戏对象模式

**基于组件的架构：**

```csharp
// Player.cs - 主 GameObject 类，作为组件的容器。
using UnityEngine;

[RequireComponent(typeof(PlayerMovement), typeof(PlayerHealth))]
public class Player : MonoBehaviour
{
    public PlayerMovement Movement { get; private set; }
    public PlayerHealth Health { get; private set; }

    private void Awake()
    {
        Movement = GetComponent<PlayerMovement>();
        Health = GetComponent<PlayerHealth>();
    }
}

// PlayerHealth.cs - 一个只负责生命值逻辑的组件。
public class PlayerHealth : MonoBehaviour
{
    [SerializeField] private int _maxHealth = 100;
    private int _currentHealth;

    private void Awake()
    {
        _currentHealth = _maxHealth;
    }

    public void TakeDamage(int amount)
    {
        _currentHealth -= amount;
        if (_currentHealth <= 0)
        {
            Die();
        }
    }

    private void Die()
    {
        // 死亡逻辑
        Debug.Log("Player has died.");
        gameObject.SetActive(false);
    }
}
```

### 使用 ScriptableObjects 进行数据驱动设计

**定义数据容器：**

```csharp
// EnemyData.cs - 一个用于保存敌人类型数据的 ScriptableObject。
using UnityEngine;

[CreateAssetMenu(fileName = "NewEnemyData", menuName = "Game/Enemy Data")]
public class EnemyData : ScriptableObject
{
    public string enemyName;
    public int maxHealth;
    public float moveSpeed;
    public int damage;
    public Sprite sprite;
}

// Enemy.cs - 一个使用 EnemyData 的 MonoBehaviour。
public class Enemy : MonoBehaviour
{
    [SerializeField] private EnemyData _enemyData;
    private int _currentHealth;

    private void Start()
    {
        _currentHealth = _enemyData.maxHealth;
        GetComponent<SpriteRenderer>().sprite = _enemyData.sprite;
    }

    // ... 其他敌人逻辑
}
```

### 系统管理

**单例管理器：**

```csharp
// GameManager.cs - 一个用于管理整体游戏状态的单例。
using UnityEngine;

public class GameManager : MonoBehaviour
{
    public static GameManager Instance { get; private set; }

    public int Score { get; private set; }

    private void Awake()
    {
        if (Instance != null && Instance != this)
        {
            Destroy(gameObject);
            return;
        }
        Instance = this;
        DontDestroyOnLoad(gameObject); // 在场景之间保持
    }

    public void AddScore(int amount)
    {
        Score += amount;
    }
}
```

## 性能优化

### 对象池

**高频对象（例如子弹、效果）的必需项：**

```csharp
// ObjectPool.cs - 一个通用的对象池系统。
using UnityEngine;
using System.Collections.Generic;

public class ObjectPool : MonoBehaviour
{
    [SerializeField] private GameObject _prefabToPool;
    [SerializeField] private int _initialPoolSize = 20;

    private Queue<GameObject> _pool = new Queue<GameObject>();

    private void Start()
    {
        for (int i = 0; i < _initialPoolSize; i++)
        {
            GameObject obj = Instantiate(_prefabToPool);
            obj.SetActive(false);
            _pool.Enqueue(obj);
        }
    }

    public GameObject GetObjectFromPool()
    {
        if (_pool.Count > 0)
        {
            GameObject obj = _pool.Dequeue();
            obj.SetActive(true);
            return obj;
        }
        // 可选地，如果池已空，则扩展池。
        return Instantiate(_prefabToPool);
    }

    public void ReturnObjectToPool(GameObject obj)
    {
        obj.SetActive(false);
        _pool.Enqueue(obj);
    }
}
```

### 帧率优化

**更新循环优化：**

- 避免在 `Update()` 或 `FixedUpdate()` 中进行昂贵的调用，如 `GetComponent`、`FindObjectOfType` 或 `Instantiate`。在 `Awake()` 或 `Start()` 中缓存引用。
- 对不需要每帧运行的逻辑使用协程或简单的计时器。

**物理优化：**

- 在项目设置中调整“Physics 2D Settings”，特别是“Layer Collision Matrix”，以防止不必要的碰撞检查。
- 对不移动的对象使用 `Rigidbody2D.Sleep()` 以节省 CPU 周期。

## 输入处理

### 跨平台输入（新输入系统）

**输入动作资产：** 创建一个输入动作资产（`.inputactions`）来定义控件。

**PlayerInput 组件：**

- 将 `PlayerInput` 组件添加到玩家 GameObject。
- 将其“Actions”设置为创建的输入动作资产。
- 将“Behavior”设置为“Invoke Unity Events”以在 Inspector 中轻松连接方法，或设置为“Send Messages”以使用如 `OnMove`、`OnFire` 等方法。

```csharp
// PlayerInputHandler.cs - 通过消息处理输入的示例。
using UnityEngine;
using UnityEngine.InputSystem;

public class PlayerInputHandler : MonoBehaviour
{
    private Vector2 _moveInput;

    // 此方法由 PlayerInput 组件通过“Send Messages”调用。
    // 该动作必须在输入动作资产中命名为“Move”。
    public void OnMove(InputValue value)
    {
        _moveInput = value.Get<Vector2>();
    }

    private void Update()
    {
        // 使用 _moveInput 控制玩家
        transform.Translate(new Vector3(_moveInput.x, _moveInput.y, 0) * Time.deltaTime * 5f);
    }
}
```

## 错误处理

### 优雅降级

**资产加载错误处理：**

- 当使用 Addressables 或 `Resources.Load` 时，在使用加载的资产之前，请务必检查它是否为 null。

```csharp
// 加载一个精灵，如果失败则使用备用精灵
Sprite playerSprite = Resources.Load<Sprite>("Sprites/Player");
if (playerSprite == null)
{
    Debug.LogError("Player sprite not found! Using default.");
    playerSprite = Resources.Load<Sprite>("Sprites/Default");
}
```

### 运行时错误恢复

**断言和日志记录：**

- 使用 `Debug.Assert(condition, "Message")` 来检查必须为 true 的关键条件。
- 使用 `Debug.LogError("Message")` 来记录致命错误，使用 `Debug.LogWarning("Message")` 来记录非关键问题。

```csharp
// 使用断言确保组件存在的示例。
private Rigidbody2D _rb;

void Awake()
{
    _rb = GetComponent<Rigidbody2D>();
    Debug.Assert(_rb != null, "Rigidbody2D component not found on player!");
}
```

## 测试标准

### 单元测试（编辑模式）

**游戏逻辑测试：**

```csharp
// HealthSystemTests.cs - 一个简单生命值系统的测试示例。
using NUnit.Framework;
using UnityEngine;

public class HealthSystemTests
{
    [Test]
    public void TakeDamage_ReducesHealth()
    {
        // Arrange
        var gameObject = new GameObject();
        var healthSystem = gameObject.AddComponent<PlayerHealth>();
        // 注意：这是一个简化的示例。您可能需要模拟依赖项。

        // Act
        healthSystem.TakeDamage(20);

        // Assert
        // 这需要使生命值可用于测试，例如通过公共属性或方法。
        // Assert.AreEqual(80, healthSystem.CurrentHealth);
    }
}
```

### 集成测试（播放模式）

**场景测试：**

- 播放模式测试在活动场景中运行，允许您测试多个组件和系统之间的交互。
- 使用 `yield return null;` 等待下一帧。

```csharp
// PlayerJumpTest.cs
using System.Collections;
using NUnit.Framework;
using UnityEngine;
using UnityEngine.TestTools;

public class PlayerJumpTest
{
    [UnityTest]
    public IEnumerator PlayerJumps_WhenSpaceIsPressed()
    {
        // Arrange
        var player = new GameObject().AddComponent<PlayerController>();
        var initialY = player.transform.position.y;

        // Act
        // 模拟按下跳跃按钮（需要为测试设置输入系统）
        // 为简单起见，我们在这里调用一个公共方法。
        // player.Jump();

        // 等待几个物理帧
        yield return new WaitForSeconds(0.5f);

        // Assert
        Assert.Greater(player.transform.position.y, initialY);
    }
}
```

## 文件组织

### 项目结构

```
Assets/
├── Scenes/
│   ├── MainMenu.unity
│   └── Level01.unity
├── Scripts/
│   ├── Core/
│   │   ├── GameManager.cs
│   │   └── AudioManager.cs
│   ├── Player/
│   │   ├── PlayerController.cs
│   │   └── PlayerHealth.cs
│   ├── Editor/
│   │   └── CustomInspectors.cs
│   └── Data/
│       └── EnemyData.cs
├── Prefabs/
│   ├── Player.prefab
│   └── Enemies/
│       └── Slime.prefab
├── Art/
│   ├── Sprites/
│   └── Animations/
├── Audio/
│   ├── Music/
│   └── SFX/
├── Data/
│   └── ScriptableObjects/
│       └── EnemyData/
└── Tests/
    ├── EditMode/
    │   └── HealthSystemTests.cs
    └── PlayMode/
        └── PlayerJumpTest.cs
```

## 开发工作流程

### 故事实施过程

1. **阅读故事要求：**
   - 理解验收标准
   - 确定技术要求
   - 审查性能限制

2. **计划实施：**
   - 确定要创建/修改的文件
   - 考虑 Unity 的基于组件的架构
   - 计划测试方法

3. **实施功能：**
   - 遵循所有指南编写干净的 C# 代码
   - 使用既定模式
   - 保持稳定的 FPS 性能

4. **测试实施：**
   - 为游戏逻辑编写编辑模式测试
   - 为集成测试编写播放模式测试
   - 测试跨平台功能
   - 验证性能目标

5. **更新文档：**
   - 将故事复选框标记为完成
   - 记录任何偏差
   - 如果需要，更新架构

### 代码审查清单

- [ ] C# 代码编译无误，无警告。
- [ ] 所有自动化测试通过。
- [ ] 代码遵循命名约定和架构模式。
- [ ] `Update()` 循环中没有昂贵的操作。
- [ ] 公共字段/方法有注释文档。
- [ ] 新资产已组织到正确的文件夹中。

## 性能目标

### 帧率要求

- **PC/主机**：保持稳定的 60+ FPS。
- **移动端**：在中端设备上保持 60 FPS，在低端设备上最低 30 FPS。
- **优化**：使用 Unity Profiler 识别和修复性能下降。

### 内存管理

- **总内存**：保持构建在平台特定限制内（例如，对于简单的移动游戏，低于 200MB）。
- **垃圾回收**：通过避免在循环中使用字符串连接、`new` 关键字以及通过池化对象来最小化 GC 峰值。

### 加载性能

- **初始加载**：游戏启动低于 5 秒。
- **场景转换**：场景之间低于 2 秒。使用异步场景加载。

这些指南确保了一致、高质量的游戏开发，满足性能目标并在所有实施故事中保持代码质量。

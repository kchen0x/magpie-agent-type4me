# agent-type4me

让 [Type4Me](https://github.com/joewongjc/type4me)（macOS 语音输入应用）作为 [Magpie](https://github.com/yetone/magpie) 的一个 Agent：在 Magpie 的 Agent 页或菜单栏为 Type4Me 的 LLM 后处理选择模型，和其他 Agent 统一管理。

## 安装

```bash
magpie plugin add @magpie-community/agent-type4me
```

npm 包发布之前，Magpie 0.1.1243 及以后的版本会从社区仓库的 `dist` 分支安装。更早的 Magpie 可以从 GitHub 安装：

```bash
magpie plugin add github:kchen0x/magpie-agent-type4me
```

然后在 Magpie 的 Agent 页为 Type4Me 选择模型，或执行：

```bash
magpie type4me magpie/deepseek/deepseek-flash
```

在 Type4Me 的“设置 › 模型”中选择 **Magpie（本机模型网关）** 并设为默认。换模型后下一次语音输入即生效，无需重启。

## 写入内容

Magpie 只改一个文件：`~/Library/Application Support/Type4Me/magpie-agent.json`

```json
{
  "model": "deepseek/deepseek-flash",
  "baseURL": "http://127.0.0.1:3425/v1",
  "apiKey": "magpie-…"
}
```

- Type4Me 与 Type4Me Dev 共用这个目录，一个插件同时覆盖两者；
- 在 Type4Me 设置里换模型，Magpie 会同步显示（Type4Me 会执行 `magpie type4me magpie/<model>`）；Type4Me 不会改 `baseURL` 和 `apiKey`；
- 在 Magpie 中关闭 Type4Me 会删除这三个键，Type4Me 回到直连 Magpie，使用在 Type4Me 中选的模型。

不装这个插件，Type4Me 也能直接使用 Magpie：它会自己列出 Magpie 的模型并发送请求。插件的作用是让 Type4Me 出现在 Magpie 的 Agent 页、菜单栏和 Profile 中。

## 开发

源码维护在本仓库，并复制到 [magpie-community/plugins](https://github.com/magpie-community/plugins) 的 `packages/type4me`。按社区规范，`type4me.agent.js` 是单文件、不导入任何模块；图标通过 https 地址引用本仓库的 `assets/icon.svg`。

```bash
bun test                                # 检查 connect 的返回值
magpie plugin add ./type4me.agent.js    # 在本机 Magpie 上试装
```

`agent.config` 必须与 Type4Me 中 `MagpieAgentFile.defaultURL` 一致。

## 许可

MIT

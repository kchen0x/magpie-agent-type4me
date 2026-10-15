# agent-type4me

让 [Type4Me](https://github.com/joewongjc/type4me) 作为 [Magpie](https://github.com/yetone/magpie) 的一个 Agent：在 Magpie 的 Agent 页或菜单栏为 Type4Me 的 LLM 后处理选择模型，和其他 Agent 统一管理。

## 安装

```bash
magpie plugin add @magpie-community/agent-type4me
```

npm 包发布之前，可以从 GitHub 安装：

```bash
magpie plugin add github:kchen0x/magpie-agent-type4me
```

然后在 Magpie 的 Agent 页为 Type4Me 选择模型，或执行：

```bash
magpie type4me magpie/deepseek/deepseek-chat
```

在 Type4Me 的“设置 › 模型”中选择 **Magpie（本机模型网关）** 并设为默认。换模型后下一次语音输入即生效，无需重启。

## 写入内容

Magpie 只改一个文件：`~/Library/Application Support/Type4Me/magpie-agent.json`

```json
{
  "model": "deepseek/deepseek-chat",
  "baseURL": "http://127.0.0.1:3425/v1",
  "apiKey": "<Magpie 为该 Agent 生成的 key>"
}
```

- Type4Me 与 Type4Me Dev 共用这个目录，一个插件同时覆盖两者；
- Type4Me 自己也可以修改 `model`，但不会改 `baseURL` 和 `apiKey`；
- `magpie type4me default` 会删除这三个键，Type4Me 回到直连 Magpie，使用在 Type4Me 中选的模型。

不装这个插件，Type4Me 也能直接使用 Magpie：它会自己列出 Magpie 的模型并发送请求。插件的作用是让 Type4Me 出现在 Magpie 的 Agent 页、菜单栏和 Profile 中。

## 开发

```bash
bun test                    # 运行检查
bun scripts/gen-icon.mjs    # 修改 assets/icon.png 后重新生成 icon.js
magpie plugin add ./type4me.agent.js   # 在本机 Magpie 上试装
```

`CONFIG_PATH` 必须与 Type4Me 中 `MagpieAgentFile.defaultURL` 一致。

## 许可

MIT

# agent-type4me

[Type4Me](https://github.com/joewongjc/type4me) as a [magpie](https://github.com/yetone/magpie) agent. Pick the model Type4Me's LLM post-processing uses from magpie's Agents page or menu bar, next to your other agents.

中文说明见 [README.zh-CN.md](README.zh-CN.md)。

## Install

```bash
magpie plugin add @magpie-community/agent-type4me
```

Until the npm package is out, install it from GitHub:

```bash
magpie plugin add github:kchen0x/magpie-agent-type4me
```

Then pick a model for Type4Me on magpie's Agents page, or:

```bash
magpie type4me magpie/deepseek/deepseek-chat
```

In Type4Me, open Settings › Models, choose **Magpie (Local Gateway)** and set it as the default. Type4Me uses the new model on your next dictation; no restart.

## What it writes

magpie edits one file, `~/Library/Application Support/Type4Me/magpie-agent.json`:

```json
{
  "model": "deepseek/deepseek-chat",
  "baseURL": "http://127.0.0.1:3425/v1",
  "apiKey": "<this agent's magpie key>"
}
```

- Type4Me and Type4Me Dev share this folder, so one plugin covers both.
- Type4Me may change `model` itself; it never changes `baseURL` or `apiKey`.
- `magpie type4me default` removes the three keys, and Type4Me goes back to talking to magpie directly with the model you picked in Type4Me.

Type4Me works with magpie without this plugin too: it lists magpie's models and sends requests itself. The plugin adds Type4Me to magpie's Agents page, menu bar and profiles.

## Develop

```bash
bun test                    # the agent's checks
bun scripts/gen-icon.mjs    # after changing assets/icon.png
magpie plugin add ./type4me.agent.js   # try it against your own magpie
```

`CONFIG_PATH` must match `MagpieAgentFile.defaultURL` in Type4Me.

## License

MIT

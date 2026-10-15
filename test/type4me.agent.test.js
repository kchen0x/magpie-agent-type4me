import { describe, expect, test } from "bun:test"
import { agent, connect, CONFIG_PATH, PROFILE_DIR } from "../type4me.agent.js"

// magpie's own check (internal/agentplug Desc.check)
const ID_OK = /^[a-z0-9][a-z0-9._-]{0,63}$/

describe("agent", () => {
  test("has an id magpie accepts", () => {
    expect(agent.id).toMatch(ID_OK)
  })

  test("names a JSON config inside the shared Type4Me profile folder", () => {
    expect(agent.format).toBe("json")
    expect(agent.config).toBe("~/Library/Application Support/Type4Me/magpie-agent.json")
    expect(agent.config).toBe(CONFIG_PATH)
    expect(agent.config.startsWith(PROFILE_DIR + "/")).toBe(true)
    expect(agent.dir).toBe(PROFILE_DIR)
  })

  test("keeps the model at the top-level key Type4Me reads", () => {
    expect(agent.model).toBe("model")
    expect(agent.prefix).toBeUndefined()
  })

  test("gives a PNG icon magpie will take", () => {
    expect(agent.icon.startsWith("data:image/png;base64,")).toBe(true)
    const bytes = Buffer.from(agent.icon.split(",")[1], "base64")
    expect(bytes.length).toBeLessThan(1 << 20)
    expect(bytes.subarray(1, 4).toString()).toBe("PNG")
  })

  test("says what happens after a change in both languages", () => {
    expect(agent.notice).toContain("next dictation")
    expect(agent.notice).toContain("下一次语音输入")
  })
})

describe("connect", () => {
  const gateway = { url: "http://127.0.0.1:3425", v1: "http://127.0.0.1:3425/v1", key: "k-123" }

  test("writes the /v1 base URL and the agent's key, nothing else", () => {
    expect(connect({ gateway, model: { id: "deepseek/deepseek-chat" }, models: [] })).toEqual({
      baseURL: gateway.v1,
      apiKey: gateway.key,
    })
  })

  test("never writes the model key, which magpie owns", () => {
    expect(Object.keys(connect({ gateway }))).not.toContain(agent.model)
  })
})

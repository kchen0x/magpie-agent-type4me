// Type4Me as a magpie agent.
//
// Type4Me (a macOS voice input app) keeps the model its LLM post-processing
// uses in a small JSON file in its shared profile folder. Type4Me Prod and
// Type4Me Dev both read it, so one agent covers both builds.
//
// magpie writes the model there, plus the gateway's address and this
// agent's key; Type4Me reads the file before each dictation, so a new model
// takes effect on the next one without a restart. Type4Me may also change
// the model itself (through `magpie type4me magpie/<model>`), but never the
// address or the key.

import { icon } from "./icon.js"

// Keep in sync with MagpieAgentFile.defaultURL in Type4Me.
export const CONFIG_PATH = "~/Library/Application Support/Type4Me/magpie-agent.json"
export const PROFILE_DIR = "~/Library/Application Support/Type4Me"

export const agent = {
  id: "type4me",
  name: "Type4Me",
  config: CONFIG_PATH,
  format: "json",
  model: "model",
  dir: PROFILE_DIR,
  ua: ["Type4Me"],
  icon,
  notice:
    "Type4Me uses the new model on your next dictation. " +
    "Type4Me 会在下一次语音输入时使用新模型。",
}

// The keys written beside the model. Type4Me talks to the gateway's
// OpenAI Chat Completions endpoint, so it wants the /v1 base URL.
export function connect({ gateway }) {
  return { baseURL: gateway.v1, apiKey: gateway.key }
}

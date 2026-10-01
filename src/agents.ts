import { Agent } from "@anvia/core";
import { BASE_INSTRUCTIONS } from "./instructions.js";
import { getModel } from "./models.js";
import { sandboxTools } from "./sandbox.js";
import { lens } from "./observer.js";
import { searchWeb } from "./tools/search-web.js";

export function createAgent() {
    return new Agent({
        id: "assistant",
        model: getModel(),
        instructions: BASE_INSTRUCTIONS,
        tools: [...sandboxTools, searchWeb],
        observability: {
            observers: {
                tracing: lens.observer(),
            },
        },
        maxTurns: 75,
    });
}
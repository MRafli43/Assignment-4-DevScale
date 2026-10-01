import { Studio } from "@anvia/studio";
import { createAgent } from "./agents.js";
import { sandbox } from "./sandbox.js";

const agent = createAgent();

export const studio = new Studio([agent]).serve({
     port: 3000,
     onShutdown: async () => sandbox.destroy(), 
    });
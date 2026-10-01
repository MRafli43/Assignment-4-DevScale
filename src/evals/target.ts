import { createAgent } from "../agents.js";
import { sandbox } from "../sandbox.js";

const REPORT_PATH = "output/report.md";
const agent = createAgent();

async function readReport(): Promise<string | null> {
    const files = await sandbox.runtime.listFiles({ path: "output" });
    const exists = files.some((f) => f.path.endsWith("report.md"));
    return exists ? sandbox.runtime.readTextFile({ path: REPORT_PATH }) : null;
}

// Runs the agent on one input and returns its reply plus the report file content
// (or "NO_REPORT" if no file was written), so a single string can be checked.
export async function researchTarget(input: string): Promise<string> {
    await sandbox.runtime.exec({ command: "rm", args: ["-f", REPORT_PATH] });
    const res = await agent.generate({ prompt: input });
    const report = await readReport();
    return `${res.text}\n\n=== REPORT ===\n${report ?? "NO_REPORT"}`;
}
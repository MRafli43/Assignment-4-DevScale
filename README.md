# Assignment 4 — Research Agent with Sandbox

Simple research agent built with TypeScript and Anvia.

The agent is designed to research a given topic using web search, evaluate the available information, and create a Markdown research report using a sandbox workspace.

## Features

* Research-focused AI agent
* Web search for gathering information
* Source URL included in research reports
* Sandbox tools for reading and writing files
* Markdown report generation
* Evaluation using Anvia Evals
* 5 evaluation cases covering different research scenarios
* Sandbox cleanup after each run

## Agent Workflow

The agent follows this general workflow:

```text
User Request
     │
     ▼
Research Agent
     │
     ├── Web Search
     │      │
     │      ▼
     │   Search Results
     │
     ├── Evaluate Information
     │
     └── Sandbox
            │
            ├── Read files
            └── Write report
                    │
                    ▼
              output/report.md
```

The agent should only create a report when the search provides useful information for the requested topic.

When the available search results do not provide useful information, the agent should not create a research report.

## Research Report

Generated reports are written to:

```text
output/report.md
```

The report contains the relevant research findings and the source URL used to support the information.

A typical report contains:

```text
# Topic

Summary

How it works

Limitations

Source
```

The source URL is included so that the information in the report can be traced back to the original web source.

## Sandbox

The agent uses an Anvia Sandbox as its workspace.

The sandbox provides file-related capabilities that can be exposed to the agent as tools, such as:

* `read_file`
* `write_file`
* `list_files`

The sandbox is created for the research task and destroyed during cleanup after the run. Anvia recommends destroying ephemeral sandboxes in a `finally` block so cleanup still happens when the run fails.

## Evaluation

The project contains five evaluation cases:

### 1. Clear Answer

Tests whether the agent can research and answer a clear research question.

Expected behavior:

* Find useful information.
* Provide an answer.
* Include a source URL.
* Create the research report.

### 2. Ambiguous Request

Tests whether the agent asks for clarification when the user's request does not provide enough information.

Expected behavior:

* Ask for clarification.
* Do not create a report.

### 3. No Useful Result

Tests whether the agent correctly handles a topic for which the search results do not provide useful information.

Expected behavior:

* State that useful information was not found.
* Do not create a report.

### 4. Source Citation

Tests whether the research output contains the source URL used for the information.

Expected behavior:

* Provide the research answer.
* Include the source URL.
* Include the source URL in the generated report.

### 5. Report Created

Tests whether the agent can create the expected report file in the sandbox.

Expected behavior:

* Complete the research.
* Create `output/report.md`.
* Write the research result into the report.

## Running the Project

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment variables

Create a `.env` file in the project root.

Use the provided environment example as a reference:

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Fill in the required API keys and configuration values in `.env`.

Do not commit `.env` to Git.

## Run the Agent

Use the development command configured in `package.json`.

```bash
pnpm dev
```

If the project exposes the agent through another command, use the corresponding script defined in `package.json`.

## Run Evaluations

Run the evaluation suite with:

```bash
pnpm eval:report
```

The evaluation runner executes all five cases and reports their results.

Example:

```text
Cases: 5 total / 5 pass / 0 fail / 0 invalid
Metrics: 5 total / 5 pass / 0 fail / 0 invalid
```

The project uses:

```ts
runEvalCli({
    name: "report",
    cases: reportCases,
    target: researchTarget,
    metrics: [contains()],
    format: "pretty",
    exitCode: true,
});
```

With `exitCode: true`, a failed evaluation causes the process to return a non-zero exit code. This makes the evaluation command suitable for detecting unsuccessful evaluation runs.

## Evaluation Result

The target is for all five evaluation cases to pass:

```text
clear-answer       PASS
ambiguous          PASS
no-useful-result   PASS
source-citation    PASS
report-created     PASS
```

The final expected result is:

```text
Cases: 5 total / 5 pass / 0 fail / 0 invalid
Metrics: 5 total / 5 pass / 0 fail / 0 invalid
```

## Project Structure

The main project structure is organized around the agent, tools, sandbox, and evaluations:

```text
.
├── src/
│   ├── ...
│   ├── sandbox.ts
│   ├── observer.ts
│   └── evals/
│       ├── report.ts
│       ├── report-cases.ts
│       └── target.ts
│
├── output/
│   └── report.md
│
├── .env.example
├── .gitignore
├── package.json
├── pnpm-lock.yaml
└── tsconfig.json
```

The exact source files may vary depending on the implementation.

## Security and Environment Files

The following files should not be committed:

```text
.env
node_modules/
```

Use `.env.example` to document required environment variables without exposing API keys or other secrets.

## Assignment Requirements

This project demonstrates:

* A simple research agent
* Web search capability
* Source URL inclusion in research reports
* Sandbox file operations
* Research report creation
* Five evaluation cases
* Evaluation of clear, ambiguous, unsuccessful, citation, and file-creation scenarios

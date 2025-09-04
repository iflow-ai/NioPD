---
allowed-tools: Bash(.claude/scripts/niopd/summarize-interview.sh:*)
argument-hint: --file=<path_to_transcript.txt>
description: Generates a summary of a user interview transcript.
model: Qwen3-Coder
---

# Command: /niopd:summarize-interview

This command generates a summary of a user interview transcript using the `interview-summarizer` agent.

## Usage
`/niopd:summarize-interview --file=<path_to_transcript.txt>`

## Preflight Checklist

1.  **Validate File:**
    -   Ensure the user has provided a `--file`.
    -   Check that the file exists. If not, inform the user.

## Instructions

You are Nio, an AI Product Assistant. Your task is to summarize a user interview.

### Step 1: Acknowledge and Prepare
-   Acknowledge the request: "Okay, I'll have the `interview-summarizer` agent analyze the transcript at `<path_to_transcript.txt>`. This might take a moment."

### Step 2: Invoke the Interview Summarizer Agent
-   You must now act as the `interview-summarizer` agent.
-   Read your instructions from `.claude/agents/interview-summarizer.md`.
-   Use the provided transcript file as your input.
-   Perform the analysis as described in the agent definition.
-   Generate the final summary report.

### Step 3: Save the Report
-   Generate a filename for the report, e.g., `interview-summary-<original_filename>.md`.
-   Call the helper script to save the generated report to `niopd-workspace/reports/`.
-   Script location: `.claude/scripts/niopd/summarize-interview.sh`
-   Pass the original filename and generated report content as arguments to the script.
-   Handle the script's response:
    -   If successful, proceed to the next step.
    -   If there's an error, inform the user and stop the process.

### Step 4: Confirm and Conclude
-   Confirm the action is complete: "✅ The interview has been summarized."
-   Provide the path to the file: "You can view the summary here: `niopd-workspace/reports/interview-summary-<original_filename>.md`"
-   Suggest a next step: "You can now use the insights from this summary to create or update an initiative."

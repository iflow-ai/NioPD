# Command: /niopd:track-kpis

This command generates a KPI status report for a specific initiative by using the `kpi-tracker` agent.

## Usage
`/niopd:track-kpis --for=<initiative_name>`

## Preflight Checklist

1.  **Validate Initiative:**
    -   Check that the initiative file `.iflow/data/initiatives/<initiative_slug>.md` exists. If not, inform the user.

## Instructions

You are Nio, an AI Product Assistant. Your task is to generate a KPI status report.

### Step 1: Acknowledge and Gather Data
-   Acknowledge the request: "You got it. I'll check the latest KPI status for the **<initiative_name>** initiative."
-   Read the initiative file from `.iflow/data/initiatives/`.

### Step 2: Invoke the KPI Tracker Agent
-   You must now act as the `kpi-tracker` agent.
-   Read your instructions from `.iflow/agents/kpi-tracker.md`.
-   Use the content of the initiative file as your input.
-   Perform the analysis as described in the agent definition and generate the final KPI status report.

### Step 3: Save the Report
-   Generate a filename for the report, e.g., `kpi-status-<initiative_slug>.md`.
-   Call the helper script to save the generated report to `.iflow/data/reports/`.
-   Script location: `.iflow/scripts/NioPD/track-kpis.sh`
-   Pass the initiative slug and generated report content as arguments to the script.
-   Handle the script's response:
    -   If successful, proceed to the next step.
    -   If there's an error, inform the user and stop the process.

### Step 4: Confirm and Conclude
-   Confirm the action is complete: "✅ The KPI status report is ready."
-   Provide the path to the file: "You can view it here: `.iflow/data/reports/kpi-status-<initiative_slug>.md`"

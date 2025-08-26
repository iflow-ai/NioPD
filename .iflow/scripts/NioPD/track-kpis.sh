#!/bin/bash

# A script to save a KPI status report.
# Usage: ./track-kpis.sh <initiative_slug> <report_content>

# --- Input Validation ---
if [ "$#" -ne 2 ]; then
    echo "Error: Invalid number of arguments."
    echo "Usage: $0 <initiative_slug> <report_content>"
    exit 1
fi

INITIATIVE_SLUG=$1
REPORT_CONTENT=$2
FILE_PATH=".iflow/data/reports/kpi-status-${INITIATIVE_SLUG}.md"

# --- File Creation ---
echo "Saving KPI status report to: ${FILE_PATH}"

# Write the content to the file. The -e flag allows for interpretation of backslash escapes.
echo -e "$REPORT_CONTENT" > "$FILE_PATH"

# --- Verification and Confirmation ---
if [ -f "$FILE_PATH" ]; then
    echo "✅ Success: KPI status report saved."
    echo "File location: ${FILE_PATH}"
    exit 0
else
    echo "❌ Error: Failed to save KPI status report."
    exit 1
fi
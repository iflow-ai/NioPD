#!/bin/bash

# A script to save a market trend report.
# Usage: ./research-trends.sh <topic_slug> <report_content>

# --- Input Validation ---
if [ "$#" -ne 2 ]; then
    echo "Error: Invalid number of arguments."
    echo "Usage: $0 <topic_slug> <report_content>"
    exit 1
fi

TOPIC_SLUG=$1
REPORT_CONTENT=$2
FILE_PATH=".iflow/data/reports/trend-report-${TOPIC_SLUG}.md"

# --- File Creation ---
echo "Saving market trend report to: ${FILE_PATH}"

# Write the content to the file. The -e flag allows for interpretation of backslash escapes.
echo -e "$REPORT_CONTENT" > "$FILE_PATH"

# --- Verification and Confirmation ---
if [ -f "$FILE_PATH" ]; then
    echo "✅ Success: Market trend report saved."
    echo "File location: ${FILE_PATH}"
    exit 0
else
    echo "❌ Error: Failed to save market trend report."
    exit 1
fi
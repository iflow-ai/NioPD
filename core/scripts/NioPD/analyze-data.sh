#!/bin/bash

# A script to save a data analysis report.
# Usage: ./analyze-data.sh <original_filename> <report_content>

# --- Input Validation ---
if [ "$#" -ne 2 ]; then
    echo "Error: Invalid number of arguments."
    echo "Usage: $0 <original_filename> <report_content>"
    exit 1
fi

ORIGINAL_FILENAME=$1
REPORT_CONTENT=$2
FILE_PATH="niopd-workspace/reports/data-analysis-${ORIGINAL_FILENAME}.md"

# --- File Creation ---
echo "Saving data analysis report to: ${FILE_PATH}"

# Write the content to the file. The -e flag allows for interpretation of backslash escapes.
echo -e "$REPORT_CONTENT" > "$FILE_PATH"

# --- Verification and Confirmation ---
if [ -f "$FILE_PATH" ]; then
    echo "✅ Success: Data analysis report saved."
    echo "File location: ${FILE_PATH}"
    exit 0
else
    echo "❌ Error: Failed to save data analysis report."
    exit 1
fi
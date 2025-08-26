#!/bin/bash

# A script to save a feedback summary report.
# Usage: ./summarize-feedback.sh <feedback_filename> <report_content>

# --- Input Validation ---
if [ "$#" -ne 2 ]; then
    echo "Error: Invalid number of arguments."
    echo "Usage: $0 <feedback_filename> <report_content>"
    exit 1
fi

FEEDBACK_FILENAME=$1
REPORT_CONTENT=$2
FILE_PATH=".iflow/data/reports/summary-${FEEDBACK_FILENAME}.md"

# --- File Creation ---
echo "Saving feedback summary report to: ${FILE_PATH}"

# Write the content to the file. The -e flag allows for interpretation of backslash escapes.
echo -e "$REPORT_CONTENT" > "$FILE_PATH"

# --- Verification and Confirmation ---
if [ -f "$FILE_PATH" ]; then
    echo "✅ Success: Feedback summary report saved."
    echo "File location: ${FILE_PATH}"
    exit 0
else
    echo "❌ Error: Failed to save feedback summary report."
    exit 1
fi
#!/bin/bash

# A script to save an interview summary report.
# Usage: ./summarize-interview.sh <original_filename> <interview_topic> <report_content>

# --- Input Validation ---
if [ "$#" -ne 3 ]; then
    echo "Error: Invalid number of arguments."
    echo "Usage: $0 <original_filename> <interview_topic> <report_content>"
    exit 1
fi

ORIGINAL_FILENAME=$1
INTERVIEW_TOPIC=$2
REPORT_CONTENT=$3

# Get current date in YYYYMMDD format
DATE=$(date +%Y%m%d)

# Convert interview topic to lowercase and replace spaces with hyphens for the filename
INTERVIEW_TOPIC_FORMATTED=$(echo "$INTERVIEW_TOPIC" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')

# Create filename with new naming convention
FILENAME="${DATE}-${INTERVIEW_TOPIC_FORMATTED}-interview-summary-v1.md"
FILE_PATH="niopd-workspace/reports/${FILENAME}"

# --- File Creation ---
echo "Saving interview summary report to: ${FILE_PATH}"

# Write the content to the file. The -e flag allows for interpretation of backslash escapes.
echo -e "$REPORT_CONTENT" > "$FILE_PATH"

# --- Verification and Confirmation ---
if [ -f "$FILE_PATH" ]; then
    echo "✅ Success: Interview summary report saved."
    echo "File location: ${FILE_PATH}"
    exit 0
else
    echo "❌ Error: Failed to save interview summary report."
    exit 1
fi
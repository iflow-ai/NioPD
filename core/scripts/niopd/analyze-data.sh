#!/bin/bash

# A script to save a data analysis report.
# Usage: ./analyze-data.sh <original_filename> <data_topic> <report_content>

# --- Input Validation ---
if [ "$#" -ne 3 ]; then
    echo "Error: Invalid number of arguments."
    echo "Usage: $0 <original_filename> <data_topic> <report_content>"
    exit 1
fi

ORIGINAL_FILENAME=$1
DATA_TOPIC=$2
REPORT_CONTENT=$3

# Get current date in YYYYMMDD format
DATE=$(date +%Y%m%d)

# Convert data topic to lowercase and replace spaces with hyphens for the filename
DATA_TOPIC_FORMATTED=$(echo "$DATA_TOPIC" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')

# Create filename with new naming convention
FILENAME="${DATE}-${DATA_TOPIC_FORMATTED}-data-analysis-v1.md"
FILE_PATH="niopd-workspace/reports/${FILENAME}"

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
#!/bin/bash

# A script to save a market trend report.
# Usage: ./research-trends.sh <topic_slug> <topic_name> <report_content>

# --- Input Validation ---
if [ "$#" -ne 3 ]; then
    echo "Error: Invalid number of arguments."
    echo "Usage: $0 <topic_slug> <topic_name> <report_content>"
    exit 1
fi

TOPIC_SLUG=$1
TOPIC_NAME=$2
REPORT_CONTENT=$3

# Get current date in YYYYMMDD format
DATE=$(date +%Y%m%d)

# Convert topic name to lowercase and replace spaces with hyphens for the filename
TOPIC_NAME_FORMATTED=$(echo "$TOPIC_NAME" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')

# Create filename with new naming convention
FILENAME="${DATE}-${TOPIC_NAME_FORMATTED}-trend-report-v1.md"
FILE_PATH="niopd-workspace/reports/${FILENAME}"

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
#!/bin/bash

# A script to save a competitor analysis report.
# Usage: ./analyze-competitor.sh <domain_name> <report_content>

# --- Input Validation ---
if [ "$#" -ne 2 ]; then
    echo "Error: Invalid number of arguments."
    echo "Usage: $0 <domain_name> <report_content>"
    exit 1
fi

DOMAIN_NAME=$1
REPORT_CONTENT=$2

# Get current date in YYYYMMDD format
DATE=$(date +%Y%m%d)

# Convert domain name to lowercase and replace spaces with hyphens for the filename
DOMAIN_NAME_FORMATTED=$(echo "$DOMAIN_NAME" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')

# Create filename with new naming convention
FILENAME="${DATE}-${DOMAIN_NAME_FORMATTED}-competitor-analysis-v1.md"
FILE_PATH="niopd-workspace/reports/${FILENAME}"

# --- File Creation ---
echo "Saving competitor analysis report to: ${FILE_PATH}"

# Write the content to the file. The -e flag allows for interpretation of backslash escapes.
echo -e "$REPORT_CONTENT" > "$FILE_PATH"

# --- Verification and Confirmation ---
if [ -f "$FILE_PATH" ]; then
    echo "✅ Success: Competitor analysis report saved."
    echo "File location: ${FILE_PATH}"
    exit 0
else
    echo "❌ Error: Failed to save competitor analysis report."
    exit 1
fi
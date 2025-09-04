#!/bin/bash

# A script to save a KPI status report.
# Usage: ./track-kpis.sh <initiative_slug> <initiative_name> <report_content>

# --- Input Validation ---
if [ "$#" -ne 3 ]; then
    echo "Error: Invalid number of arguments."
    echo "Usage: $0 <initiative_slug> <initiative_name> <report_content>"
    exit 1
fi

INITIATIVE_SLUG=$1
INITIATIVE_NAME=$2
REPORT_CONTENT=$3

# Get current date in YYYYMMDD format
DATE=$(date +%Y%m%d)

# Convert initiative name to lowercase and replace spaces with hyphens for the filename
INITIATIVE_NAME_FORMATTED=$(echo "$INITIATIVE_NAME" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')

# Create filename with new naming convention
FILENAME="${DATE}-${INITIATIVE_NAME_FORMATTED}-kpi-report-v1.md"
FILE_PATH="niopd-workspace/reports/${FILENAME}"

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
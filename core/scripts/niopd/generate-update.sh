#!/bin/bash

# A script to save a stakeholder update report.
# Usage: ./generate-update.sh <initiative_slug> <update_content>

# --- Input Validation ---
if [ "$#" -ne 2 ]; then
    echo "Error: Invalid number of arguments."
    echo "Usage: $0 <initiative_slug> <update_content>"
    exit 1
fi

INITIATIVE_SLUG=$1
UPDATE_CONTENT=$2
FILE_PATH="niopd-workspace/reports/update-${INITIATIVE_SLUG}.md"

# --- File Creation ---
echo "Saving stakeholder update report to: ${FILE_PATH}"

# Write the content to the file. The -e flag allows for interpretation of backslash escapes.
echo -e "$UPDATE_CONTENT" > "$FILE_PATH"

# --- Verification and Confirmation ---
if [ -f "$FILE_PATH" ]; then
    echo "✅ Success: Stakeholder update report saved."
    echo "File location: ${FILE_PATH}"
    exit 0
else
    echo "❌ Error: Failed to save stakeholder update report."
    exit 1
fi
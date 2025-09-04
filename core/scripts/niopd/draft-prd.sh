#!/bin/bash

# A script to save a PRD draft.
# Usage: ./draft-prd.sh <initiative_slug> <initiative_name> <prd_content>

# --- Input Validation ---
if [ "$#" -ne 3 ]; then
    echo "Error: Invalid number of arguments."
    echo "Usage: $0 <initiative_slug> <initiative_name> <prd_content>"
    exit 1
fi

INITIATIVE_SLUG=$1
INITIATIVE_NAME=$2
PRD_CONTENT=$3

# Get current date in YYYYMMDD format
DATE=$(date +%Y%m%d)

# Convert initiative name to lowercase and replace spaces with hyphens for the filename
INITIATIVE_NAME_FORMATTED=$(echo "$INITIATIVE_NAME" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')

# Create filename with new naming convention
FILENAME="${DATE}-${INITIATIVE_NAME_FORMATTED}-prd-v1.md"
FILE_PATH="niopd-workspace/prds/${FILENAME}"

# --- File Creation ---
echo "Saving PRD draft to: ${FILE_PATH}"

# Write the content to the file. The -e flag allows for interpretation of backslash escapes.
echo -e "$PRD_CONTENT" > "$FILE_PATH"

# --- Verification and Confirmation ---
if [ -f "$FILE_PATH" ]; then
    echo "✅ Success: PRD draft saved."
    echo "File location: ${FILE_PATH}"
    exit 0
else
    echo "❌ Error: Failed to save PRD draft."
    exit 1
fi
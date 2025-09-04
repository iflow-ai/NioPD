#!/bin/bash

# A script to save a PRD draft.
# Usage: ./draft-prd.sh <initiative_slug> <prd_content>

# --- Input Validation ---
if [ "$#" -ne 2 ]; then
    echo "Error: Invalid number of arguments."
    echo "Usage: $0 <initiative_slug> <prd_content>"
    exit 1
fi

INITIATIVE_SLUG=$1
PRD_CONTENT=$2
FILE_PATH="niopd-workspace/prds/prd-${INITIATIVE_SLUG}.md"

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
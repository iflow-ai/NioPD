#!/bin/bash

# A script to save a user personas document.
# Usage: ./generate-personas.sh <initiative_name> <personas_content>

# --- Input Validation ---
if [ "$#" -ne 2 ]; then
    echo "Error: Invalid number of arguments."
    echo "Usage: $0 <initiative_name> <personas_content>"
    exit 1
fi

INITIATIVE_NAME=$1
PERSONAS_CONTENT=$2

# Get current date in YYYYMMDD format
DATE=$(date +%Y%m%d)

# Convert initiative name to lowercase and replace spaces with hyphens for the filename
INITIATIVE_NAME_FORMATTED=$(echo "$INITIATIVE_NAME" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')

# Create filename with new naming convention
FILENAME="${DATE}-${INITIATIVE_NAME_FORMATTED}-user-personas-v1.md"
FILE_PATH="niopd-workspace/reports/${FILENAME}"

# --- File Creation ---
echo "Saving user personas document to: ${FILE_PATH}"

# Write the content to the file. The -e flag allows for interpretation of backslash escapes.
echo -e "$PERSONAS_CONTENT" > "$FILE_PATH"

# --- Verification and Confirmation ---
if [ -f "$FILE_PATH" ]; then
    echo "✅ Success: User personas document saved."
    echo "File location: ${FILE_PATH}"
    exit 0
else
    echo "❌ Error: Failed to save user personas document."
    exit 1
fi
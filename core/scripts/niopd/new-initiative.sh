#!/bin/bash

# A simple script to create a new initiative file.
# Usage: ./new-initiative.sh <file-slug> <"initiative-name"> <"file-content">

# --- Input Validation ---
if [ "$#" -ne 3 ]; then
    echo "Error: Invalid number of arguments."
    echo "Usage: $0 <file-slug> <\"initiative-name\"> <\"file-content\">"
    exit 1
fi

FILE_SLUG=$1
INITIATIVE_NAME=$2
FILE_CONTENT=$3

# Get current date in YYYYMMDD format
DATE=$(date +%Y%m%d)

# Convert initiative name to lowercase and replace spaces with hyphens for the filename
INITIATIVE_NAME_FORMATTED=$(echo "$INITIATIVE_NAME" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')

# Create filename with new naming convention
FILENAME="${DATE}-${INITIATIVE_NAME_FORMATTED}-initiative-v1.md"
FILE_PATH="niopd-workspace/initiatives/${FILENAME}"

# --- File Creation ---
echo "Creating initiative file at: ${FILE_PATH}"

# Write the content to the file. The -e flag allows for interpretation of backslash escapes.
echo -e "$FILE_CONTENT" > "$FILE_PATH"

# --- Verification and Confirmation ---
if [ -f "$FILE_PATH" ]; then
    echo "✅ Success: Initiative file created."
    echo "File location: ${FILE_PATH}"
    exit 0
else
    echo "❌ Error: Failed to create initiative file."
    exit 1
fi

#!/bin/bash

# A script to save a product checklist document.
# Usage: ./generate-checklist.sh <prd_slug> <checklist_type> <content>

# --- Input Validation ---
if [ "$#" -ne 3 ]; then
    echo "Error: Invalid number of arguments."
    echo "Usage: $0 <prd_slug> <checklist_type> <content>"
    exit 1
fi

PRD_SLUG=$1
CHECKLIST_TYPE=$2
CONTENT=$3

# Get current date in YYYYMMDD format
DATE=$(date +%Y%m%d)

# Convert slug to lowercase and replace spaces with hyphens
SLUG_FORMATTED=$(echo "$PRD_SLUG" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | cut -c1-30)

# Validate checklist type
if [ "$CHECKLIST_TYPE" != "launch" ] && [ "$CHECKLIST_TYPE" != "acceptance" ] && [ "$CHECKLIST_TYPE" != "qa" ]; then
    echo "Error: Invalid checklist type. Must be 'launch', 'acceptance', or 'qa'."
    exit 1
fi

# --- Directory Check ---
if [ ! -d "niopd-workspace/reports" ]; then
    echo "Creating reports directory..."
    mkdir -p "niopd-workspace/reports"
fi

# --- Check for existing file and increment version if needed ---
VERSION=1
while [ -f "niopd-workspace/reports/${DATE}-${SLUG_FORMATTED}-${CHECKLIST_TYPE}-checklist-v${VERSION}.md" ]; do
    VERSION=$((VERSION + 1))
done
FILENAME="${DATE}-${SLUG_FORMATTED}-${CHECKLIST_TYPE}-checklist-v${VERSION}.md"
FILE_PATH="niopd-workspace/reports/${FILENAME}"

# --- File Creation ---
echo "Saving checklist to: ${FILE_PATH}"

# Write the content to the file
echo -e "$CONTENT" > "$FILE_PATH"

# --- Verification and Confirmation ---
if [ -f "$FILE_PATH" ]; then
    echo "✅ Success: Checklist saved."
    echo "File location: ${FILE_PATH}"
    exit 0
else
    echo "❌ Error: Failed to save checklist."
    exit 1
fi

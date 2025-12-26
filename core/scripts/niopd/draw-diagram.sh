#!/bin/bash

# A script to save a diagram document.
# Usage: ./draw-diagram.sh <filename_slug> <diagram_type> <content>

# --- Input Validation ---
if [ "$#" -ne 3 ]; then
    echo "Error: Invalid number of arguments."
    echo "Usage: $0 <filename_slug> <diagram_type> <content>"
    exit 1
fi

FILENAME_SLUG=$1
DIAGRAM_TYPE=$2
CONTENT=$3

# Get current date in YYYYMMDD format
DATE=$(date +%Y%m%d)

# Convert slug to lowercase and replace spaces with hyphens
FILENAME_SLUG_FORMATTED=$(echo "$FILENAME_SLUG" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | cut -c1-30)

# Create filename with naming convention
FILENAME="${DATE}-${FILENAME_SLUG_FORMATTED}-${DIAGRAM_TYPE}-diagram-v1.md"
FILE_PATH="niopd-workspace/reports/${FILENAME}"

# --- Directory Check ---
if [ ! -d "niopd-workspace/reports" ]; then
    echo "Creating reports directory..."
    mkdir -p "niopd-workspace/reports"
fi

# --- Check for existing file and increment version if needed ---
VERSION=1
while [ -f "niopd-workspace/reports/${DATE}-${FILENAME_SLUG_FORMATTED}-${DIAGRAM_TYPE}-diagram-v${VERSION}.md" ]; do
    VERSION=$((VERSION + 1))
done
FILENAME="${DATE}-${FILENAME_SLUG_FORMATTED}-${DIAGRAM_TYPE}-diagram-v${VERSION}.md"
FILE_PATH="niopd-workspace/reports/${FILENAME}"

# --- File Creation ---
echo "Saving diagram to: ${FILE_PATH}"

# Write the content to the file
echo -e "$CONTENT" > "$FILE_PATH"

# --- Verification and Confirmation ---
if [ -f "$FILE_PATH" ]; then
    echo "✅ Success: Diagram saved."
    echo "File location: ${FILE_PATH}"
    exit 0
else
    echo "❌ Error: Failed to save diagram."
    exit 1
fi

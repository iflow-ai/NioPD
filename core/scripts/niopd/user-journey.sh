#!/bin/bash

# A script to save a user journey map document.
# Usage: ./user-journey.sh <initiative_slug> <content>

# --- Input Validation ---
if [ "$#" -ne 2 ]; then
    echo "Error: Invalid number of arguments."
    echo "Usage: $0 <initiative_slug> <content>"
    exit 1
fi

INITIATIVE_SLUG=$1
CONTENT=$2

# Get current date in YYYYMMDD format
DATE=$(date +%Y%m%d)

# Convert slug to lowercase and replace spaces with hyphens
SLUG_FORMATTED=$(echo "$INITIATIVE_SLUG" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | cut -c1-30)

# --- Directory Check ---
if [ ! -d "niopd-workspace/reports" ]; then
    echo "Creating reports directory..."
    mkdir -p "niopd-workspace/reports"
fi

# --- Check for existing file and increment version if needed ---
VERSION=1
while [ -f "niopd-workspace/reports/${DATE}-${SLUG_FORMATTED}-user-journey-v${VERSION}.md" ]; do
    VERSION=$((VERSION + 1))
done
FILENAME="${DATE}-${SLUG_FORMATTED}-user-journey-v${VERSION}.md"
FILE_PATH="niopd-workspace/reports/${FILENAME}"

# --- File Creation ---
echo "Saving user journey map to: ${FILE_PATH}"

# Write the content to the file
echo -e "$CONTENT" > "$FILE_PATH"

# --- Verification and Confirmation ---
if [ -f "$FILE_PATH" ]; then
    echo "✅ Success: User journey map saved."
    echo "File location: ${FILE_PATH}"
    exit 0
else
    echo "❌ Error: Failed to save user journey map."
    exit 1
fi

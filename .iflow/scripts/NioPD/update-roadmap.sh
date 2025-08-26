#!/bin/bash

# A script to save a product roadmap.
# Usage: ./update-roadmap.sh <roadmap_content>

# --- Input Validation ---
if [ "$#" -ne 1 ]; then
    echo "Error: Invalid number of arguments."
    echo "Usage: $0 <roadmap_content>"
    exit 1
fi

ROADMAP_CONTENT=$1
FILE_PATH=".iflow/data/roadmaps/product-roadmap.md"

# --- File Creation ---
echo "Saving product roadmap to: ${FILE_PATH}"

# Write the content to the file. The -e flag allows for interpretation of backslash escapes.
echo -e "$ROADMAP_CONTENT" > "$FILE_PATH"

# --- Verification and Confirmation ---
if [ -f "$FILE_PATH" ]; then
    echo "✅ Success: Product roadmap saved."
    echo "File location: ${FILE_PATH}"
    exit 0
else
    echo "❌ Error: Failed to save product roadmap."
    exit 1
fi
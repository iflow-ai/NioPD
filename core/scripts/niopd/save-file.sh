#!/bin/bash

# A generic script to save content to a file.
# Usage: ./save-file.sh <file_path> <file_content>

# --- Input Validation ---
if [ "$#" -ne 2 ]; then
    echo "Error: Invalid number of arguments."
    echo "Usage: $0 <file_path> <file_content>"
    exit 1
fi

FILE_PATH=$1
FILE_CONTENT=$2

# --- File Creation ---
echo "Saving content to: ${FILE_PATH}"

# Write the content to the file. The -e flag allows for interpretation of backslash escapes.
echo -e "$FILE_CONTENT" > "$FILE_PATH"

# --- Verification and Confirmation ---
if [ -f "$FILE_PATH" ]; then
    echo "✅ Success: File saved."
    exit 0
else
    echo "❌ Error: Failed to save file."
    exit 1
fi
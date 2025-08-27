#!/bin/bash

# A simple script to import a feedback file.
# Usage: ./import-feedback.sh <source_file_path> <destination_filename>

# --- Input Validation ---
if [ "$#" -ne 2 ]; then
    echo "Error: Invalid number of arguments."
    echo "Usage: $0 <source_file_path> <destination_filename>"
    exit 1
fi

SOURCE_FILE_PATH=$1
DESTINATION_FILENAME=$2
DESTINATION_PATH="niopd-workspace/feedback-sources/${DESTINATION_FILENAME}"

# --- File Copy ---
echo "Copying feedback file from: ${SOURCE_FILE_PATH}"
echo "To: ${DESTINATION_PATH}"

# Copy the file to the destination
cp "${SOURCE_FILE_PATH}" "${DESTINATION_PATH}"

# --- Verification and Confirmation ---
if [ -f "$DESTINATION_PATH" ]; then
    echo "✅ Success: Feedback file imported."
    exit 0
else
    echo "❌ Error: Failed to import feedback file."
    exit 1
fi
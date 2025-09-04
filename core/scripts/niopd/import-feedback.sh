#!/bin/bash

# A simple script to import a feedback file.
# Usage: ./import-feedback.sh <source_file_path> <initiative_name> <original_filename>

# --- Input Validation ---
if [ "$#" -ne 3 ]; then
    echo "Error: Invalid number of arguments."
    echo "Usage: $0 <source_file_path> <initiative_name> <original_filename>"
    exit 1
fi

SOURCE_FILE_PATH=$1
INITIATIVE_NAME=$2
ORIGINAL_FILENAME=$3

# Get current date in YYYYMMDD format
DATE=$(date +%Y%m%d)

# Get file extension from original filename
FILE_EXTENSION="${ORIGINAL_FILENAME##*.}"

# Convert initiative name to lowercase and replace spaces with hyphens for the filename
INITIATIVE_NAME_FORMATTED=$(echo "$INITIATIVE_NAME" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')

# Create filename with new naming convention
FILENAME="${DATE}-${INITIATIVE_NAME_FORMATTED}-feedback-source-v1.${FILE_EXTENSION}"
DESTINATION_PATH="niopd-workspace/sources/${FILENAME}"

# --- File Copy ---
echo "Copying feedback file from: ${SOURCE_FILE_PATH}"
echo "To: ${DESTINATION_PATH}"

# Copy the file to the destination
cp "${SOURCE_FILE_PATH}" "${DESTINATION_PATH}"

# --- Verification and Confirmation ---
if [ -f "$DESTINATION_PATH" ]; then
    echo "✅ Success: Feedback file imported."
    echo "File location: ${DESTINATION_PATH}"
    exit 0
else
    echo "❌ Error: Failed to import feedback file."
    exit 1
fi
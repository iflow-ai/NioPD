#!/bin/bash

# Script to initialize the NioPD system by creating the necessary directory structure.
# Usage: ./init.sh

# --- Input Validation ---
if [ "$#" -ne 0 ]; then
    echo "Error: This script does not accept any arguments."
    echo "Usage: $0"
    exit 1
fi

# --- Check for .claude directory ---
if [ ! -d "{{IDE_DIR}}" ]; then
    echo "❌ Error: {{IDE_DIR}} directory not found. This script must be run from the root of a project that contains the {{IDE_DIR}} directory."
    exit 1
fi

# --- Display initialization message ---
echo "🚀 Initializing NioPD System"
echo "============================"
echo ""

# --- Create directory structure ---
echo "📁 Creating directory structure..."

# Create data directories
mkdir -p niopd-workspace/initiatives
mkdir -p niopd-workspace/prds
mkdir -p niopd-workspace/reports
mkdir -p niopd-workspace/roadmaps
mkdir -p niopd-workspace/sources

echo "  ✅ Data directories created"

# --- Verification ---
echo ""
echo "🔍 Verifying directory structure..."

# Check if all directories were created successfully
DIRECTORIES="niopd-workspace/initiatives niopd-workspace/prds niopd-workspace/reports niopd-workspace/roadmaps niopd-workspace/sources"

for dir in $DIRECTORIES; do
    if [ ! -d "$dir" ]; then
        echo "❌ Error: Failed to create directory $dir"
        exit 1
    fi
done

echo "  ✅ All directories verified"

# --- Summary ---
echo ""
echo "✅ Initialization Complete!"
echo "=========================="
echo ""
echo "📊 Created directories:"
echo "  - niopd-workspace/initiatives/   - For product initiative files"
echo "  - niopd-workspace/prds/         - For Product Requirements Documents"
echo "  - niopd-workspace/reports/      - For analysis and summary reports"
echo "  - niopd-workspace/roadmaps/     - For product roadmaps"
echo "  - niopd-workspace/sources/      - For raw feedback data and other imported files"
echo ""
echo "🎯 Next Steps:"
echo "  1. Create your first initiative: /niopd:new-initiative \"My First Feature\""
echo ""
echo "📖 Documentation: README.md"

exit 0
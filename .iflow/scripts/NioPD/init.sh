#!/bin/bash

# Script to initialize the NioPD system by creating the necessary directory structure.
# Usage: ./init.sh

# --- Input Validation ---
if [ "$#" -ne 0 ]; then
    echo "Error: This script does not accept any arguments."
    echo "Usage: $0"
    exit 1
fi

# --- Check for .iflow directory ---
if [ ! -d ".iflow" ]; then
    echo "❌ Error: .iflow directory not found. This script must be run from the root of a project that contains the .iflow directory."
    exit 1
fi

# --- Display initialization message ---
echo "Initializing..."
echo ""
echo ""

echo " ███╗   ██╗██╗ ██████╗ ██████╗ ██████╗ "
echo " ████╗  ██║██║██╔════╝██╔═══██╗██╔══██╗"
echo " ██╔██╗ ██║██║██║     ██║   ██║██████╔╝"
echo " ██║╚██╗██║██║██║     ██║   ██║██╔═══╝ "
echo " ██║ ╚████║██║╚██████╗╚██████╔╝██║     "
echo " ╚═╝  ╚═══╝╚═╝ ╚═════╝ ╚═════╝ ╚═╝     "
echo ""
echo "┌──────────────────────────────────────┐"
echo "│         NioPD Initialization         │"
echo "└──────────────────────────────────────┘"
echo ""
echo ""

echo "🚀 Initializing NioPD System"
echo "============================"
echo ""

# --- Create directory structure ---
echo "📁 Creating directory structure..."

# Create data directories
mkdir -p .iflow/data/initiatives
mkdir -p .iflow/data/prds
mkdir -p .iflow/data/reports
mkdir -p .iflow/data/roadmaps
mkdir -p .iflow/data/feedback-sources

echo "  ✅ Data directories created"

# --- Verification ---
echo ""
echo "🔍 Verifying directory structure..."

# Check if all directories were created successfully
DIRECTORIES=".iflow/data/initiatives .iflow/data/prds .iflow/data/reports .iflow/data/roadmaps .iflow/data/feedback-sources"

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
echo "  - .iflow/data/initiatives/   - For product initiative files"
echo "  - .iflow/data/prds/         - For Product Requirements Documents"
echo "  - .iflow/data/reports/      - For analysis and summary reports"
echo "  - .iflow/data/roadmaps/     - For product roadmaps"
echo "  - .iflow/data/feedback-sources/ - For raw feedback files"
echo ""
echo "🎯 Next Steps:"
echo "  1. Create your first initiative: /niopd:new-initiative \"My First Feature\""
echo ""
echo "📖 Documentation: README.md"

exit 0
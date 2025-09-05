#!/bin/bash

# A script to display help information about the NioPD system.
# Usage: ./help.sh

# --- Input Validation ---
if [ "$#" -ne 0 ]; then
    echo "Error: This script does not accept any arguments."
    echo "Usage: $0"
    exit 1
fi

# --- Display Help Information ---
echo "Helping..."
echo ""
echo ""

echo "📚 NioPD - Product Management Toolkit"
echo "====================================="
echo ""
echo "🎯 Quick Start Workflow"
echo "  1. /niopd:new-initiative <name>        - Create a new product initiative"
echo "  2. /niopd:summarize-feedback --from=<file> --for=<initiative> - Analyze feedback"
echo "  3. /niopd:draft-prd --for=<initiative> - Generate a PRD draft"
echo "  4. /niopd:update-roadmap              - Update the product roadmap"
echo ""
echo "📄 Core Workflow Commands"
echo "  /niopd:new-initiative \"<name>\"     - Start a new high-level product initiative"
echo "  /niopd:summarize-feedback --from=<file> --for=<initiative> - Use an AI agent to analyze a feedback file"
echo "  /niopd:draft-prd --for=<initiative> - Automatically generate a PRD draft"
echo "  /niopd:update-roadmap              - Generate or update the product roadmap"
echo ""
echo "🔍 Advanced Discovery Commands"
echo "  /niopd:analyze-competitor --url=<url> - Analyzes a competitor's website"
echo "  /niopd:summarize-interview --file=<path> - Summarizes a user interview transcript"
echo "  /niopd:analyze-data --file=<path> --query=\"...\" - Answers a natural language question about a data file"
echo "  /niopd:generate-personas --from=<summary> - Creates user personas from a feedback summary"
echo "  /niopd:research-trends --topic=\"...\" - Researches and summarizes market trends on a topic"
echo ""
echo "🚀 Advanced Planning Commands"
echo "  /niopd:write-stories --for=<prd_name> - Generate detailed user stories and acceptance criteria"
echo "  /niopd:generate-faq --for=<prd_name> - Generate a comprehensive FAQ document"
echo ""
echo "🚀 Advanced Execution Commands"
echo "  /niopd:generate-update --for=<initiative> - Create a concise stakeholder update report"
echo "  /niopd:track-kpis --for=<initiative> - Get a status report on an initiative's KPIs"
echo ""
echo "⚙️  System Commands"
echo "  /niopd:init               - Initialize the NioPD system"
echo "  /niopd:help               - Show this help message"
echo ""
echo "💡 Tips"
echo "  • Use /niopd:new-initiative to start a new product initiative"
echo "  • Analyze user feedback with /niopd:summarize-feedback (place feedback files in niopd-workspace/sources/)"
echo "  • Generate PRDs automatically with /niopd:draft-prd"
echo "  • Keep your roadmap up-to-date with /niopd:update-roadmap"
echo "  • View README.md for complete documentation"

exit 0
# NioPD: Product Management Toolkit for Claude Code

NioPD is a collection of **Claude Code Workflows**, designed specifically to streamline the product management lifecycle. As an AI-powered system, it helps Product Managers turn raw ideas, messy feedback, and complex data into structured, actionable plans, freeing them up to focus on strategy and users.

---

## Table of Contents

- [The Challenge for PMs](#the-challenge-for-pms)
- [The NioPD Workflow](#the-niopd-workflow)
- [What Makes NioPD Different?](#what-makes-niopd-different)
- [Get Started Now](#get-started-now)
- [System Architecture](#system-architecture)
- [Command Reference](#command-reference)
- [Example Flow](#example-flow)

---

## The Challenge for PMs

Product Managers today are drowning in data and administrative work:
- **Unstructured Feedback:** Juggling notes from Slack, Intercom, surveys, and user interviews.
- **Constant Research:** Manually tracking competitors, market trends, and data insights.
- **Endless Documentation:** Constantly writing and updating PRDs, roadmaps, and stakeholder reports.

NioPD is designed to automate this "work about work" so you can focus on what matters.

## The NioPD Workflow

NioPD guides you through a structured, repeatable process to take ideas from concept to a well-defined and launched feature.

```
graph TD
    A[1. Discovery & Research] --> B[2. Planning & Definition]
    B --> C[3. Reporting & Launch Prep]
```

## What Makes NioPD Different?

| Traditional PM Tooling | NioPD |
|------------------------|----------------------|
| Manual data synthesis | **AI-powered feedback & data analysis** |
| Manual market research | **Automated competitor & trend reports** |
| Writing docs from scratch | **Automated PRD & report drafting** |
| Static, hard-to-update roadmaps | **Dynamic roadmaps from your plans** |

## Get Started Now

1.  **Clone this repository into your project**:
    First, navigate to your project directory, then clone the NioPD repository and copy its `.claude` directory to your project root:
    ```bash
    cd path/to/your/project/
    git clone https://github.com/8421bit/NioPD.git
    cd NioPD

    # core 
    cp -r .claude ./

    # env
    source ~/.bashrc

    # start cli
    iflow
    claude
    ```

2.  **Initialize the NioPD system**:
    The core of the NioPD system is contained within the `.claude` directory in your project root. You can interact with the system by issuing `/niopd:` commands to a compatible AI agent (like me).
    
    To initialize the NioPD system and generate the necessary directories, run:
    ```
    /niopd:init
    ```

3.  **Start your first initiative**:
    ```
    /niopd:new-initiative "My First Feature"
    ```

## System Architecture

NioPD is a self-contained system. The user-facing documentation lives in the `NioPD/` directory, while the core system logic lives inside `NioPD/.claude/`.

```
NioPD/
├── README.md          # This file
├── AGENTS.md          # Guide for how NioPD's AI agents work
├── COMMANDS.md        # Complete command reference
├── .claude/            # Core system implementation
│   ├── agents/        # Definitions for specialized PM agents (10 agents)
│   ├── commands/      # Definitions for all /niopd: commands (16 commands)
│   │   └── NioPD/     # Namespace for NioPD commands
│   ├── scripts/       # Helper scripts for automation
│   │   └── NioPD/     # Namespace for NioPD scripts
│   └── templates/     # Reusable templates for PRDs, reports, etc.
└── niopd-workspace/   # Your product data lives here (created when needed)
    ├── initiatives/   # Product initiative files
    ├── prds/         # Product Requirements Documents
    ├── reports/      # Analysis and summary reports
    ├── roadmaps/     # Product roadmaps
    └── feedback-sources/ # Raw feedback files
```

### Helper Scripts

#### `init.sh`
A bash script located at `.claude/scripts/NioPD/init.sh` that initializes the NioPD system by creating the necessary directory structure. This script is used internally by the `/niopd:init` command.

**Usage:**
```bash
./init.sh
```

**Purpose:**
- Creates the required data directories in `niopd-workspace/`
- Sets up the directory structure for initiatives, PRDs, reports, roadmaps, and feedback sources
- Provides visual feedback during initialization
- Verifies that all directories were created successfully

#### `new-initiative.sh`
A bash script located at `.claude/scripts/NioPD/new-initiative.sh` that provides a command-line interface for creating new initiative files. This script is used internally by the `/niopd:new-initiative` command.

**Usage:**
```bash
./new-initiative.sh <file-slug> "<file-content>"
```

**Purpose:**
- Validates input parameters
- Creates initiative files in the `niopd-workspace/initiatives/` directory
- Provides success/error feedback
- Supports content with special characters through proper escaping

#### `import-feedback.sh`
A bash script located at `.claude/scripts/NioPD/import-feedback.sh` that provides a command-line interface for importing feedback files. This script is used internally by the `/niopd:import-feedback` command.

**Usage:**
```bash
./import-feedback.sh <source_file_path> <destination_filename>
```

**Purpose:**
- Validates input parameters
- Copies feedback files to the `niopd-workspace/feedback-sources/` directory
- Provides success/error feedback

#### `analyze-competitor.sh`
A bash script located at `.claude/scripts/NioPD/analyze-competitor.sh` that saves competitor analysis reports. This script is used internally by the `/niopd:analyze-competitor` command.

**Usage:**
```bash
./analyze-competitor.sh <domain_name> "<report_content>"
```

**Purpose:**
- Validates input parameters
- Saves competitor analysis reports to the `niopd-workspace/reports/` directory
- Provides success/error feedback

#### `analyze-data.sh`
A bash script located at `.claude/scripts/NioPD/analyze-data.sh` that saves data analysis reports. This script is used internally by the `/niopd:analyze-data` command.

**Usage:**
```bash
./analyze-data.sh <original_filename> "<report_content>"
```

**Purpose:**
- Validates input parameters
- Saves data analysis reports to the `niopd-workspace/reports/` directory
- Provides success/error feedback

#### `draft-prd.sh`
A bash script located at `.claude/scripts/NioPD/draft-prd.sh` that saves PRD drafts. This script is used internally by the `/niopd:draft-prd` command.

**Usage:**
```bash
./draft-prd.sh <initiative_slug> "<prd_content>"
```

**Purpose:**
- Validates input parameters
- Saves PRD drafts to the `niopd-workspace/prds/` directory
- Provides success/error feedback

#### `generate-personas.sh`
A bash script located at `.claude/scripts/NioPD/generate-personas.sh` that saves user personas documents. This script is used internally by the `/niopd:generate-personas` command.

**Usage:**
```bash
./generate-personas.sh <initiative_name> "<personas_content>"
```

**Purpose:**
- Validates input parameters
- Saves user personas documents to the `niopd-workspace/reports/` directory
- Provides success/error feedback

#### `generate-update.sh`
A bash script located at `.claude/scripts/NioPD/generate-update.sh` that saves stakeholder update reports. This script is used internally by the `/niopd:generate-update` command.

**Usage:**
```bash
./generate-update.sh <initiative_slug> "<update_content>"
```

**Purpose:**
- Validates input parameters
- Saves stakeholder update reports to the `niopd-workspace/reports/` directory
- Provides success/error feedback

#### `research-trends.sh`
A bash script located at `.claude/scripts/NioPD/research-trends.sh` that saves market trend reports. This script is used internally by the `/niopd:research-trends` command.

**Usage:**
```bash
./research-trends.sh <topic_slug> "<report_content>"
```

**Purpose:**
- Validates input parameters
- Saves market trend reports to the `niopd-workspace/reports/` directory
- Provides success/error feedback

#### `summarize-feedback.sh`
A bash script located at `.claude/scripts/NioPD/summarize-feedback.sh` that saves feedback summary reports. This script is used internally by the `/niopd:summarize-feedback` command.

**Usage:**
```bash
./summarize-feedback.sh <feedback_filename> "<report_content>"
```

**Purpose:**
- Validates input parameters
- Saves feedback summary reports to the `niopd-workspace/reports/` directory
- Provides success/error feedback

#### `summarize-interview.sh`
A bash script located at `.claude/scripts/NioPD/summarize-interview.sh` that saves interview summary reports. This script is used internally by the `/niopd:summarize-interview` command.

**Usage:**
```bash
./summarize-interview.sh <original_filename> "<report_content>"
```

**Purpose:**
- Validates input parameters
- Saves interview summary reports to the `niopd-workspace/reports/` directory
- Provides success/error feedback

#### `track-kpis.sh`
A bash script located at `.claude/scripts/NioPD/track-kpis.sh` that saves KPI status reports. This script is used internally by the `/niopd:track-kpis` command.

**Usage:**
```bash
./track-kpis.sh <initiative_slug> "<report_content>"
```

**Purpose:**
- Validates input parameters
- Saves KPI status reports to the `niopd-workspace/reports/` directory
- Provides success/error feedback

#### `update-roadmap.sh`
A bash script located at `.claude/scripts/NioPD/update-roadmap.sh` that saves product roadmaps. This script is used internally by the `/niopd:update-roadmap` command.

**Usage:**
```bash
./update-roadmap.sh "<roadmap_content>"
```

**Purpose:**
- Validates input parameters
- Saves product roadmaps to the `niopd-workspace/roadmaps/` directory
- Provides success/error feedback

#### `save-file.sh`
A generic bash script located at `.claude/scripts/NioPD/save-file.sh` that can save any content to a specified file path.

**Usage:**
```bash
./save-file.sh <file_path> "<file_content>"
```

**Purpose:**
- Validates input parameters
- Saves content to the specified file path
- Provides success/error feedback
- Can be used by any command that needs to save files

#### `help.sh`
A bash script located at `.claude/scripts/NioPD/help.sh` that displays help information about the NioPD system. This script is used internally by the `/niopd:help` command.

**Usage:**
```bash
./help.sh
```

**Purpose:**
- Displays help information about the NioPD system and its commands
- Provides a quick reference for users to understand available commands

## How NioPD Works: The 5-Part Command Pattern

NioPD operates on a structured, file-based pattern that combines user commands with detailed instructions for the AI. Understanding this pattern is key to using and extending the system.

A complete command or feature in NioPD is composed of up to five parts, all located within the `.claude` directory:

### **1. The User Command**
This is the entry point, which the user types to initiate a workflow.
- **Example:** `/niopd:new-initiative "My New Feature"`
- **Format:** `/niopd:<command_name> [arguments]`

### **2. The Command Prompt (.md)**
This is the brain of the operation. For every command, there is a corresponding markdown file that acts as a detailed prompt for the AI.
- **Location:** `.claude/commands/NioPD/<command_name>.md`
- **Purpose:** It tells the AI how to validate inputs, what questions to ask the user, when to use other components (like agents or scripts), and what to do with the results.
- **Example:** `.claude/commands/NioPD/new-initiative.md` contains the complete workflow for creating new initiatives.

### **3. The Agent (.md) (Optional)**
For complex tasks involving analysis or synthesis, the command prompt will invoke a specialized agent. Agents are also defined by markdown prompts that give them a specific role and process to follow.
- **Location:** `.claude/agents/<agent_name>.md`
- **Purpose:** To handle "heavy lifting" like summarizing a long document or analyzing data, keeping the main command logic clean.
- **Example:** The `/niopd:hi` command invokes the main `Nio` agent.
- **Available Agents:** 10 specialized agents including the main `Nio` supervisor, `feedback-synthesizer`, `competitor-analyzer`, `market-researcher`, etc.

### **4. The Template (.md) (Optional)**
If a command's final output is a structured document (like a PRD or an initiative), it will use a template.
- **Location:** `.claude/templates/<template_name>.md`
- **Purpose:** To ensure consistent structure for all generated documents.
- **Examples:** `initiative-template.md`, `prd-template.md`, `competitor-analysis-template.md`

### **5. The Script (.sh) (Optional)**
For commands that need to perform actions on the file system, the command prompt will call a shell script. This separates the AI's "thinking" from the system's "doing".
- **Location:** `.claude/scripts/NioPD/<script_name>.sh`
- **Purpose:** To handle file I/O and other system-level tasks.
- **Example:** The `/niopd:new-initiative` command prompt calls the `new-initiative.sh` script to save the final document.

**Important:** Each command corresponds to a `.md` file in the commands directory, and some commands may have a corresponding `.sh` script in the scripts directory for system-level operations.

### Command Development Workflow

To add a new command to NioPD:

1. **Define the Command:** Create a new `.md` file in `.claude/commands/NioPD/`
2. **Create Supporting Agent (if needed):** Add agent definition in `.claude/agents/`
3. **Design Template (if needed):** Add document template in `.claude/templates/`
4. **Write Helper Script (if needed):** Add automation script in `.claude/scripts/NioPD/`
5. **Update Documentation:** Add the command to [`COMMANDS.md`](COMMANDS.md) and [`AGENTS.md`](AGENTS.md)

This modular approach ensures that each component has a single responsibility and can be easily maintained, tested, and extended.

**Note:** When adding new commands, follow the pattern where each command has a corresponding `.md` file in the commands directory, and if system-level operations are needed, create a corresponding `.sh` script in the scripts directory.

### Adding New Commands

When extending NioPD with new commands, follow these guidelines:

1. **Command Structure:** Each command follows the 5-part pattern described above
2. **Naming Convention:** Use descriptive names with hyphens to separate words (e.g., `new-initiative`)
3. **Documentation:** Every command must be documented in both the command file and COMMANDS.md
4. **Error Handling:** Implement proper error handling in both the command prompt and helper scripts
5. **User Experience:** Design commands to be intuitive and provide clear feedback to users

**File Storage Directory Rules:**
When creating new commands that generate files, follow these directory structure rules:

- **Initiatives:** Store initiative files in `niopd-workspace/initiatives/` (e.g., `niopd-workspace/initiatives/my-feature.md`)
- **PRDs:** Store Product Requirements Documents in `niopd-workspace/prds/` (e.g., `niopd-workspace/prds/prd-my-feature.md`)
- **Reports:** Store analysis and summary reports in `niopd-workspace/reports/` (e.g., `niopd-workspace/reports/competitor-analysis-my-feature.md`)
- **Roadmaps:** Store product roadmaps in `niopd-workspace/roadmaps/` (e.g., `niopd-workspace/roadmaps/product-roadmap.md`)
- **Feedback Sources:** Store raw feedback files in `niopd-workspace/feedback-sources/` (e.g., `niopd-workspace/feedback-sources/user-feedback.txt`)

All file creation operations should be handled by corresponding shell scripts located in `.claude/scripts/NioPD/`. Each script should:
1. Validate input parameters
2. Construct the appropriate file path based on the content type
3. Create the file with the provided content
4. Verify the file was created successfully
5. Provide clear success/error feedback

**Note:** Before adding new commands, consider whether existing functionality can be extended instead.

**Example of add a new command:**
```
Add New Commands: `/niopd:draft-prd "Feature Name"`, This command automatically generates a Product Requirements Document (PRD) for the specified feature based on historical data and existing initiatives.
```

```
Add New Commands: `/niopd:help`, This command displays help information about the NioPD system, primarily focusing on the command set.
```

## Command Reference

### Core Workflow ✅ *Fully Implemented*
- `/niopd:hi`: Start an interactive session with Nio, your product supervisor.
- `/niopd:new-initiative "<name>"`: Start a new high-level product initiative.
- `/niopd:import-feedback --from=<path> --for=<initiative>`: Import a file of user feedback.
- `/niopd:summarize-feedback --from=<file> --for=<initiative>`: Use an AI agent to analyze a feedback file.
- `/niopd:draft-prd --for=<initiative>`: Automatically generate a PRD draft.
- `/niopd:edit-prd <prd_name>`: Get instructions to manually edit a PRD.
- `/niopd:update-roadmap`: Generate or update the product roadmap.
- `/niopd:help`: Display help information about the NioPD system and its commands.

### Advanced: Strategy & Discovery ✅ *Fully Implemented*
- `/niopd:analyze-competitor --url=<url>`: Analyzes a competitor's website.
- `/niopd:summarize-interview --file=<path>`: Summarizes a user interview transcript.
- `/niopd:analyze-data --file=<path> --query="..."`: Answers a natural language question about a data file.
- `/niopd:generate-personas --from=<summary>`: Creates user personas from a feedback summary.
- `/niopd:research-trends --topic="..."`: Researches and summarizes market trends on a topic.

### Advanced: Execution & Launch ✅ *Partially Implemented*
- `/niopd:generate-update --for=<initiative>`: Create a concise stakeholder update report.
- `/niopd:track-kpis --for=<initiative>`: Get a status report on an initiative's KPIs.

### Planned Features 🚧 *Coming Soon*
The following commands are planned for future releases:

#### Planning & Definition
- `/niopd:draw-diagram --type=<type> --desc="..."`: Creates a PlantUML or Mermaid diagram from a description.
- `/niopd:assess-feasibility --for=<prd>`: Flags technically complex requirements in a PRD.
- `/niopd:write-stories --for=<prd>`: Writes detailed user stories and acceptance criteria for a PRD.
- `/niopd:identify-risks --for=<prd>`: Identifies potential risks for an initiative.

#### Advanced Launch Features
- `/niopd:draft-release-notes --for=<prd>`: Generates draft release notes for a feature.
- `/niopd:generate-faq --for=<prd>`: Creates a list of FAQs for a new feature.
- `/niopd:simplify-update --for=<initiative> --audience=...`: Tailors a stakeholder update for a specific audience.
- `/niopd:brainstorm-names --desc="..."`: Brainstorms names for a new feature.

*For a complete command reference, see [COMMANDS.md](COMMANDS.md)*

## Example Flow

Here's how you might use NioPD to research and plan a new feature using the currently available commands:

1.  **Start a conversation with your supervisor:**
    `/niopd:hi` (Use this interactive session to discuss the feature, clarify goals, and get guidance).

2.  **Research the market:**
    `/niopd:research-trends --topic="AI-powered data analysis tools"`

3.  **Analyze a competitor:**
    `/niopd:analyze-competitor --url="https://www.competitor.com"`

4.  **Define the initiative:**
    `/niopd:new-initiative "Intelligent Analysis Feature"`

5.  **Import and analyze user feedback:**
    `/niopd:import-feedback --from="user-feedback.txt" --for="Intelligent Analysis Feature"`
    `/niopd:summarize-feedback --from="user-feedback.txt" --for="Intelligent Analysis Feature"`

6.  **Generate user personas:**
    `/niopd:generate-personas --from="feedback-summary-report.md"`

7.  **Draft the PRD automatically:**
    `/niopd:draft-prd --for="Intelligent Analysis Feature"`

8.  **Update the product roadmap:**
    `/niopd:update-roadmap`

9.  **Track progress:**
    `/niopd:track-kpis --for="Intelligent Analysis Feature"`

*Note: Features like diagram creation and risk assessment are planned for future releases.*

---
This README provides a comprehensive overview for any Product Manager looking to use the NioPD system.

## Acknowledgments

NioPD was inspired by the innovative work done in the [Claude Code PM](https://github.com/automazeio/ccpm) project. We extend our gratitude to the creators and contributors of that project for their pioneering approach to AI-powered product management workflows.

While NioPD has evolved in its own direction with unique features and capabilities, the foundational concepts and vision from Claude Code PM have been instrumental in shaping this system.

# NioPD Scripts Directory

This directory contains all the helper scripts used by the NioPD system. Scripts are organized in the NioPD subdirectory to provide namespace isolation.

## Script Structure

Each script should follow these conventions:

1. **File Naming**: Use descriptive names with `.sh` extension for shell scripts
2. **Location**: Place scripts in the [NioPD](NioPD/) subdirectory
3. **Permissions**: Ensure scripts are executable (`chmod +x script-name.sh`)
4. **Documentation**: Include comments explaining what the script does

## Available Scripts

All NioPD scripts are located in the [NioPD](NioPD/) subdirectory:

### [analyze-competitor.sh](NioPD/analyze-competitor.sh)
Saves competitor analysis reports.

**Usage:**
```bash
./analyze-competitor.sh <domain_name> "<report_content>"
```

**Purpose:**
- Saves competitor analysis reports to the `niopd-workspace/reports/` directory

### [analyze-data.sh](NioPD/analyze-data.sh)
Saves data analysis reports.

**Usage:**
```bash
./analyze-data.sh <original_filename> "<report_content>"
```

**Purpose:**
- Saves data analysis reports to the `niopd-workspace/reports/` directory

### [draft-prd.sh](NioPD/draft-prd.sh)
Saves PRD drafts.

**Usage:**
```bash
./draft-prd.sh <initiative_slug> "<prd_content>"
```

**Purpose:**
- Saves PRD drafts to the `niopd-workspace/prds/` directory

### [generate-personas.sh](NioPD/generate-personas.sh)
Saves user personas documents.

**Usage:**
```bash
./generate-personas.sh <initiative_name> "<personas_content>"
```

**Purpose:**
- Saves user personas documents to the `niopd-workspace/reports/` directory

### [generate-update.sh](NioPD/generate-update.sh)
Saves stakeholder update reports.

**Usage:**
```bash
./generate-update.sh <initiative_slug> "<update_content>"
```

**Purpose:**
- Saves stakeholder update reports to the `niopd-workspace/reports/` directory

### [import-feedback.sh](NioPD/import-feedback.sh)
Imports feedback files.

**Usage:**
```bash
./import-feedback.sh <source_file_path> <destination_filename>
```

**Purpose:**
- Copies feedback files to the `niopd-workspace/feedback-sources/` directory

### [new-initiative.sh](NioPD/new-initiative.sh)
Creates new initiative files.

**Usage:**
```bash
./new-initiative.sh <file-slug> "<file-content>"
```

**Purpose:**
- Creates initiative files in the `niopd-workspace/initiatives/` directory

### [research-trends.sh](NioPD/research-trends.sh)
Saves market trend reports.

**Usage:**
```bash
./research-trends.sh <topic_slug> "<report_content>"
```

**Purpose:**
- Saves market trend reports to the `niopd-workspace/reports/` directory

### [save-file.sh](NioPD/save-file.sh)
Generic script to save any content to a specified file path.

**Usage:**
```bash
./save-file.sh <file_path> "<file_content>"
```

**Purpose:**
- Saves content to the specified file path

### [summarize-feedback.sh](NioPD/summarize-feedback.sh)
Saves feedback summary reports.

**Usage:**
```bash
./summarize-feedback.sh <feedback_filename> "<report_content>"
```

**Purpose:**
- Saves feedback summary reports to the `niopd-workspace/reports/` directory

### [summarize-interview.sh](NioPD/summarize-interview.sh)
Saves interview summary reports.

**Usage:**
```bash
./summarize-interview.sh <original_filename> "<report_content>"
```

**Purpose:**
- Saves interview summary reports to the `niopd-workspace/reports/` directory

### [track-kpis.sh](NioPD/track-kpis.sh)
Saves KPI status reports.

**Usage:**
```bash
./track-kpis.sh <initiative_slug> "<report_content>"
```

**Purpose:**
- Saves KPI status reports to the `niopd-workspace/reports/` directory

### [update-roadmap.sh](NioPD/update-roadmap.sh)
Saves product roadmaps.

**Usage:**
```bash
./update-roadmap.sh "<roadmap_content>"
```

**Purpose:**
- Saves product roadmaps to the `niopd-workspace/roadmaps/` directory

### [help.sh](NioPD/help.sh)
Displays help information about the NioPD system.

**Usage:**
```bash
./help.sh
```

**Purpose:**
- Displays help information about the NioPD system and its commands

## Creating New Scripts

To create a new script:

1. Create a new file in the [NioPD](NioPD/) subdirectory
2. Use the naming convention `[script-name].sh`
3. Make the script executable: `chmod +x script-name.sh`
4. Include proper error handling and validation
5. Add documentation comments
6. Update this README with information about the new script

## Best Practices

1. **Error Handling**: Always include error handling and provide meaningful error messages
2. **Input Validation**: Validate all input parameters before processing
3. **Documentation**: Include comments explaining the purpose and usage of the script
4. **Permissions**: Ensure scripts have the correct permissions to execute
5. **Security**: Avoid hardcoding sensitive information in scripts
6. **Portability**: Write scripts that are portable across different systems
7. **Logging**: Include logging for debugging and audit purposes
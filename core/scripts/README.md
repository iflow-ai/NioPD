# NioPD Scripts Directory

This directory contains all the helper scripts used by the NioPD system. Scripts are organized in the NioPD subdirectory to provide namespace isolation.

## Script Structure

Each script should follow these conventions:

1. **File Naming**: Use descriptive names with `.sh` extension for shell scripts
2. **Location**: Place scripts in the [NioPD](niopd/) subdirectory
3. **Permissions**: Ensure scripts are executable (`chmod +x script-name.sh`)
4. **Documentation**: Include comments explaining what the script does

## Available Scripts

All NioPD scripts are located in the [NioPD](niopd/) subdirectory:

| Script Name | Location | Usage | Purpose |
|-------------|----------|-------|---------|
| [init.sh](niopd/init.sh) | `{{SCRIPTS_DIR}}/init.sh` | `./init.sh` | Initializes the NioPD system by creating the necessary directory structure in `niopd-workspace/` |
| [new-initiative.sh](niopd/new-initiative.sh) | `{{SCRIPTS_DIR}}/new-initiative.sh` | `./new-initiative.sh <file-slug> "<file-content>"` | Creates new initiative files in the `niopd-workspace/initiatives/` directory |
| [analyze-competitor.sh](niopd/analyze-competitor.sh) | `{{SCRIPTS_DIR}}/analyze-competitor.sh` | `./analyze-competitor.sh <domain_name> "<report_content>"` | Saves competitor analysis reports to the `niopd-workspace/reports/` directory |
| [analyze-data.sh](niopd/analyze-data.sh) | `{{SCRIPTS_DIR}}/analyze-data.sh` | `./analyze-data.sh <original_filename> "<report_content>"` | Saves data analysis reports to the `niopd-workspace/reports/` directory |
| [draft-prd.sh](niopd/draft-prd.sh) | `{{SCRIPTS_DIR}}/draft-prd.sh` | `./draft-prd.sh <initiative_slug> "<prd_content>"` | Saves PRD drafts to the `niopd-workspace/prds/` directory |
| [generate-personas.sh](niopd/generate-personas.sh) | `{{SCRIPTS_DIR}}/generate-personas.sh` | `./generate-personas.sh <initiative_name> "<personas_content>"` | Saves user personas documents to the `niopd-workspace/reports/` directory |
| [generate-update.sh](niopd/generate-update.sh) | `{{SCRIPTS_DIR}}/generate-update.sh` | `./generate-update.sh <initiative_slug> "<update_content>"` | Saves stakeholder update reports to the `niopd-workspace/reports/` directory |
| [research-trends.sh](niopd/research-trends.sh) | `{{SCRIPTS_DIR}}/research-trends.sh` | `./research-trends.sh <topic_slug> "<report_content>"` | Saves market trend reports to the `niopd-workspace/reports/` directory |
| [summarize-feedback.sh](niopd/summarize-feedback.sh) | `{{SCRIPTS_DIR}}/summarize-feedback.sh` | `./summarize-feedback.sh <feedback_filename> "<report_content>"` | Saves feedback summary reports to the `niopd-workspace/reports/` directory |
| [summarize-interview.sh](niopd/summarize-interview.sh) | `{{SCRIPTS_DIR}}/summarize-interview.sh` | `./summarize-interview.sh <original_filename> "<report_content>"` | Saves interview summary reports to the `niopd-workspace/reports/` directory |
| [track-kpis.sh](niopd/track-kpis.sh) | `{{SCRIPTS_DIR}}/track-kpis.sh` | `./track-kpis.sh <initiative_slug> "<report_content>"` | Saves KPI status reports to the `niopd-workspace/reports/` directory |
| [update-roadmap.sh](niopd/update-roadmap.sh) | `{{SCRIPTS_DIR}}/update-roadmap.sh` | `./update-roadmap.sh "<roadmap_content>"` | Saves product roadmaps to the `niopd-workspace/roadmaps/` directory |
| [save-file.sh](niopd/save-file.sh) | `{{SCRIPTS_DIR}}/save-file.sh` | `./save-file.sh <file_path> "<file_content>"` | Generic script to save any content to a specified file path |
| [help.sh](niopd/help.sh) | `{{SCRIPTS_DIR}}/help.sh` | `./help.sh` | Displays help information about the NioPD system and its commands |
| [write-stories.sh](niopd/write-stories.sh) | `{{SCRIPTS_DIR}}/write-stories.sh` | `./write-stories.sh <initiative_slug> "<stories_content>"` | Saves user stories and acceptance criteria to the `niopd-workspace/reports/` directory |
| [generate-faq.sh](niopd/generate-faq.sh) | `{{SCRIPTS_DIR}}/generate-faq.sh` | `./generate-faq.sh <initiative_slug> "<faq_content>"` | Saves FAQ documents to the `niopd-workspace/reports/` directory |

## Creating New Scripts

To create a new script:

1. Create a new file in the [NioPD](niopd/) subdirectory
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
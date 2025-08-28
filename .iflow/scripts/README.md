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

| Script Name | Location | Usage | Purpose |
|-------------|----------|-------|---------|
| [init.sh](NioPD/init.sh) | `.iflow/scripts/NioPD/init.sh` | `./init.sh` | Initializes the NioPD system by creating the necessary directory structure in `niopd-workspace/` |
| [new-initiative.sh](NioPD/new-initiative.sh) | `.iflow/scripts/NioPD/new-initiative.sh` | `./new-initiative.sh <file-slug> "<file-content>"` | Creates new initiative files in the `niopd-workspace/initiatives/` directory |
| [import-feedback.sh](NioPD/import-feedback.sh) | `.iflow/scripts/NioPD/import-feedback.sh` | `./import-feedback.sh <source_file_path> <destination_filename>` | Copies files to the `niopd-workspace/sources/` directory |
| [analyze-competitor.sh](NioPD/analyze-competitor.sh) | `.iflow/scripts/NioPD/analyze-competitor.sh` | `./analyze-competitor.sh <domain_name> "<report_content>"` | Saves competitor analysis reports to the `niopd-workspace/reports/` directory |
| [analyze-data.sh](NioPD/analyze-data.sh) | `.iflow/scripts/NioPD/analyze-data.sh` | `./analyze-data.sh <original_filename> "<report_content>"` | Saves data analysis reports to the `niopd-workspace/reports/` directory |
| [draft-prd.sh](NioPD/draft-prd.sh) | `.iflow/scripts/NioPD/draft-prd.sh` | `./draft-prd.sh <initiative_slug> "<prd_content>"` | Saves PRD drafts to the `niopd-workspace/prds/` directory |
| [generate-personas.sh](NioPD/generate-personas.sh) | `.iflow/scripts/NioPD/generate-personas.sh` | `./generate-personas.sh <initiative_name> "<personas_content>"` | Saves user personas documents to the `niopd-workspace/reports/` directory |
| [generate-update.sh](NioPD/generate-update.sh) | `.iflow/scripts/NioPD/generate-update.sh` | `./generate-update.sh <initiative_slug> "<update_content>"` | Saves stakeholder update reports to the `niopd-workspace/reports/` directory |
| [research-trends.sh](NioPD/research-trends.sh) | `.iflow/scripts/NioPD/research-trends.sh` | `./research-trends.sh <topic_slug> "<report_content>"` | Saves market trend reports to the `niopd-workspace/reports/` directory |
| [summarize-feedback.sh](NioPD/summarize-feedback.sh) | `.iflow/scripts/NioPD/summarize-feedback.sh` | `./summarize-feedback.sh <feedback_filename> "<report_content>"` | Saves feedback summary reports to the `niopd-workspace/reports/` directory |
| [summarize-interview.sh](NioPD/summarize-interview.sh) | `.iflow/scripts/NioPD/summarize-interview.sh` | `./summarize-interview.sh <original_filename> "<report_content>"` | Saves interview summary reports to the `niopd-workspace/reports/` directory |
| [track-kpis.sh](NioPD/track-kpis.sh) | `.iflow/scripts/NioPD/track-kpis.sh` | `./track-kpis.sh <initiative_slug> "<report_content>"` | Saves KPI status reports to the `niopd-workspace/reports/` directory |
| [update-roadmap.sh](NioPD/update-roadmap.sh) | `.iflow/scripts/NioPD/update-roadmap.sh` | `./update-roadmap.sh "<roadmap_content>"` | Saves product roadmaps to the `niopd-workspace/roadmaps/` directory |
| [save-file.sh](NioPD/save-file.sh) | `.iflow/scripts/NioPD/save-file.sh` | `./save-file.sh <file_path> "<file_content>"` | Generic script to save any content to a specified file path |
| [help.sh](NioPD/help.sh) | `.iflow/scripts/NioPD/help.sh` | `./help.sh` | Displays help information about the NioPD system and its commands |

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
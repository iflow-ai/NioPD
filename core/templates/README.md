# NioPD Templates Directory

This directory contains all the document templates used by the NioPD system to generate structured reports and documents.

## Template Structure

Each template follows a consistent structure:

```
---
name: template-name
description: Brief description of the template
---

# {{document_title}}

## Overview
Brief overview of the document's purpose and contents.

## [Section Name]
{{section_content}}

## [Another Section]
{{another_section_content}}

...
```

## Available Templates

### Core Product Management Templates

#### 1. Initiative Template ([initiative-template.md](initiative-template.md))
**Purpose:** Creates structured product initiative documents
**Used by:** `/niopd:new-initiative` command
**Key Features:**
- Strategic goals and problem statements
- Scope definition and KPI tracking
- Timeline and milestone management
- Risk and dependency tracking

#### 2. PRD Template ([prd-template.md](prd-template.md))
**Purpose:** Generates comprehensive Product Requirements Documents
**Used by:** `/niopd:draft-prd` command
**Key Features:**
- User personas and stories
- Functional and non-functional requirements
- Technical considerations and implementation plan
- Risk assessment and rollout planning

#### 3. Daily Feature Iteration PRD Template ([prd-daily-template.md](prd-daily-template.md))
**Purpose:** Documents daily feature iteration requirements for existing products
**Used by:** `/niopd:draft-prd` command (for daily iterations)
**Key Features:**
- Focused scope for daily feature updates
- Streamlined user stories and requirements format
- Technical considerations for iterative development
- Success metrics and KPI tracking
- Timeline and milestone management for short iterations

### Analysis & Research Templates

#### 4. Competitor Analysis Template ([competitor-analysis-template.md](competitor-analysis-template.md))
**Purpose:** Structured competitive analysis reports
**Used by:** `competitor-analyzer` agent
**Key Features:**
- Value proposition and feature analysis
- Pricing model evaluation
- Competitive strengths and weaknesses
- Strategic recommendations

#### 5. Market Research Template ([market-research-template.md](market-research-template.md))
**Purpose:** Comprehensive market trend analysis
**Used by:** `market-researcher` agent
**Key Features:**
- Market size and growth analysis
- Competitive landscape overview
- Technology and innovation trends
- Strategic implications and recommendations

#### 6. Feedback Summary Template ([feedback-summary-template.md](feedback-summary-template.md))
**Purpose:** User feedback synthesis and analysis
**Used by:** `feedback-synthesizer` agent
**Key Features:**
- Pain point and feature request categorization
- Sentiment analysis and user behavior patterns
- Actionable insights and recommendations
- Supporting quotes and data quality assessment

#### 7. Data Analysis Template ([data-analysis-template.md](data-analysis-template.md))
**Purpose:** Structured data analysis reports
**Used by:** `data-analyst` agent
**Key Features:**
- Dataset documentation and quality assessment
- Detailed analysis methodology
- Statistical findings and visualizations
- Business implications and recommendations

### User Research Templates

#### 8. Interview Summary Template ([interview-summary-template.md](interview-summary-template.md))
**Purpose:** User interview analysis and insights
**Used by:** `interview-summarizer` agent
**Key Features:**
- Participant profiling and key insights
- Pain points and user needs documentation
- Feature reactions and behavioral observations
- Actionable recommendations for product development

#### 9. User Persona Template ([persona-template.md](persona-template.md))
**Purpose:** Detailed user persona documentation
**Used by:** `persona-generator` agent
**Key Features:**
- Comprehensive demographic and professional profiles
- Goals, motivations, and pain points
- Behavior patterns and technology adoption
- Product implications and design principles

### Project Management Templates

#### 10. Project Update Template ([project-update-template.md](project-update-template.md))
**Purpose:** Stakeholder project status reports
**Used by:** `presentation-builder` agent
**Key Features:**
- Progress highlights and metrics tracking
- Challenge and risk assessment
- Timeline and milestone management
- Stakeholder communication planning

#### 11. KPI Report Template ([kpi-report-template.md](kpi-report-template.md))
**Purpose:** Key Performance Indicator tracking reports
**Used by:** `kpi-tracker` agent
**Key Features:**
- Performance dashboard with status indicators
- Trend analysis and forecasting
- Action items and next steps
- Risk assessment and recommendations

### Agent Development Template

#### 12. Agent Template ([agent-template.md](agent-template.md))
**Purpose:** Standard template for creating new AI agents
**Used by:** Agent developers creating new specialized agents
**Key Features:**
- Standardized structure for agent definitions
- Detailed sections for role, input, process, and output
- Error handling guidelines
- Consistent formatting for integration with the NioPD system

#### 13. User Story Template ([user-story-template.md](user-story-template.md))
**Purpose:** Standard template for creating user stories and acceptance criteria
**Used by:** `story-writer` agent
**Key Features:**
- Standardized structure for user stories
- Acceptance criteria with Given/When/Then format
- Edge case and alternative flow documentation
- Persona-based organization

#### 14. FAQ Template ([faq-template.md](faq-template.md))
**Purpose:** Standard template for creating FAQ documents
**Used by:** `faq-generator` agent
**Key Features:**
- Categorized question organization
- Clear, concise answer format
- Additional resources section
- Table of contents for easy navigation

## Template Usage Guidelines

### Variable Format
All templates use the `{{variable_name}}` format for placeholders. This ensures consistency across the system and makes templates easy to process programmatically.

### Template Structure
Each template follows a consistent structure:
- **Front Matter:** YAML metadata with key information
- **Title Section:** Clear document title and purpose
- **Content Sections:** Organized by logical groupings
- **Appendix:** Supporting information and references

### Best Practices

1. **Consistency:** Use the same variable naming conventions across related templates
2. **Completeness:** Include all necessary sections for comprehensive documentation
3. **Flexibility:** Provide optional sections that can be included or omitted as needed
4. **Clarity:** Use clear section headings and descriptive placeholder text

### Adding New Templates

When adding new templates:
1. Follow the existing naming convention (`purpose-template.md`)
2. Use consistent variable formatting (`{{variable_name}}`)
3. Include comprehensive front matter metadata
4. Document the template purpose and usage in this README
5. Ensure compatibility with existing system commands and agents

## Template Maintenance

- **Review Schedule:** Templates should be reviewed quarterly for accuracy and completeness
- **Version Control:** All template changes should be tracked in git
- **Testing:** New templates should be tested with their corresponding agents/commands
- **Documentation:** Update this README when adding or modifying templates

---
*Templates last updated: {{current_date}}*
*Maintained by: NioPD System*
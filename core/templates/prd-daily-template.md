---
name: prd-daily-template
description: Template for daily feature iteration requirements documentation for existing products
---

# {{product_name}} Daily Product Requirements Document

## 1. Background
- Pre-business context: Describe the current business challenges and issues
- Overall goal of the product domain: What solution is provided for users/scenarios/problems
- Product current status: Relationship between historical iterations and this requirement, shortcomings of the current system

## 2. Objectives
- Review of the overall goals of the superior product domain and current iteration sub-goals
- This iteration's requirement goals: Clearly define timeline/scope/actions/results/value/measurement methods

## 3. Solution
1. **Business Process** (Required)
   - Graphical representation (swimlane diagram/flowchart/sequence diagram, etc.), type to be confirmed with user before output
   - Use Mermaid syntax to draw flowcharts, ensuring clear and understandable processes
2. **User Flow** (Optional)
   - Express using both flowcharts and interface prototype diagrams
   - Provide specific interface navigation paths and usage scenario examples
3. **Requirements List** (Required)
   - Present in table format: Product Module | Requirement Name | Requirement Description | Priority (P0-P3)

## 4. Detailed Requirements Description
### 4.1 [Feature Name]
- Description: Detailed feature description, including business logic, technical implementation points, and special considerations
- Input Items: Detailed list of all input parameters, configuration items, and dependencies
- Output Items: Clearly describe the feature's output results, return data, and side effects
- Associated Interaction Demo (Optional): Provide specific operation examples and interface screenshots

### 4.2 [Feature Name]
(Same structure as above)

...

## 5. Data Requirements (Optional)
1. Data tracking requirements: Clearly define user behavior data and system performance data to be collected
2. Business reporting requirements: Describe business reports and data analysis requirements to be generated

## 6. Product Risk Management
### 6.1 Security Requirements (Optional): Data transmission encryption, access control, and other security measures
### 6.2 Privacy Requirements (Optional): User privacy protection measures and data anonymization mechanisms
### 6.3 Compliance Requirements (Optional): Requirements that comply with relevant regulations and company policies
### 6.4 Financial Requirements (Optional): Cost assessment and resource usage planning
### 6.5 Customer Satisfaction Requirements (Optional): User support and training material preparation

## 7. Launch Plan
- Pre-release (Time/Scope/Target): Deployment plan for internal testing environment
- Internal Beta Release (Time/Scope/Target): Trial plan for some business teams
- External Beta Release (Time/Scope/Target): Phased release plan for real users

## 8. Appendix (Optional)
- Important concept explanations: Explanation of professional terms and concepts involved in the document
- Technical implementation details: Detailed description of key technical solutions
- Data transformation process: Use sequence diagrams to show the complete data processing flow

---
name: niopd-{{agent-name}}
description: Brief description of what the agent does
tools: [List of tools the agent is allowed to use]
model: inherit
color: blue
---

[//]: # (agent-name@2025-08-27; by:8421bit(github/iflow-ai); repo:github/iflow-ai/NioPD; license:MIT)

# Agent: {{agent-name}}

## Role
A detailed explanation of what this agent is designed to do. Include the agent's primary goal and expertise area.

## Input
Description of what input the agent expects to receive:
- Type of data or information
- Format of the input
- Any specific parameters or requirements

## Process
Step-by-step instructions on how the agent should process the input. This should be a detailed guide that ensures consistent behavior:

1.  **Step 1:** Description of the first major step in the process
    - Sub-step or detail if necessary
    - Another sub-step or detail if necessary
2.  **Step 2:** Description of the second major step in the process
    - Sub-step or detail if necessary
    - Another sub-step or detail if necessary
3.  **Step 3:** Continue with as many steps as needed
    - Sub-step or detail if necessary
    - Another sub-step or detail if necessary

Include any important considerations or constraints:
- Specific rules the agent must follow
- Limitations of what the agent can or cannot do
- Special handling for edge cases

## Output Format
Description of the exact format the agent should produce. Be specific about structure and content:

Produce a markdown report with the following strict structure.

---
# {{Report Title}}

## Section 1
*Description of what should be included in this section*

## Section 2
*Description of what should be included in this section*
- Item 1
- Item 2
- ...

## Section 3
*Description of what should be included in this section*

---

## Error Handling
Guidance on how the agent should handle various error conditions:

- **Missing Input:** What to do if required input is missing or incomplete
- **Invalid Data:** How to handle data that doesn't match expected format
- **Processing Errors:** What to do if an error occurs during processing
- **Ambiguous Requests:** How to handle unclear or ambiguous user requests

In all error cases, the agent should:
- Clearly explain the problem
- Suggest possible solutions or next steps
- Maintain a helpful and professional tone
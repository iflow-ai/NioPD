const fs = require('fs-extra');
const path = require('path');
const { TemplateProcessor } = require('../lib/template-processor');

describe('TemplateProcessor', () => {
  let processor;
  let tempDir;

  beforeEach(async () => {
    processor = new TemplateProcessor();
    tempDir = path.join(__dirname, 'temp-test');
    await fs.ensureDir(tempDir);
  });

  afterEach(async () => {
    await fs.remove(tempDir);
  });

  test('should replace {{IDE_DIR}} with .claude for claude IDE', () => {
    processor.setIdeType('claude');
    const content = 'if [ ! -d "{{IDE_DIR}}" ]; then';
    const result = processor.processTemplate(content);
    expect(result).toBe('if [ ! -d ".claude" ]; then');
  });

  test('should replace {{IDE_DIR}} with .iflow for iflow IDE', () => {
    processor.setIdeType('iflow');
    const content = 'if [ ! -d "{{IDE_DIR}}" ]; then';
    const result = processor.processTemplate(content);
    expect(result).toBe('if [ ! -d ".iflow" ]; then');
  });

  test('should process init.sh.template correctly', async () => {
    const templatePath = path.join(__dirname, '..', 'core', 'scripts', 'niopd', 'init.sh.template');
    const content = await fs.readFile(templatePath, 'utf8');
    
    // Test for claude
    processor.setIdeType('claude');
    const claudeResult = processor.processTemplate(content);
    expect(claudeResult).toContain('if [ ! -d ".claude" ]; then');
    expect(claudeResult).toContain('.claude directory not found');
    
    // Test for iflow
    processor.setIdeType('iflow');
    const iflowResult = processor.processTemplate(content);
    expect(iflowResult).toContain('if [ ! -d ".iflow" ]; then');
    expect(iflowResult).toContain('.iflow directory not found');
  });

  test('should validate template variables', () => {
    const content = 'if [ ! -d "{{IDE_DIR}}" ]; then';
    const validation = processor.validateTemplateVariables(content);
    expect(validation.isValid).toBe(true);
    expect(validation.missingVariables).toEqual([]);
  });
});
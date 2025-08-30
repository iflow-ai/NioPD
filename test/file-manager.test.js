const { FileManager } = require('../lib/file-manager');
const path = require('path');
const fs = require('fs-extra');

describe('FileManager', () => {
  let fileManager;
  const testDir = path.join(__dirname, 'temp');

  beforeEach(async () => {
    await fs.ensureDir(testDir);
    fileManager = new FileManager(process.cwd(), testDir);
  });

  afterEach(async () => {
    await fs.remove(testDir);
  });

  test('should be defined', () => {
    expect(FileManager).toBeDefined();
  });

  test('should create instance', () => {
    expect(fileManager).toBeInstanceOf(FileManager);
  });

  test('should have correct properties', () => {
    expect(fileManager.sourceDir).toBe(process.cwd());
    expect(fileManager.targetDir).toBe(testDir);
  });
});
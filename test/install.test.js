const { interactiveInstall } = require('../lib/install');

describe('Install Module', () => {
  test('should be defined', () => {
    expect(interactiveInstall).toBeDefined();
  });

  test('should be a function', () => {
    expect(typeof interactiveInstall).toBe('function');
  });
});
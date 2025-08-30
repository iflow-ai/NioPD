const { UI } = require('../lib/ui');
const { Validator } = require('../lib/validator');

describe('Basic Modules', () => {
  test('UI should be defined', () => {
    expect(UI).toBeDefined();
  });

  test('Validator should be defined', () => {
    expect(Validator).toBeDefined();
  });
});
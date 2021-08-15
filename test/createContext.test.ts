import { LightContext, } from './helpers_test';

it('shoulds create the context', () => {
  expect(LightContext).toBeDefined();
  expect(LightContext.Provider).toBeDefined();
  expect(LightContext.Consumer).toBeDefined();
  expect(LightContext.displayName).toBeUndefined();
});


import { act, renderHook } from '@testing-library/react-hooks/dom';
import React, { FC } from 'react';
import { useContext } from '../src/hooks';
import { MachineProvider } from '../src/Provider';
import { LightContext } from './helpers_test';

describe('MachineProvider', () => {
  const wrapper: FC = ({ children }) => (
    <MachineProvider Context={LightContext}>{children}</MachineProvider>
  );

  const hook = () =>
    renderHook(() => useContext(LightContext), { wrapper });

  it('should be defined', () => {
    const { result } = hook();
    expect(result.current).toBeDefined();
  });

  it('should send event one', () => {
    const { result } = hook();
    act(() => {
      result.current.send('TIMER');
    });
    expect(result.current.state.matches('green')).toBeTruthy();
  });

  it('should send events multiple times', () => {
    const { result } = hook();

    act(() => {
      result.current.send('TIMER');
      result.current.send('TIMER');
      result.current.send('TIMER');
    });

    // #region Expectations
    expect(result.current.state.matches({ red: 'walk' })).toBeTruthy();
    expect(result.current.state.matches({ red: 'stop' })).toBeFalsy();
    // #endregion
  });
});

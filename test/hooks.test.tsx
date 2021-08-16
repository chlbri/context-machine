import { act, renderHook } from '@testing-library/react-hooks/dom';
import React, { FC } from 'react';
import {
  useContext,
  usePrepare
} from '../src/hooks';
import { LightContext, lightMachine } from './helpers_test';

describe('HOOK: usePrepareMachineContext', () => {
  const hook = () => renderHook(() => usePrepare(lightMachine));
  it('should prepare the Provider', () => {
    const { result } = hook();
    expect(result.current.state.matches('idle')).toBeTruthy();
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
    expect(result.current.state.matches({ red: 'walk' })).toBeTruthy();
    expect(result.current.state.matches({ red: 'stop' })).toBeFalsy();
  });
});

describe('HOOK: useContextMachine', () => {
  const wrapper: FC = ({ children }) => {
    const value = usePrepare(lightMachine);
    return <LightContext.Provider {...{ value }}>{children}</LightContext.Provider>;
  };

  const hook = () => renderHook(() => useContext(LightContext), { wrapper });

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

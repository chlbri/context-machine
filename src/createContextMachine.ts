/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { UseMachineOptions } from '@xstate/react/lib/types';
import { createContext } from 'react';
import {
  EventObject,
  interpret, InterpreterOptions,
  MachineOptions,
  StateMachine,
  Typestate
} from 'xstate';

export function createContextMachine<
  TContext,
  TEvent extends EventObject,
  TTypestate extends Typestate<TContext> = {
    value: any;
    context: TContext;
  }
>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  machine: StateMachine<TContext, any, TEvent, TTypestate>,
  options?: Partial<InterpreterOptions> &
    Partial<UseMachineOptions<TContext, TEvent>> &
    Partial<MachineOptions<TContext, TEvent>>
) {
  return createContext(interpret(machine, options));
}

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { UseMachineOptions } from '@xstate/react/lib/types';
import { createContext } from 'react';
import {
  createMachine,
  EventObject,
  interpret,
  InterpreterOptions,
  MachineConfig,
  MachineOptions,
  Typestate,
} from 'xstate';
import { Model } from 'xstate/lib/model.types';

export function createContextMachine<
  TC,
  TE extends EventObject,
  TT extends Typestate<TC> = {
    value: any;
    context: TC;
  }
>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  config: TC extends Model<any, any, any> ? never : MachineConfig<TC, any, TE>,
  options?: Partial<InterpreterOptions> &
    Partial<UseMachineOptions<TC, TE>> &
    Partial<MachineOptions<TC, TE>>
) {
  const machine = createMachine<TC, TE, TT>(config, options);
  const service = interpret(machine);
  return createContext(service);
}

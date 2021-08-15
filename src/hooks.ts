/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useActor, useInterpret } from '@xstate/react';
import { MaybeLazy, UseMachineOptions } from '@xstate/react/lib/types';
import omit from 'lodash/omit';
import { useContext } from 'react';
import {
  EventObject,
  InterpreterOptions,
  MachineOptions,
  StateMachine,
  Typestate,
} from 'xstate';
import { ContextMachineType, MachineType } from './types';

export function usePrepareContextMachine<
  TContext,
  TEvent extends EventObject,
  TTypestate extends Typestate<TContext> = {
    value: any;
    context: TContext;
  }
>(
  machine: MaybeLazy<StateMachine<TContext, any, TEvent, TTypestate>>,
  options?: Partial<InterpreterOptions> &
    Partial<UseMachineOptions<TContext, TEvent>> &
    Partial<MachineOptions<TContext, TEvent>>
) {
  return useInterpret(machine, options);
}

export function useContextMachineService<
  TContext,
  TEvent extends EventObject,
  TTypestate extends Typestate<TContext> = {
    value: any;
    context: TContext;
  }
>(
  Context: ContextMachineType<TContext, TEvent, TTypestate>
): MachineType<TContext, TEvent, TTypestate>['service'] {
  const _service = useContext(Context);

  const service = omit(_service, 'state', 'sender', 'send');
  return service;
}

export function useContextMachineSender<
  TContext,
  TEvent extends EventObject,
  TTypestate extends Typestate<TContext> = {
    value: any;
    context: TContext;
  }
>(
  Context: ContextMachineType<TContext, TEvent, TTypestate>
): MachineType<TContext, TEvent, TTypestate>['send'] {
  const service = useContext(Context);

  return service.send;
}

export function useContextMachineState<
  TContext,
  TEvent extends EventObject,
  TTypestate extends Typestate<TContext> = {
    value: any;
    context: TContext;
  }
>(
  Context: ContextMachineType<TContext, TEvent, TTypestate>
): MachineType<TContext, TEvent, TTypestate>['state'] {
  const service = useContext(Context);

  const [state] = useActor(service);
  return state;
}

export function useContextMachine<
  TContext,
  TEvent extends EventObject,
  TTypestate extends Typestate<TContext> = {
    value: any;
    context: TContext;
  }
>(
  Context: ContextMachineType<TContext, TEvent, TTypestate>
): MachineType<TContext, TEvent, TTypestate> {
  const out = {
    state: useContextMachineState(Context),
    send: useContextMachineSender(Context),
    service: useContextMachineService(Context),
  };

  return out;
}

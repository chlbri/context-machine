/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  useActor,
  useInterpret,
  useSelector as useSelectorR,
} from '@xstate/react';
import { MaybeLazy, UseMachineOptions } from '@xstate/react/lib/types';
import omit from 'lodash/omit';
import { useContext as useContextR } from 'react';
import {
  EventObject,
  InterpreterOptions,
  MachineOptions,
  StateMachine,
  Typestate,
} from 'xstate';
import { ContextMachineType, MachineType, Selector } from './types';

export function usePrepare<
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

export function useState<
  TContext,
  TEvent extends EventObject,
  TTypestate extends Typestate<TContext> = {
    value: any;
    context: TContext;
  }
>(
  Context: ContextMachineType<TContext, TEvent, TTypestate>
): MachineType<TContext, TEvent, TTypestate>['state'] {
  const service = useContextR(Context);

  const [state] = useActor(service);
  return state;
}

export function useSelector<
  TContext,
  TEvent extends EventObject,
  TTypestate extends Typestate<TContext> = {
    value: any;
    context: TContext;
  },
  R = any
>(
  Context: ContextMachineType<TContext, TEvent, TTypestate>,
  selector: Selector<TContext, TEvent, TTypestate, R>
): R {
  const service = useContextR(Context);

  const _out = useSelectorR(service, selector);
  return _out;
}

export function useSend<
  TContext,
  TEvent extends EventObject,
  TTypestate extends Typestate<TContext> = {
    value: any;
    context: TContext;
  }
>(
  Context: ContextMachineType<TContext, TEvent, TTypestate>
): MachineType<TContext, TEvent, TTypestate>['send'] {
  const service = useContextR(Context);

  return service.send;
}

export function useCustomService<
  TContext,
  TEvent extends EventObject,
  TTypestate extends Typestate<TContext> = {
    value: any;
    context: TContext;
  }
>(
  Context: ContextMachineType<TContext, TEvent, TTypestate>
): MachineType<TContext, TEvent, TTypestate>['custom_service'] {
  const _service = useContextR(Context);

  const service = omit(_service, 'state', 'sender', 'send');
  return service;
}

export function useContext<
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
    state: useState(Context),
    send: useSend(Context),
    custom_service: useCustomService(Context),
  };

  return out;
}

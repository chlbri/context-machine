import { UseMachineOptions } from '@xstate/react/lib/types';
import React, { PropsWithChildren, useContext } from 'react';
import {
  EventObject,
  InterpreterOptions,
  MachineOptions,
  Typestate,
} from 'xstate';
import { usePrepare } from './hooks';
import { ContextMachineType } from './types';

type Props<
  TContext,
  TEvent extends EventObject,
  TTypestate extends Typestate<TContext> = {
    value: any;
    context: TContext;
  }
> = {
  Context: ContextMachineType<TContext, TEvent, TTypestate>;
  options?: Partial<InterpreterOptions> &
    Partial<UseMachineOptions<TContext, TEvent>> &
    Partial<MachineOptions<TContext, TEvent>>;
};

export function MachineProvider<
  TContext,
  TEvent extends EventObject,
  TTypestate extends Typestate<TContext> = {
    value: any;
    context: TContext;
  }
>({
  Context,
  children,
  options,
}: PropsWithChildren<Props<TContext, TEvent, TTypestate>>): JSX.Element {
  const service = useContext(Context);
  const value = usePrepare(service.machine, options);

  return <Context.Provider {...{ value }}>{children}</Context.Provider>;
}

import { MaybeLazy } from '@xstate/react/lib/types';
import { Context } from 'react';
import {
  EventObject,
  Typestate,
  State,
  Interpreter,
  StateMachine,
} from 'xstate';

export type MachineType<
  TContext,
  TEvent extends EventObject,
  TTypestate extends Typestate<TContext> = {
    value: any;
    context: TContext;
  }
> = {
  state: State<TContext, TEvent, any, TTypestate>;
  send: Interpreter<TContext, any, TEvent, TTypestate>['send'];
  service: Omit<
    Interpreter<TContext, any, TEvent, TTypestate>,
    'send' | 'sender' | 'state'
  >;
};

export type ContextMachineType<
  TContext,
  TEvent extends EventObject,
  TTypestate extends Typestate<TContext> = {
    value: any;
    context: TContext;
  }
> = Context<Interpreter<TContext, any, TEvent, TTypestate>>;


export type GetContext<T> = T extends MaybeLazy<
  StateMachine<infer TC, any, any>
>
  ? TC
  : never;

export type GetEvent<T> = T extends MaybeLazy<StateMachine<any, any, infer TE>>
  ? TE
  : never;

export type GetTypeState<T> = T extends MaybeLazy<
  StateMachine<any, any, any, infer TT>
>
  ? TT
  : never;

import { MaybeLazy } from '@xstate/react/lib/types';
import { Context } from 'react';
import { EventObject, Typestate, State, Interpreter, StateMachine } from 'xstate';
export declare type CustomService<TContext, TEvent extends EventObject, TTypestate extends Typestate<TContext> = {
    value: any;
    context: TContext;
}> = Pick<Interpreter<TContext, any, TEvent, TTypestate>, 'getSnapshot' | 'id' | 'initialState' | 'off' | 'onChange' | 'onDone' | 'onEvent' | 'onSend' | 'onStop' | 'status' | 'stop' | 'subscribe' | 'sessionId' | 'toJSON'>;
export declare type MachineType<TContext, TEvent extends EventObject, TTypestate extends Typestate<TContext> = {
    value: any;
    context: TContext;
}> = {
    state: State<TContext, TEvent, any, TTypestate>;
    send: Interpreter<TContext, any, TEvent, TTypestate>['send'];
    custom_service: CustomService<TContext, TEvent, TTypestate>;
};
export declare type Selector<TContext, TEvent extends EventObject, TTypestate extends Typestate<TContext> = {
    value: any;
    context: TContext;
}, R = any> = (state: State<TContext, TEvent, any, TTypestate>) => R;
export declare type ContextMachineType<TContext, TEvent extends EventObject, TTypestate extends Typestate<TContext> = {
    value: any;
    context: TContext;
}> = Context<Interpreter<TContext, any, TEvent, TTypestate>>;
export declare type GetContext<T> = T extends MaybeLazy<StateMachine<infer TC, any, any>> ? TC : never;
export declare type GetEvent<T> = T extends MaybeLazy<StateMachine<any, any, infer TE>> ? TE : never;
export declare type GetTypeState<T> = T extends MaybeLazy<StateMachine<any, any, any, infer TT>> ? TT : never;

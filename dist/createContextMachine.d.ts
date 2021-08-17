/// <reference types="react" />
import { UseMachineOptions } from '@xstate/react/lib/types';
import { EventObject, InterpreterOptions, MachineOptions, StateMachine, Typestate } from 'xstate';
export declare function createContextMachine<TContext, TEvent extends EventObject, TTypestate extends Typestate<TContext> = {
    value: any;
    context: TContext;
}>(machine: StateMachine<TContext, any, TEvent, TTypestate>, options?: Partial<InterpreterOptions> & Partial<UseMachineOptions<TContext, TEvent>> & Partial<MachineOptions<TContext, TEvent>>): import("react").Context<import("xstate").Interpreter<TContext, any, TEvent, TTypestate>>;

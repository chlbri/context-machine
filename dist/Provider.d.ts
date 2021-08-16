import { UseMachineOptions } from '@xstate/react/lib/types';
import { PropsWithChildren } from 'react';
import { EventObject, InterpreterOptions, MachineOptions, Typestate } from 'xstate';
import { ContextMachineType } from './types';
declare type Props<TContext, TEvent extends EventObject, TTypestate extends Typestate<TContext> = {
    value: any;
    context: TContext;
}> = {
    Context: ContextMachineType<TContext, TEvent, TTypestate>;
    options?: Partial<InterpreterOptions> & Partial<UseMachineOptions<TContext, TEvent>> & Partial<MachineOptions<TContext, TEvent>>;
};
export declare function MachineProvider<TContext, TEvent extends EventObject, TTypestate extends Typestate<TContext> = {
    value: any;
    context: TContext;
}>({ Context, children, options, }: PropsWithChildren<Props<TContext, TEvent, TTypestate>>): JSX.Element;
export {};

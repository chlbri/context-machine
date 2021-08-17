import { MaybeLazy, UseMachineOptions } from '@xstate/react/lib/types';
import { EventObject, InterpreterOptions, MachineOptions, StateMachine, Typestate } from 'xstate';
import { ContextMachineType, MachineType, Selector } from './types';
export declare function usePrepare<TContext, TEvent extends EventObject, TTypestate extends Typestate<TContext> = {
    value: any;
    context: TContext;
}>(machine: MaybeLazy<StateMachine<TContext, any, TEvent, TTypestate>>, options?: Partial<InterpreterOptions> & Partial<UseMachineOptions<TContext, TEvent>> & Partial<MachineOptions<TContext, TEvent>>): import("xstate").Interpreter<TContext, any, TEvent, TTypestate>;
export declare function useState<TContext, TEvent extends EventObject, TTypestate extends Typestate<TContext> = {
    value: any;
    context: TContext;
}>(Context: ContextMachineType<TContext, TEvent, TTypestate>): MachineType<TContext, TEvent, TTypestate>['state'];
export declare function useSelector<TContext, TEvent extends EventObject, TTypestate extends Typestate<TContext> = {
    value: any;
    context: TContext;
}, R = any>(Context: ContextMachineType<TContext, TEvent, TTypestate>, selector: Selector<TContext, TEvent, TTypestate, R>): R;
export declare function useSend<TContext, TEvent extends EventObject, TTypestate extends Typestate<TContext> = {
    value: any;
    context: TContext;
}>(Context: ContextMachineType<TContext, TEvent, TTypestate>): MachineType<TContext, TEvent, TTypestate>['send'];
export declare function useCustomService<TContext, TEvent extends EventObject, TTypestate extends Typestate<TContext> = {
    value: any;
    context: TContext;
}>(Context: ContextMachineType<TContext, TEvent, TTypestate>): MachineType<TContext, TEvent, TTypestate>['custom_service'];
export declare function useContext<TContext, TEvent extends EventObject, TTypestate extends Typestate<TContext> = {
    value: any;
    context: TContext;
}>(Context: ContextMachineType<TContext, TEvent, TTypestate>): MachineType<TContext, TEvent, TTypestate>;

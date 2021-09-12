/// <reference types="react" />
import { UseMachineOptions } from '@xstate/react/lib/types';
import { EventObject, InterpreterOptions, MachineConfig, MachineOptions, Typestate } from 'xstate';
import { Model } from 'xstate/lib/model.types';
export declare function createContextMachine<TC, TE extends EventObject, TT extends Typestate<TC> = {
    value: any;
    context: TC;
}>(config: TC extends Model<any, any, any> ? never : MachineConfig<TC, any, TE>, options?: Partial<InterpreterOptions> & Partial<UseMachineOptions<TC, TE>> & Partial<MachineOptions<TC, TE>>): import("react").Context<import("xstate").Interpreter<TC, any, TE, TT>>;

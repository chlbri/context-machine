import React, { createContext, useContext as useContext$1 } from 'react';
import { createMachine, interpret } from 'xstate';
import { useInterpret, useActor, useSelector as useSelector$1 } from '@xstate/react';

function createContextMachine( // eslint-disable-next-line @typescript-eslint/no-unused-vars
config, options) {
  var machine = createMachine(config, options);
  var service = interpret(machine);
  return createContext(service);
}

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
function usePrepare(machine, options) {
  return useInterpret(machine, options);
}
function useState(Context) {
  var service = useContext$1(Context);

  var _useActor = useActor(service),
      state = _useActor[0];

  return state;
}
function useSelector(Context, selector) {
  var service = useContext$1(Context);

  var _out = useSelector$1(service, selector);

  return _out;
}
function useSend(Context) {
  var service = useContext$1(Context);
  return service.send;
}
function useCustomService(Context) {
  var _useContextR = useContext$1(Context),
      getSnapshot = _useContextR.getSnapshot,
      id = _useContextR.id,
      initialState = _useContextR.initialState,
      off = _useContextR.off,
      onChange = _useContextR.onChange,
      onDone = _useContextR.onDone,
      onEvent = _useContextR.onEvent,
      onSend = _useContextR.onSend,
      onStop = _useContextR.onStop,
      status = _useContextR.status,
      stop = _useContextR.stop,
      subscribe = _useContextR.subscribe,
      sessionId = _useContextR.sessionId,
      toJSON = _useContextR.toJSON;

  return {
    getSnapshot: getSnapshot,
    id: id,
    initialState: initialState,
    off: off,
    onChange: onChange,
    onDone: onDone,
    onEvent: onEvent,
    onSend: onSend,
    onStop: onStop,
    status: status,
    stop: stop,
    subscribe: subscribe,
    sessionId: sessionId,
    toJSON: toJSON
  };
}
function useContext(Context) {
  var out = {
    state: useState(Context),
    send: useSend(Context),
    custom_service: useCustomService(Context)
  };
  return out;
}

function MachineProvider(_ref) {
  var Context = _ref.Context,
      children = _ref.children,
      options = _ref.options;
  var service = useContext$1(Context);
  var value = usePrepare(service.machine, options);
  return React.createElement(Context.Provider, Object.assign({}, {
    value: value
  }), children);
}

export { MachineProvider, createContextMachine, useContext, useCustomService, usePrepare, useSelector, useSend, useState };
//# sourceMappingURL=context-machine.esm.js.map

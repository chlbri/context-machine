'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var xstate = require('xstate');
var react = require('@xstate/react');

function createContextMachine( // eslint-disable-next-line @typescript-eslint/no-unused-vars
machine, options) {
  return React.createContext(xstate.interpret(machine, options));
}

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
function usePrepare(machine, options) {
  return react.useInterpret(machine, options);
}
function useState(Context) {
  var service = React.useContext(Context);

  var _useActor = react.useActor(service),
      state = _useActor[0];

  return state;
}
function useSelector(Context, selector) {
  var service = React.useContext(Context);

  var _out = react.useSelector(service, selector);

  return _out;
}
function useSend(Context) {
  var service = React.useContext(Context);
  return service.send;
}
function useCustomService(Context) {
  var _useContextR = React.useContext(Context),
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
  var service = React.useContext(Context);
  var value = usePrepare(service.machine, options);
  return React__default.createElement(Context.Provider, Object.assign({}, {
    value: value
  }), children);
}

exports.MachineProvider = MachineProvider;
exports.createContextMachine = createContextMachine;
exports.useContext = useContext;
exports.useCustomService = useCustomService;
exports.usePrepare = usePrepare;
exports.useSelector = useSelector;
exports.useSend = useSend;
exports.useState = useState;
//# sourceMappingURL=context-machine.cjs.development.js.map

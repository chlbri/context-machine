/* eslint-disable @typescript-eslint/no-unused-vars */
import { assign, createMachine, forwardTo, send, spawn } from 'xstate';
import { createContextMachine } from '../src/createContextMachine';

export const remoteMachine = createMachine({
  id: 'remote',
  context: undefined,
  initial: 'offline',
  states: {
    offline: {
      on: {
        WAKE: 'online',
      },
    },
    online: {
      on: {
        WAKE: 'offline',
      },
    },
  },
});

export const context = {
  elapsed: 0,
  canWalk: false,
  spawn: spawn(remoteMachine),
};

export type LightEvent =
  | { type: 'TIMER'; dete: string }
  | { type: 'NEXT'; minQueryLength: number };

export const lightMachine = createMachine<typeof context, LightEvent>(
  {
    initial: 'idle',
    context,
    states: {
      idle: {
        on: {
          TIMER: {
            target: 'green',
            actions: 'inc',
          },
        },
      },
      green: {
        on: {
          TIMER: {
            target: 'yellow',
            actions: 'inc',
          },
        },
      },
      yellow: {
        on: {
          TIMER: { target: 'red', actions: 'inc' },
        },
      },
      red: {
        initial: 'walk',
        states: {
          walk: {
            entry: 'setCanSearch',

            on: {
              TIMER: {
                target: 'stop',
                cond: 'searchValid',
                actions: ['inc', 'spawn'],
              },
            },
          },

          stop: {
            id: 'red_stop',
          },
        },
        on: {
          TIMER: {
            target: 'green',
            in: '#red_stop',
            actions: ['inc', 'sendTo', 'setCannotSearch'],
          },
        },
      },
    },
  },
  {
    guards: {
      searchValid: ({ canWalk }) => canWalk,
    },
    actions: {
      setCanSearch: assign({
        canWalk: _ => true,
      }),
      setCannotSearch: assign({
        canWalk: _ => false,
      }),
      inc: assign({
        elapsed: ({ elapsed }) => {
          return ++elapsed;
        },
      }),
      spawn: assign({
        spawn: () => spawn(remoteMachine),
      }),
      forwardTo: forwardTo(ctx => ctx.spawn),
      sendTo: send('WAKE', { to: ctx => ctx.spawn }),
    },
  }
);

export const LightContext = createContextMachine<typeof context, LightEvent>(
  {
    initial: 'idle',
    context,
    states: {
      idle: {
        on: {
          TIMER: {
            target: 'green',
            actions: 'inc',
          },
        },
      },
      green: {
        on: {
          TIMER: {
            target: 'yellow',
            actions: 'inc',
          },
        },
      },
      yellow: {
        on: {
          TIMER: { target: 'red', actions: 'inc' },
        },
      },
      red: {
        initial: 'walk',
        states: {
          walk: {
            entry: 'setCanSearch',

            on: {
              TIMER: {
                target: 'stop',
                cond: 'searchValid',
                actions: ['inc', 'spawn'],
              },
            },
          },

          stop: {
            id: 'red_stop',
          },
        },
        on: {
          TIMER: {
            target: 'green',
            in: '#red_stop',
            actions: ['inc', 'sendTo', 'setCannotSearch'],
          },
        },
      },
    },
  },
  {
    guards: {
      searchValid: ({ canWalk }) => canWalk,
    },
    actions: {
      setCanSearch: assign({
        canWalk: _ => true,
      }),
      setCannotSearch: assign({
        canWalk: _ => false,
      }),
      inc: assign({
        elapsed: ({ elapsed }) => {
          return ++elapsed;
        },
      }),
      spawn: assign({
        spawn: () => spawn(remoteMachine),
      }),
      forwardTo: forwardTo(ctx => ctx.spawn),
      sendTo: send('WAKE', { to: ctx => ctx.spawn }),
    },
  }
);

export const RemoteContext = createContextMachine(
  remoteMachine.config,
  remoteMachine.options
);

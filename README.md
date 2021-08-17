# Context-Machine

<br/>
<br/>

The most wanted thing.

Use a machine across the entire app.

<br/>

##### First,

### **createContextMachine (_machine_:StateMachine, _options_:MachineOptions)** : _React.Context_ <Interpreter>

<br/>

It will create the context and the machine as meta (_(out as any).machine = machine_)

It returns an _XState_ **Interpreter**

For the _service_ one, we omit the send, sender and state.

**N.B :** At this state, the context is not modifiable. The **_Interpreter_** value resulted cannot be modifiable across many components.

<br/>
<br/>

##### Optionaly,

### **usePrepareContextMachine (machine:StateMachine, options?: MachineOptions )**: [state, send, service]

<br/>

This function is used to initialize the Context with a mutable service. It’s for more reffining.

<br/>
<br/>

##### Secondly,

## **MachineProvider(Context: MachineContext, children:ReactNode, options:MachineOprions)** : _JSX.Element_

<br/>

The Provider.

You just have to write your children. It calls the _usePrepareContextMachine_ internally.

<br/>

_.../Wrapper.tsx_

```tsx
const MyProvider: FC = ({ children }) => (
  <MachineProvider Context={LightContext}>{children}</MachineProvider>
);
```

<br/>

_.../pages/\_app.tsx_

```tsx
import type { AppProps } from "next/app";
import Head from "next/head";
import ProviderMachine from "../components/providers";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MyProvider>
      <Head>
        <title>The best web App is Hellow World !!</title>
      </Head>
      <Component {...pageProps} />
    </MyProvider>
  );
}

export default MyApp;
```

<br/>
<br/>

###### Thirdly,

<br/>

## **useState(Context: MachineContext)** : XState _State_

<br/>

As the name says, It returns the current state of the machine accross all components.

<br/>
<br/>

## **useSend(Context: MachineContext)** : XState _send_

<br/>

As the name says, It returns the current state of the machine accross all components.

<br/>
<br/>

## **useService(Context: MachineContext)** : XState-custom _service_

<br/>

As the name says, It returns the service of the machine accross all components.

**N.B :** We omit the _send_, _sender_ and _state_ from this service because they aren’t mutables. This is usually used for listening to events and context.

<br/>
<br/>

## **useContext(Context: MachineContext)** : _Entire Mutable Machine_

<br/>

Use all of these three hooks.

The value is :

```tsx
{

  state: State,

  send: Sender,

  service: Custom_Service,

};
```

<br/>
<br/>

## **useSelect(Context: MachineContext, selector: _StateSelector_)** : _Select "wyw" inside the state_

<br/>

Only listen to the selected value

The value is :

```tsx
const select: useSelector(LightContext, state => state.context.elapsed);
```

<br/>
<br/>
<br/>

# And voilà!

# Application development proposal

##Overview

The aim of this document is being a proposal a set of technologies and the way to handle them in order to develop applications using rethink API.

##Technologies involve

* [React](http://facebook.github.io/react/index.html)
* [react-router](https://github.com/reactjs/react-router)
* [redux](http://redux.js.org/index.html)
* [Bootstrap](http://getbootstrap.com/)

##Architecture

####Static View

**Components**

*Rethink components*

* Runtime: Exposes two method to app developer: requireHyperty and requireProtoStub. It is the entry point to rethink.
* Hyperties: A hyperty is a service, deployable in a runtime environment [...](https://github.com/reTHINK-project/architecture/blob/master/docs/concepts/Hyperty.md)
* ProtoStubs: The implementation of the protocol stack [...](https://github.com/reTHINK-project/architecture/blob/master/docs/concepts/protofly.md)

*Application components*

* Presentational components: Describe how things look (markup, styles)
* Container components: Describe how things work (data fetching, state, updates)
* Store: Holds application state
* Actions: Payloads of information that send data from your application to your store
* Reducers: Specify how application's state changes

####Dynamic View

![Dynamic view](dynamic.png)

**Data Flow**

1. User clicks a button
2. _Container component_ receives the event and dispatches an _action_
3. _Action_ calls a method on _hyperty_ and waits for the response
4. After _hyperty_ answers, _action_ reaches the _store_
5. _Store_ asks reducer for specific state
6. _Reducer_ returns state
7. _Store_ notifies _presentational component_

##Run application

### Previous considerations

#### Special folders

*.well-known/runtime*

This folder contains runtime distribution files. They are served along with the application and you need to keep them updated.

*resources/descriptors*

This folder contains local descriptors used by RuntimeCatalog-Local. You need to keep them updated and encode your own hyperty into Hyperties.json descriptor.

#### Install dependencies

    npm install

### Launch application

    npm start

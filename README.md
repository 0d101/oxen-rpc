# Oxen RPC Library ![Node.js Package](https://github.com/0d101/oxen-rpc/workflows/Node.js%20Package/badge.svg)

This library allows you to easily call the daemon, service node or wallet's RPC methods.

## Status

> This library is still in development. If you meet abnormal behaviour, do not hesitate to report it via an issue.

## Usage

### Installation

```
npm i oxen-rpc
```

### Example

```js
const { RPCDaemon } = require("oxen-rpc");

// init your client
const rpcdaemonClient = new RPCDaemon({
  // optional, default: http://public.loki.foundation:22023/json_rpc
  address: "http://public.loki.foundation:22023/json_rpc",
  // optional, default: false
  camelCase: false,
  // optional, default: false
  checkInputIntegrity: false,
  // optional, default: false
  checkOutputIntegrity: false,
  // optional, default: false
  debug: false
});

// then, call methods
rpcdaemonClient.get_block_count().then((data) => {
  console.log("hey buddy, we got a response for get_block_count");
  console.log("- count", data.count);
  console.log("- status", data.status);
});
```

## API

### RPCDaemon: class

This class provides methods described in the documentation : https://docs.oxen.io/using-the-oxen-blockchain/advanced/daemon-rpc-calls

### RPCSNode: class

This class provides methods described in the documentation : https://docs.oxen.io/using-the-oxen-blockchain/advanced/service-node-rpc-calls

### RPCWallet: class

This class provides methods described in the documentation : https://docs.oxen.io/using-the-oxen-blockchain/advanced/wallet-rpc-calls

### Commons options

| property             | description                                                                                                                     | default value                                |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| address              | daemon rpc address                                                                                                              | http://public.loki.foundation:22023/json_rpc |
| camelCase            | if you prefer that the library generates the methods in camelcase (eg: `get_block_count` -> `getBlockCount`)                    | false                                        |
| checkInputIntegrity  | the library can check the input parameters for you, if an error is made, the rejection will occur from the client point of view | false                                        |
| checkOutputIntegrity | the client can check the result according to what is expected in the documentation                                              | false                                        |
| debug                | will give you a bit of verbose                                                                                                  | false                                        |

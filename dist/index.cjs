'use strict';

const _camelcase = require("lodash.camelcase");
const fetch = require("node-fetch");

const {
  DEFAULT_DAEMON_ADDR,
  DEFAULT_SNODE_ADDR,
  DEFAULT_WALLET_ADDR,
} = require("./constants/addresses");
const RPCDAEMON_METHODS = require("./constants/rpcdaemon-methods");
const RPCSNODE_METHODS = require("./constants/rpcsnode-methods");
const RPCWALLET_METHODS = require("./constants/rpcwallet-methods");

const DEFAULT_OPTIONS = {
  address: undefined,
  camelCase: false,
  checkInputIntegrity: false,
  checkOutputIntegrity: false,
  debug: false,
};
const DEFAULT_METHOD_DEFINITION = {
  input: null,
  output: null,
  formatInput: (_) => _, // noop
};

class RPCCaller {
  constructor(methods, defaultAddress, options = DEFAULT_OPTIONS) {
    this.methods = methods;
    this.options = Object.assign(
      {},
      DEFAULT_OPTIONS,
      { address: defaultAddress },
      options
    );

    const sanitizeMethodName = (methodName) => {
      return options.camelCase ? _camelcase(methodName) : methodName;
    };

    Object.keys(this.methods).forEach((methodName) => {
      const definition = Object.assign(
        {},
        DEFAULT_METHOD_DEFINITION,
        this.methods[methodName]
      );

      this[sanitizeMethodName(methodName)] = (params) => {
        // todo: check input integrity ?
        const formattedParams = definition.formatInput(params);

        this.__debug("start req:", methodName);
        this.__debug("params:", formattedParams);
        return this.call(methodName, formattedParams);
      };
    });
  }

  get address() {
    return this.options.address;
  }

  call(method, params) {
    return fetch(this.address, {
      method: "post",
      body: JSON.stringify({
        method,
        params,
      }),
    }).then((response) => response.json());
  }

  __debug(...messages) {
    if (this.options.debug) {
      console.log(...messages);
    }
  }
}

class RPCDaemon extends RPCCaller {
  constructor(options) {
    super(RPCDAEMON_METHODS, DEFAULT_DAEMON_ADDR, options);
  }
}

class RPCSNode extends RPCCaller {
  constructor(options) {
    super(RPCSNODE_METHODS, DEFAULT_SNODE_ADDR, options);
  }
}

class RPCWallet extends RPCCaller {
  constructor(options) {
    super(RPCWALLET_METHODS, DEFAULT_WALLET_ADDR, options);
  }
}

module.exports = { RPCDaemon, RPCSNode, RPCWallet };
//# sourceMappingURL=index.cjs.map

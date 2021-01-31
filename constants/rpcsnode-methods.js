module.exports = {
  /**
   * @description Get the quorum state which is the list of public keys of the nodes
   * who are voting, and the list of public keys of the nodes who are being tested.
   */
  get_quorum_state: {},

  /**
   * @description Get the required amount of $OXEN to become an Oxen Service Node
   * at the queried height. For stagenet and testnet values, ensure the daemon is
   * started with the --stagenet or --testnet flags respectively.
   */
  get_staking_requirement: {},

  /**
   * @description
   * Get the service node public key of the queried daemon. The daemon must
   * be started in --service-node mode otherwise this RPC command will fail.
   */
  get_service_node_key: {},

  /**
   * @description Get the metadata currently associated with the queried service
   * node public keys such as, registration height and contributors, etc.
   * If no public key is specified, this returns all the metadata for every service
   * node the queried daemon currently knows about.
   */
  get_service_nodes: {},
};

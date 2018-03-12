module.exports = function (RED) {
  function MWSNode(config) {
    RED.nodes.createNode(this, config)
    this.action = config.action
    this.account = RED.nodes.getNode(config.account)
    const mws = this.account.client
    var node = this
    node.on('input', function(msg) {
      const apiAction = node.action.split('.');
      (mws[apiAction[0]][apiAction[1]])(msg.payload).then(({ result, metadata }) => {
        msg.payload = result
        node.send(msg)
      }).catch(error => {
        console.error(error)
      })
    })
  }

  RED.nodes.registerType('MWS', MWSNode)
}

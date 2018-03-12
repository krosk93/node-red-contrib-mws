const MWSClient = require('mws-api')

module.exports = function (RED) {
  function mwsConfigNode(config) {
    RED.nodes.createNode(this, config)
    this.accessKeyId = config.accessKeyId
    this.secretAccessKey = config.secretAccessKey
    this.merchantId = config.merchantId
    this.host = config.host || "mws.amazonservices.com"
    this.client = new MWSClient({
      accessKeyId: this.accessKeyId,
      secretAccessKey: this.secretAccessKey,
      merchantId: this.merchantId,
      host: this.host,
      meta: {
        retry: true, // retry requests when throttled
        next: true, // auto-paginate
        limit: Infinity // only get this number of items (NOT the same as MaxRequestsPerPage)
      }
    })
  }

  RED.nodes.registerType('mws-config', mwsConfigNode)
}

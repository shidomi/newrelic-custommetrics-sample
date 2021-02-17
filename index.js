const axios = require('axios');
var newrelic = require('newrelic')


async function doExternalRequest(callback) {
    const response = await axios.get('https://httpstat.us/200?sleep=500');
    newrelic.addCustomAttribute('Status code', response.status)
    callback.end()
}

newrelic.startBackgroundTransaction('CustomExternalCall', 'External-Service-1', function handle() {
    var transaction = newrelic.getTransaction()
    doExternalRequest(transaction);
})

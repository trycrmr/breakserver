// pingserver.js
'use strict'

// const http = require('http')
const request = require('request');

try {
  const endpoint = process.argv[2]
  const iterations = process.argv[3]
  const requestDelay = process.argv[4]
  let i = 1

  const delayedRequest = ({requestDelay, endpoint}) => {
    let timerID = Math.random()
    // console.log(timerID)
    console.time(`${timerID}`)
    if(i === 1) console.log(`endpoint,startTime(epoch),iteration,requestDelay,error,statusCode,lap(ms)`)
    if(i < iterations) { // gross
      i++

      setTimeout(() => {
        delayedRequest({
          requestDelay,
          endpoint
        })
      }, requestDelay)
    } else {
      // console.log(`We're done!`)
      // process.exit()
    }
    return setTimeout(
      () => {
        let now = Date.now()
        request(endpoint, function (error, response, body) {
          // console.log(`-----${i}-----`)
          console.log(`${endpoint},${now},${i},${requestDelay},${error},${Date.now() - now}`)
          // console.log(`----------`)
          // console.log('error:', error); // Print the error if one occurred
          // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
          // console.log(`Start: ${now} | Lap: ${Date.now() - now}ms`)
          // console.timeEnd(`${timerID}`)
          // console.log('body:', body); // Print the HTML for the Google homepage.
        })
      }
    , requestDelay)
  }

  delayedRequest({
    requestDelay,
    endpoint
  })

} catch(err) {
  console.log(err)
}

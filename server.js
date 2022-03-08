const express = require('express')
const resize = require('./resize')
const server = express()

const SimpleNodeLogger = require('simple-node-logger'),
    opts = {
        logFilePath:'imageapi-errors.log',
        timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
    },
log = SimpleNodeLogger.createSimpleLogger( opts )
log.setLevel('error')

server.get('/', (req, res) => {
  // Extract the query-parameter
  const widthString = req.query.width
  const heightString = req.query.height
  const format = req.query.format
  const decoded_path = decodeURI(req.query.path)
  const drive_loc = '<drive location containing images>'

  //Replace mapped drive references with folder share path
  var path = decoded_path.replace('I:', drive_loc)

  // Parse to integer if possible
  let width, height, fill
  if (widthString) {
    width = parseInt(widthString)
  }
  if (heightString) {
    height = parseInt(heightString)
  }
  // Set the content-type of the response
  res.type(`image/${format || 'png'}`)

  // Get the resized image
  resize(path, format, width, height, log).pipe(res)
})

server.listen(8000, () => {
  console.log('Server started!')
})
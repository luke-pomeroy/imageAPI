const fs = require('fs')
const sharp = require('sharp')
const no_image_url = "<path to image to use when no image is found>"

var checked_path = ''

module.exports = function resize(path, format, width, height, log) {


  const fileExists = fs.existsSync(path)

  if (fileExists) {
  checked_path = path
  } else {
  checked_path = no_image_url
  }

  const readStream = fs.createReadStream(checked_path)

  readStream.on('error', function(err){
    log.error('Error while accessing read stream ', checked_path, ' : ', err)
  })

  let transform = sharp()

  if (format) {
    transform = transform.toFormat(format)
  }

  if (width || height) {
    transform = transform.resize(width, height, {
    kernel: sharp.kernel.nearest,
    fit: 'contain',
    position: 'center',
    background: { r: 255, g: 255, b: 255}

    })
  }
  transform.on('error', function(err){
    log.error('File error ', checked_path, ' : ', err)
  })

  return readStream.pipe(transform)
}
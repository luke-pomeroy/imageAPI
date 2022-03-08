# imageAPI
A basic Node.js image API - provide a URL encoded path to an image, and the API will return a resized version of the image 'on-the-fly' based on the image size specified in the URL parameters. 

## server.js
This file uses Express to listen on port 8000 for HTTP/S requests, and also provides basic logging functionality for any errors. 

### URL Parameters
- **width** of desired image in pixels (aspect ratio maintained and filled with white space so image returned is always square)
- **height** of desired image in pixels
- **format** of desired image (eg png, jpg). 'png' is the default.
- **path** to the image to be resized (the path must be URL encoded)

## resize.js
This file uses filesystem and sharp to fetch and resize the image. The result is piped via a ReadStream to form the response (a resized image).
If the image file cannot be found or read, an error is logged and a 'no image available' image (set via a parameter within this file) is returned instead.

## Use
Can be run as a background service via node-linux, node-windows or node-mac.

## ToDo
- [ ] Add authentication
- [ ] Add background colour to URL parameters.
- [ ] Add image rotation to URL parameters.

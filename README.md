# imageAPI
A Node.js image API - provide a URL encoded path to an image, and the API will return a resized version of the image 'on-the-fly' based on the image size specified in the URL parameters

**server.js**
This file uses Express to listen on port 8000 for HTTP/S requests, and also provides basic logging functionality for any errors. 
URL Parameters are:
width - width of desired image in pixels (aspect ratio maintained)
height - height of desired image in pixels
format - file format of desired image (eg png, jpg). 'png' is the default.
path - the URL encoded path to the image to be resized

**resize.js**
This file uses filesystem and sharp to fetch and resize the image. The result is piped via a ReadStream to form the response (a resized image).
If the image file cannot be found or read, an error is logged and a 'no image available' image (set via a parameter within this file) is returned instead.

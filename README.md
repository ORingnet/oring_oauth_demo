# ORING OAuth Demo

The demo of Oring OAuth2.0 implict flow

!['demo_pic'](https://raw.githubusercontent.com/ORingnet/oring_oauth_demo/master/assets/demo.png)

## Prerequisite

1. node.js


## Quick start

Clone the files

``
https://github.com/ORingnet/oring_oauth_demo.git
``

Install dependencies

``
npm install
``


Start the server

``
npm start
``

then type http://127.0.0.1:3000 in your modern browser.

you can use any of your own web server. Just server the whole public folder.

you need to save port 3000 for the demo since oauth flow needs redirect_URL with http://127.0.0.1:3000.

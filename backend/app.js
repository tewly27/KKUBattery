// const express = require('express')
// const https = require('https')
// const fs = require('fs')
// const path = require('path')
// const app = express();
// app.use('/', (req, res, next) => {
//     res.send('hello I am SSL Server !')
// })
// const options = {
//     key: fs.readFileSync(__dirname + "/ssl_private.key"),
//     cert: fs.readFileSync(__dirname + "/ssl.crt")
// }
// const sslServer = https.createServer(options, app);
// sslServer.listen(1337, () => {
//     console.log('Secure server is listening on port 1337')
// })
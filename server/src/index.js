//contains only mongoose connection

const server = require('./server')
const mongoose = require('mongoose');
const { env } = require('./config/env.config')

const mongoURI = env.mongoose.uri
const serverURL = env.server.port

console.log('Connecting to mongoose DB..')
mongoose.connect(mongoURI).then(async () => {
    console.log('Connected to MongoDB URI')
    server.listen(serverURL, () => {
        console.log(`Server running on http://localhost:${serverURL}`)
    })
}).catch((error) => console.log('Mongoose error:', error))

// console.log(httpServer.address())
// Enable Mongoose debugging to log all queries
// mongoose.set('debug', function (collectionName, methodName, ...methodArgs) {
//     console.log('collectionName:', collectionName)
//     console.log('methodName:', methodName)
//     console.log('methodArgs:', methodArgs)
// });
module.exports = server;
// export const config = { maxDuration: 30 };
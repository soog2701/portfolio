const express = require('express')
const next = require('next')
// const nextI18NextMiddleware = require('next-i18next/middleware').default

const nextI18next = require('./i18n')

// socket 
const http = require('http').createServer(express)
const io = require('socket.io')(http)

const port = process.env.PORT || 3000
const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handle = app.getRequestHandler();

(async () => {
  await app.prepare()
  const server = express()

  // server.use(nextI18NextMiddleware(nextI18next))

  server.get('*', (req, res) => handle(req, res))

  // socket
  io.sockets.on('connection', () => {
    console.log(`Client with ID of ${socket.id} connected!`)
  
    io.sockets.emit('SOME_EVENT', 'HelloWorld')
  })

  await server.listen(port)
  console.log(`> Ready on http://localhost:${port}`) // eslint-disable-line no-console
})()
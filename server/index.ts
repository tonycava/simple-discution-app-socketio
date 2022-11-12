import express from "express"
import http from "http"
import { Server } from 'socket.io'
import cors from "cors"

const app = express()
const server = http.createServer(app)

app.use(cors())

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ['GET', "POST"]
  }
})

io.on("connection", socket => {
  socket.on('send', (data) => {
    console.log(data)
    socket.broadcast.emit('receive_message', data.message)
  })
})

server.listen(3001, () => console.log("UP AND RUNNING"))
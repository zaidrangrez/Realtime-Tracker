const http = require('http')
const socketio = require('socket.io')
const path = require('path')
const express = require('express')
const { Socket } = require('dgram')

const app = express()

const server = http.createServer(app)
const io = socketio(server)

app.set("view engine" , "ejs")
app.use(express.static("public"));
io.on("connection", function(socket){
    socket.on("send-location" , function(data){
        io.emit("recieve-location",{id : socket.id , ...data})
    })
    console.log('connected')
})

app.get('/',(req,res)=>{
    res.render('index')
})

server.listen(3000,()=>{
    console.log('server is running on port 3000')
})
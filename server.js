// Requiring everything
const http = require('http')
const socketio = require('socket.io')
const express = require('express')
const { disconnect } = require('cluster')
const app = express()
 
// creating server 
const server = http.createServer(app)

// creating a socket 
const io = socketio(server)

// setting up view engine 
app.set("view engine" , "ejs")

// setting up path 
app.use(express.static("public"));

// sending and receiving loaction req  
io.on("connection", function(socket){
    socket.on("send-location" , function(data){
        io.emit("recieve-location",{id : socket.id , ...data})
    })

    // handling disconnect users 
    socket.on("disconnected" ,function(){
        io.emit("user-disconnected", socket.id)
    })
})

// default api 
app.get('/',(req,res)=>{
    res.render('index')
})

// server port 
server.listen(3000,()=>{
    console.log('server is running on port 3000')
})
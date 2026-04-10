const app = require('./src/app.js')
const http = require('http')
const socketio = require('socket.io')

const server = http.createServer(app)
const io = socketio()

app.set("view engine" , "ejs")
app.set(express.static(path.join(__dirname,"public")))

server.listen(3000,()=>{
    console.log('server is running on port 3000')
})
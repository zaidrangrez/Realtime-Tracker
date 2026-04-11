const socket = io();

if(navigator.geolocation){
    navigator.geolocation.watchPosition(
        (position)=>{
            // getting coords
            const {latitude , longitude} = position.coords;

            // handling socket 
            socket.emit("send-location" , {latitude,longitude})
        },
        // error handling  
        (error)=>{
            console.error(error);
        },
        // contomizing settings 
        {
            enableHighAccuracy : true ,
            timeout : 5000,
            maximumAge : 0
        }
            
        
    )
}

// setting up view 
const map = L.map("map").setView([0,0] , 16)

// creating a map layer 
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
    atrribution : "@zaidrangrez"
}).addTo(map)

// creating markers 
const markers = {}

// handling recieved socket 
socket.on("recieve-location" ,(data) => {
    const {id, longitude ,latitude} = data ;
    map.setView([latitude , longitude])

    // if marker already exist
    if(markers[id]){
        markers[id].setLatLng([latitude,longitude])
    }
    // if marker didnt already exist 
    else{
        markers[id] =  L.marker([latitude,longitude]).addTo(map)
    }
})


// handling disconnected users 
socket.on("user-disconnected" , (id)=>{
    if(markers[id]){
        map.removeLayer(markers[id])
        delete markers[id]
    }
})
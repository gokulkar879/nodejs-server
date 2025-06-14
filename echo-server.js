import * as net from 'net';

let server = net.createServer(); //listening socket
server.listen({host: "127.0.0.1", port: 8990}) //binding and listening on the IP address

//accepting new connection
function newConnection(socket) {
    console.log("New Connection: ", socket.remoteAddress, " ", socket.remotePort);

    //reading the data
    socket.on('data', (data) => {
         console.log("data recevied: ", data.toString());
        socket.write(data);

        //terminate the connection if the data include 'q'
        if(data.includes('q')) {
            console.log("closing the connection");
            socket.end();
        }
    });

    socket.on('error', (err) => {
        console.log("socket error: ", err);
    })
}

//error in connection
function errorConnection(error) {
    console.log("Error connection: ", error);
}

server.on('connection', newConnection);
server.on('error', errorConnection);


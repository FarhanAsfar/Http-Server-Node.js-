const net = require("net");

// Accept New Connections
function newConnection(socket) {
    console.log('new connection', socket.remoteAddress, socket.remotePort);

    // Read and Write
    socket.on('end', () => {
        // FIN received. Connection will be closed automatically.
        console.log('EOF');
    });

    socket.on('data', (data) => {
        console.log('data: ', data);
        socket.write(data); // Echo back the data
    
        // Actively close the connection if the data contains 'q'
        if (data.includes('q')) {
            console.log('connection closing...');
            socket.end(); // This will send FIN and close the connection.
        }
    });
}

let server = net.createServer(); // Creates a listening socket, type: net.Server.
server.on('error', (err) => { throw err; }); // Error Handling
server.on('connection', newConnection);
server.listen({ host: '127.0.0.1', port: 1234 });

console.log("Server listening on 127.0.0.1:1234");

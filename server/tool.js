const net = require("net");

let arguments = process.argv;

if(arguments.length < 4 || arguments.length > 6) {
console.log("Usage : node tool.js __deviceID__ __state__ speed __speed_value__");
return;
}

let deviceID;
let state;
let speed_unit;

const clientSocket = new net.Socket();

clientSocket.connect(5500, '192.168.184.115', () => {
console.log("Connected to server");

deviceID = arguments[2];
state = arguments[3];

data = { "deviceID": deviceID, "state": state };

if(arguments[5]) {
speed_unit = arguments[5];
data["speed"] = parseInt(speed_unit);
}

clientSocket.write(JSON.stringify(data));

});

clientSocket.on('data', (data) => {
console.log(`Receive : ${data}`);
});

clientSocket.on('end', () => {
console.log(`Connection to server is closed`);
});


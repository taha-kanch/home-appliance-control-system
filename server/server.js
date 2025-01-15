const net = require('net');
const port = 5500;

const HOUSE_APPLIANCE_DS = [
{ deviceID: 1, type: 'BULB', state: 'OFF' },
{ deviceID: 2, type: 'BULB', state: 'OFF' },
{ deviceID: 3, type: 'FAN', state: 'OFF', speed: 5 },
];

const clients = [];

const server = net.createServer((socket) => {

clients.push(socket);

socket.on('data',  (data) => {
const parsedData = JSON.parse(data);
updateDS(parsedData, socket);
printDS();
broadcastUpdates();
});

socket.on('end', () => {
console.log("Connection is ended!");
});

socket.write(JSON.stringify(HOUSE_APPLIANCE_DS));

});

server.listen(port, (err) => {
if(err) {
console.log(`Error : ${err}`);
return;
}
console.log(`Server is running on port ${port}!`);

printDS();

});


const updateDS = (data, socket)=> {

const appliance = HOUSE_APPLIANCE_DS.find(item => item.deviceID == data.deviceID);
if(appliance) {
if(appliance.type == 'BULB') {
appliance.state = data.state;
}
else if(appliance.type == 'FAN') {
appliance.state = data.state;
appliance.speed = data.speed;
}
}

}

const broadcastUpdates = () => {
clients.forEach(client => {
client.write(JSON.stringify(HOUSE_APPLIANCE_DS));
});
}

const printDS = () => {
console.log("-----------------------------------");
HOUSE_APPLIANCE_DS.forEach(item => {

if(item.type === 'BULB') {
console.log(`${item.deviceID} ${item.type} ${item.state}!`);
}
else if(item.type === 'FAN') {
console.log(`${item.deviceID} ${item.type} ${item.state} speed ${item.speed}!`);
}

});

}

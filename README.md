This project showcases real-time state synchronization of home appliances using socket programming with Node.js and React Native. The system simulates a smart home setup with 2 bulbs and 1 fan, where changes in appliance states on one phone are instantly reflected on another connected phone, ensuring real-time synchronization across devices.

The core idea is to create a server-client architecture using TCP sockets. The server is built in Node.js, which manages a dataset (DS) representing the current state of appliances. It listens for incoming connections from clients (mobile phones) and handles real-time updates. The client side is developed using React Native, where a mobile app connects to the server over a specified host and port, providing a simple UI to control the appliances.

When a user interacts with the app (e.g., toggling a bulb’s switch or adjusting the fan speed), the updated state is sent to the server. The server processes the change, updates the dataset, and broadcasts the new state to all connected clients. As a result, both devices remain synchronized, with changes reflected in real-time on both phones without needing a manual refresh.

The setup involves running the React Native app on two physical Android phones connected via USB debugging. The phones communicate with the Node.js server, which can be hosted locally or on a remote machine. The server also logs the updated state of appliances, making it easy to track changes and debug.

Key features of this project include:

Real-time two-way communication between devices.
Instant reflection of state changes for appliances (bulbs and fan).
A simple and interactive UI for controlling appliances.
Server-side logging of the updated appliance dataset.
This project is a practical demonstration of using socket programming for real-time communication in mobile apps, suitable for smart home and IoT applications.

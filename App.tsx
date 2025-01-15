import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Switch,
  TextInput,
} from 'react-native';
import TcpSocket from 'react-native-tcp-socket';


function App(): React.JSX.Element {


  const [devicesDS, setDevicesDS] = React.useState([]);
  const [clientSocket, setClientSocket] = React.useState(null);

  React.useEffect(() => {

    // Create a TCP client

    const client = TcpSocket.createConnection({ port: 5500, host: '192.168.184.115' }, () => {
      console.log('Connected to server');
      // client.write('Hello from React Native!');
    });
    setClientSocket(client);

    client.on('data', (data) => {
      if(isJSONString(data)) {
        console.log(`Received: ${data}`);
        setDevicesDS(JSON.parse(data));
      } else {
        console.log(`Received: ${data}`);
      }
    });

    client.on('error', (error) => {
      console.error(`Error: ${error.message}`);
    });

    client.on('close', () => {
      console.log('Connection closed');
    });

    return () => {
      client.destroy(); // Cleanup on unmount
    };
  }, []);

  const isJSONString = (str:string) => {
    try {
      JSON.parse(str);
      return true;
    } catch(err) {
      return false;
    }
  }

  const handleChangeSwitch = (value: boolean, item: any) => {

    const record = devicesDS.find(d => d.deviceID === item.deviceID);
    if(record) {
      record.state = value ? 'ON' : 'OFF';
      clientSocket.write(JSON.stringify(record));
      setDevicesDS([...devicesDS]);
    }

  }

  const handleChangeSpeed = (value: number, item: any) => {

    const record = devicesDS.find(d => d.deviceID === item.deviceID);
    if(record) {
      record.speed = value || 0;
      clientSocket.write(JSON.stringify(record));
      setDevicesDS([...devicesDS]);
    }

  }

  return (

    <View style={styles.container}>
      <Text style={styles.title}>Home Appliance Control System</Text>

      {
        devicesDS.length > 0 ? (

          devicesDS.map((item, idx) => (

            item.type === 'BULB' ? (
              <View style={styles.switchContainer} key={item.deviceID}>
                <Text style={styles.label}>Bulb {item.deviceID}: {item.state}</Text>
                <Switch
                  trackColor={{ false: '#767577', true: '#81b0ff' }}
                  thumbColor={item.state == 'ON' ? '#f5dd4b' : '#f4f3f4'}
                  value={item.state == 'ON' ? true : false}
                  onValueChange={(value) => handleChangeSwitch(value, item) }
                  style={styles.switch}
                />
              </View>
            ) : (
              item.type === 'FAN' ? (
                <View style={styles.switchContainer} key={item.deviceID}>
                  <Text style={styles.label}>Fan {item.deviceID}: {item.state}</Text>
                  <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={item.state == 'ON' ? '#f5dd4b' : '#f4f3f4'}
                    value={item.state == 'ON' ? true : false}
                    style={styles.switch}
                    onValueChange={(value) => handleChangeSwitch(value, item) }
                  />
                  <Text style={styles.label}>Speed</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter speed (1-5)"
                    keyboardType="numeric"
                    maxLength={1}
                    value={item.speed}
                    onChangeText={(value) => handleChangeSpeed(value, item)}
                  />
                </View>
              ) : (
                <></>
              )
            )

          ))
        ) : (
          <Text>No device available to connect!</Text>
        )
      }

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    width: '80%',
  },
  switch: {
    marginLeft: 10,
  },
  fanSpeedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    width: '80%',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
    flex: 1,
    textAlign: 'center',
    backgroundColor: '#fff',
  },
});

export default App;

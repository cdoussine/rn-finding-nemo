import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default class App extends React.Component {
  state = {
    latitude: 0,
    longitude: 0,
    errorMessage: null
  };

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage:
          'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    var { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied'
      });
    }

    Location.watchPositionAsync({ distanceInterval: 5 }, location => {
      this.setState({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });
    });
  };

  render() {
    console.log(this.state.latitude, this.state.longitude);
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
        <Marker coordinate={{ longitude: 2.294481, latitude: 48.85837 }} />
        <Marker
          coordinate={{
            longitude: this.state.longitude,
            latitude: this.state.latitude
          }}
        />
      </MapView>
    );
  }
}

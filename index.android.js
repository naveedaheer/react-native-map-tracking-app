import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import RunInfo from './src/components/runInfo';
import RunInfoNumeric from './src/components/runInfoNumeric';
import sharedStyles from './src/styles/sharedStyle';
import MapView from 'react-native-maps';


const styles = StyleSheet.create({
  infoWrapper: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    flex: 1
  },
  map: {
        ...StyleSheet.absoluteFillObject,
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
  }
});

export default class MapTrackingApp extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };

    setInterval(() => {
      this.distanceInfo.setState({ value: Math.random() * 100 });
      this.speedInfo.setState({ value: Math.random() * 15 });
      this.directionInfo.setState({ value: this.directionInfo.state == 'N' ? 'NW' : 'N' });
    }, 1000);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView style={styles.map}
          initialRegion={{
            latitude: 24.8615,
            longitude: 67.0099,
            latitudeDelta: 0.06,
            longitudeDelta: 0.06,
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
          zoomEnabled={true}
        />
        <View style={styles.infoWrapper} >
          <RunInfoNumeric
            title='Distance'
            unit='km'
            ref={(info) => this.distanceInfo = info}
          />
          <RunInfoNumeric
            title='Speed'
            unit='km/h'
            ref={(info) => this.speedInfo = info}
          />
          <RunInfo
            title='Direction'
            value='NE'
            ref={(info) => this.directionInfo = info}
          />
        </View>

      </View>
    );
  }
}

AppRegistry.registerComponent('MapTrackingApp', () => MapTrackingApp);

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
  }
});

let id = 0;

export default class MapTrackingApp extends Component {
  constructor(props) {
    super(props);

    let watchId = navigator.geolocation.watchPosition((postion) => {
      this.speedInfo.setState({value:postion.coords.speed});
      this.setState({
        markers: [
          ...this.state.markers,
          {
            coordinate: postion.coords,
            key: id++
          }
        ]
      }, null, { distanceFilter: 10 }
      );
    });


    this.state = {
      markers: [],
      watchId
    };

    // setInterval(() => {
    //   this.distanceInfo.setState({ value: Math.random() * 100 });
    //   this.speedInfo.setState({ value: Math.random() * 15 });
    //   this.directionInfo.setState({ value: this.directionInfo.state == 'N' ? 'NW' : 'N' });
    // }, 1000);
  }

componentWillUnmount(){
  navigator.geolocation.stopWatch(this.state.watchId);
}

  addMarker(region) {
    let now = (new Date).getTime();
    if (this.state.lastAddedMarker > (now - 5000)) {
      return;
    }
    this.setState({
      markers: [
        ...this.state.markers, {
          coordinate: region,
          key: id++
        }
      ],
      lastAddedMarker: now
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView style={styles.map}
          showsUserLocation={true}
        //  followsUserLocation={true}
          showsMyLocationButton={true}
          zoomEnabled={true}
          initialRegion={{
            latitude: 24.8615,
            longitude: 67.0099,
            latitudeDelta: 0.005,
            longitudeDelta: 0.001,
          }}
          onRegionChange={(region) => this.addMarker(region)}

        >
        <MapView.Polyline
              coordinates={this.state.markers.map((marker) => marker.coordinate)}
              strokeWidth={5}
            />
          {/*{this.state.markers.map((marker) => (
            <MapView.Marker coordinate={marker.coordinate} key={marker.key} />
          ))}*/}
        </MapView>

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

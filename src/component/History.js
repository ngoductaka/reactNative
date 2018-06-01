import React, { Component } from 'react';
import { FlatList, AppRegistry, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Location from './Location';
import getAPI from './getAPI';
import postData from './postData';
import getLocation from './getLocation';

export default class History extends React.Component {
  constructor() {
    super();
    this.state = {
      region: {
        latitude: 21.040310,
        longitude: 105.836980,
        latitudeDelta: 0.2922,
        longitudeDelta: 0.2421,
      },
      Marker: [],
      yourLocation: { latitude: 21.040310, longitude: 105.836980 },
      coordinates: [
        // { latitude: 21.040310, longitude: 105.836980 },
        // { latitude: 21.04031, longitude: 105.83698 },
        // { latitude: 20.9671812, longitude: 105.83698 },
        // { latitude: 21.004621, longitude: 105.846783 },
        // { latitude: 21.03905, longitude: 105.847527 },
        // { latitude: 21.040310, longitude: 105.836980 }
      ],
      pm: []

    }
  }

  componentDidMount() {
    this.getData();
    // this.sentData();
  }

  sentData = () => {
    getLocation()
      .then((position => {
        postData('https://gentle-castle-74854.herokuapp.com/ducdn',//qwertyuiop153453563453
          {
            latitude: position.latitude,
            longitude: position.longitude,
          })
          .then(result => {
            const a = [], pm = [];
            result.data.forEach(e => {
              let { latitude, longitude, pm_2_5 } = e;
              if (latitude !== undefined && longitude !== undefined) {
                a.push({ "latitude": latitude, "longitude": longitude });
                pm.push(pm_2_5)
              }
            })

            console.log(a)

            this.setState({ coordinates: a });
            this.setState({ pm: pm })

          }) // JSON from `response.json()` call
          .catch(error => console.error(error))
      }))
  }

  getData = () => {
    getAPI()
      .then(data => {
        this.setState({ Marker: data })
      })
  }

  render() {
    const { region, yourLocation, coordinates, pm } = this.state;
    const dnd = pm[pm.length - 1]
    return (
      // body
      <View style={{backgroundColor: 'powderblue', flex: 1 }}>
        {/*  header  */}
        <View style={styles.header}>
          <Text style={{ alignItems: 'center', justifyContent: 'center' }} > gia tri pm hien tai {dnd} </Text>
          <Location />
        </View>
        {/* map */}
        
        {/* map */}
        <View style={{ flex: 7 }}>
          <View style={styles.container}>
            <MapView style={styles.map} initialRegion={region} >
              {/* api */}
              {this.state.Marker.map(e => {
                return (
                  <Marker
                    coordinate={e.location}
                    title="dnd"
                    description="{this.content}"
                    image={'https://chart.googleapis.com/chart?chst=d_bubble_icon_text_small&chld=medical|bb|' + e.pm.pm_2_5 + '|2BEC5F|000000'}
                  />
                )
              })}
              {/* api */}
              {coordinates.map((e, i) => {
                let pmi = "" + pm[i];
                return (
                  <Marker
                    coordinate={e}
                    title="pm"
                    // description = x
                    image={`https://chart.googleapis.com/chart?chst=d_bubble_icon_text_small&chld=medical|bb|${pmi}|FBEC5F|000000`}
                  />
                )
              })}

              {/*  */}
              <Polyline
                coordinates={coordinates}
                strokeColor="#543" // fallback for when `strokeColors` is not supported by the map-provider
                strokeColors={[
                  '#7F0000',
                  '#654587', // no color, creates a "long" gradient between the previous and next coordinate
                  '#B24112',
                  '#E5845C',
                  '#238C23',
                  '#7F0000'
                ]}
                strokeWidth={2}
              />
              {/*  */}
            </MapView>
          </View>
        </View>
        {/*  */}
      </View>

    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }
})
import React, { Component } from 'react';
import { FlatList, AppRegistry, Text, StyleSheet, View, TouchableOpacity, PermissionsAndroid } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
// import Location from './Location';
import getAPI from './getAPI';
import postData from './postData';
// mo
import getLocation from './getLocation';
// 
// var moment = require('moment');
// moment().format();
export default class Map extends React.Component {
  constructor() {
    super();
    this.state = {
      region: {
        latitude: 21.040310,
        longitude: 105.836980,
        latitudeDelta: 0.05922,
        longitudeDelta: 0.05421,
      },
      Marker: [],
      yourLocation: { latitude: 21.040310, longitude: 105.836980 },
      coordinates: [
        // { latitude: 21.040310, longitude: 105.836980 },
      ],
      pm: [],
      history: true,
      per: false,
      backgroundColorHead: {
        backgroundColor: 'powderblue',
      },
      alertWhen: {
        lat: 0,
        lng: 0
      }
    }
  }
  // end constructor
  async componentDidMount() {
    let per = await this.requestLocation();
    if (per) {
      this.setState({
        per: true
      })
      getLocation()
        .then((position => {
          this.setState({
            yourLocation: {
              latitude: position.latitude,
              longitude: position.longitude,
            }
          });

        }))
      this.getData();

      if (this.state.history) {
        this.setState({
          backgroundColorHead: { backgroundColor: 'skyblue' }
        })
      } else {
        this.sentData();
        this.setState({
          backgroundColorHead: { backgroundColor: 'powderblue' }
        })
      }
      // time loop
      setInterval(this.sentData, 6000);
    }

  }
  // end componentDidMount
  async requestLocation() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Location Permission',
          'message': 'Activeev needs to access your location.'
        }
      )
      // console.log(granted);
      // console.log(true === granted);

      // console.log(PermissionsAndroid.RESULTS.GRANTED);
      if (granted === PermissionsAndroid.RESULTS.GRANTED || true === granted) {
        console.log("Location Permitted")
        return 1
      } else {
        alert("Location permission denied")
        return 0
      }
    } catch (err) {
      console.warn(err)
      return 0
    }
  }
  // end requestLocation
  switchView(his) {
    this.setState({ history: !his })
    this.componentDidMount()
  }
  // end switchView
  sentData = () => {
    getLocation()
      // .then(position => postData('https://gentle-castle-74854.herokuapp.com/pm25', { latitude: position.latitude, longitude: position.longitude, userName : "ducdn" }))
      .then(position => postData({ latitude: position.latitude, longitude: position.longitude, userName: "ducdn" }))
      .then(result => {
        // console.log("result---->", result);
        const a = [], pm = [];
        // ================ change
        result.data.forEach(e => {
          let { latitude, longitude, pm_2_5 } = e;
          if (latitude !== undefined && longitude !== undefined) {
            a.push({ "latitude": latitude, "longitude": longitude })
            pm.push(pm_2_5)
          }
        })
        // let { latitude, longitude, pm_2_5 } =result.data;
        
        // let newLocation = { "latitude": latitude, "longitude": longitude }
        // const a = this.state.coordinates.concat(newLocation);
        // const pm =this.state.pm.concat(pm_2_5);

        // ============ end change 
        // console.log(result,latitude, longitude, pm_2_5)
        // ==============
        this.setState({ coordinates: a });
        this.setState({ pm: pm });
        // console.log('alertWhen', pm, a)
        let latCurent = a[a.length - 1].latitude;
        let lngCurent = a[a.length - 1].longitude;
        let checkAlert = latCurent === this.state.alertWhen.lat && lngCurent === this.state.alertWhen.lng
        // console.log(checkAlert,latCurent,this.state.alertWhen.lat)
        if (pm[pm.length - 1] >= 75 && !checkAlert) {
          this.setState({
            alertWhen: { lat:latCurent, lng:lngCurent }
          })
           alert("muc pm2.5 vuot qua 75")
        }
      }) // JSON from `response.json()` call
      .catch(error => console.error(error))
  }
  // end sentData
  getData = () => {
    getAPI()
      .then(data => {
        this.setState({ Marker: data })
      })
  }
  // end getdata
  render() {
    const { region, yourLocation, coordinates, pm } = this.state;
    const dnd = pm[pm.length - 1]
    return (
      // body
      <View style={[styles.body, this.state.backgroundColorHead]}>
        {/* change view */}
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1, backgroundColor: 'powderblue', alignItems: 'center', justifyContent: 'center' }}>
            <Text onPress={() => this.switchView(this.state.history)} >.  pm history map  .</Text>
          </View>
          <View style={{ flex: 1, backgroundColor: 'skyblue', alignItems: 'center', justifyContent: 'center' }}>
            <Text onPress={() => this.switchView(this.state.history)}> .  PM map  . </Text>
          </View>
        </View>
        {/*  header  */}
        <View style={styles.header}>
          <Text style={{ alignItems: 'center', justifyContent: 'center' }} > gia tri pm hien tai {dnd} </Text>
        </View>
        {/*  map */}
        <View style={{ flex: 7 }}>
          <View style={styles.container}>
            <MapView style={styles.map} initialRegion={region} >
              {
                //
                (this.state.history) ?
                  (
                    this.state.Marker.map(e => {
                      return (
                        // ================================== data PM2.5
                        <Marker
                          coordinate={e.location}
                          title="dnd"
                          description={`PM2.5: ${e.pm.pm_2_5}, t: ${e.pm.temperature},h: ${e.pm.humidity},update: ${e.pm.create_date} ago`}
                          // image={'https://chart.apis.google.com/chart?chst=d_map_spin&chld=2|0|2BEC5F|33|b|' + e.pm.pm_2_5}
                          image={`https://chart.googleapis.com/chart?chst=d_bubble_icon_text_big&chld=medical|edge_bc|${e.pm.pm_2_5}|2BEC5F|000000`}

                        />
                      )
                    })
                  ) : (
                    coordinates.map((e, i) => {
                      let pmi = "" + pm[i];
                      return (
                        // ==================================data history
                        <Marker
                          coordinate={e}
                          title="pm"
                          description={` chỉ số PM2.5: ${pmi}`}
                          image={`https://chart.googleapis.com/chart?chst=d_bubble_icon_text_big&chld=medical|edge_bc|${pmi}|FBEC5F|000000`}
                        // image={`https://chart.apis.google.com/chart?chst=d_map_spin&chld=2|0|991111|33|b|${pmi}`}
                        />
                      )
                    })
                  )
              }
              {/* location */}
              <Marker
                coordinate={yourLocation}
                title="location"
                description="your location"
              // image={`https://chart.googleapis.com/chart?chst=d_bubble_icon_text_small&chld=medical|bb|44|FBEC5F|000000`}
              />
              {
                (this.state.history) ?
                  (
                    <Polyline
                      coordinates={[]}
                      strokeColor="#543" // fallback for when `strokeColors` is not supported by the map-provider
                      strokeColors={[
                        '#7F0000',
                        '#654587', // no color, creates a "long" gradient between the previous and next coordinate
                        '#B24112',
                        '#E5845C',
                        '#238C23',
                        '#7F0000'
                      ]}
                      strokeWidth={2} />
                  ) : (
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
                    />)
              }
            </MapView>
          </View>
        </View>
        {/*  */}
      </View>

    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
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
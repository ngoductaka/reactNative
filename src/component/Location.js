import React, { Component } from 'react';
import { View, Text } from 'react-native';
import getLocation from './getLocation';

export default  class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      error: null,
    };
  }

  componentDidMount() {
    getLocation()
    .then((position=>{
      this.setState({
        latitude: position.latitude,
        longitude: position.longitude,
        error: null,
      });
    }))
  }

  render() {
    console.log(this.state);
    return (
      <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
        {/* <Permistion /> */}
        <Text>Latitude: {this.state.latitude}</Text>
        <Text>Longitude: {this.state.longitude}</Text>
        {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
      </View>
    )
  }
}


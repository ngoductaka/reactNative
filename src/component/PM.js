import React, { Component } from 'react';
import { AppRegistry, Text, StyleSheet,View } from 'react-native';

export default class Cricle extends Component{
    render() {  
        return <Text>{this.props.data.name} </Text> 
    }
}
  
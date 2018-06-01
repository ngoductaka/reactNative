import React, { Component } from 'react';
import { AppRegistry, Text, StyleSheet,View } from 'react-native';


export default class Cricle extends Component{
  render() {
    const { xTranslate, yTranslate, color } = this.props
    return (
      <View style={[styles.container, {
        transform: [
          // {translateX: xTranslate ? xTranslate : 15},
          // {translateY: yTranslate ? yTranslate : 15},
          {translateX: xTranslate },
          {translateY: yTranslate },

        ],
        backgroundColor: color ? color : '#000'
      }]}>
        <View style={styles.innerCircle}/>
        {/* </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container :{
    backgroundColor:"black",
    
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    borderRadius: 55,
  },
  innerCircle: {
    position:'absolute',
    backgroundColor:"steelblue",
    width: 70,
    height:70,
    borderRadius: 50
  }
});
import React, { Component } from 'react';
import { AppRegistry, Text, StyleSheet,View } from 'react-native';


export default class Cricle extends Component{
  render() {
    const { xTranslate, yTranslate, color } = this.props
    return (
    <View style={[styles.container, {
            transform: [
                {translateX: xTranslate  },
                {translateY: yTranslate  },
            ]
        }]}
    >
        <View style={[styles.cross,{ 
          transform: [
            {rotate: '45deg'},
          ],
        }]}/>
        <View style={[styles.cross,{
          transform: [
            {rotate: '135deg'},
          ],

        }]}/>
        {/* </View> */}
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container :{
    // backgroundColor:"black",
    
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    // borderRadius: 55,
  },
  cross: {
    position:'absolute',
    backgroundColor:"black",
    width: 100,
    height:10,
    // borderRadius: 50
  }
});
import React, { Component } from 'react';
import { FlatList, AppRegistry, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Board from './src/component/Board';
import AiBoard from './src/component/AiBoard';
import Weather from './src/component/Weather';
import PM from './src/component/PM';
import Location from './src/component/Location';
import Map from './src/component/Map';
import MapView from 'react-native-maps';

export default class TicTacToe extends Component {
  constructor(props) {
    super(props)
    this.state = { vi: true, person: false, ai: false, api: [] }
  }

  vi() {
    const { person, ai, vi } = this.state
    this.setState({ vi: !vi })
  }

  person() {
    this.setState({ person: true })
    this.setState({ ai: false })
  }

  ai() {
    this.setState({ ai: true })
    this.setState({ person: false })
  }

  async  api() {
    try {
      let response = await fetch('http://192.168.1.149:5000/ducdn');
      let data = await response.json();
      setInterval(() => this.setState({ api: data }), 10000)

    } catch (error) {
      throw error;
      console.error(error);
    }
  }
  //   api = ()=>{
  //     return new Promise( (res, rej )=>{
  //       fetch('http://192.168.1.149:5000/ducdn')
  //       .then((response) => response.json())
  //       .then(data =>  {
  //         this.setState({api: data}) 
  //         res(data);
  //       })
  //       .catch(error => { 
  //         this.setState({api: []});
  //         rej(error)
  //       });
  //   })
  // }
  componentDidMount() {
    this.api()
    // .then( )
    // .catch(err=>{
    //   console.log(err);
    //   throw err
    // })
    // setInterval(()=> this.api(),1000)

  }

  render() {
    const { person, ai, vi, api } = this.state
    return (

      <View style={{ flex: 1 }}>
        <Location />
        {/* show pm2.5 data */}
        <View style={{ flex: 1 }}>
          {api.map(e => <PM data={e} />)}
        </View>
        {/* title */}
        <View style={{ justifyContent: 'space-between', flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'skyblue' }}>
          <Text onPress={() => this.vi()} style={[styles.title, { flex: 1 }]}> Tic Tac Toe </Text>
        </View>
        {/* container */}
        <View style={{ flex: 6 }}>
          {
            // vi?(
            (person || ai) ?
              (
                person ? <Board /> : <AiBoard />
              ) : (
                <View>
                  <TouchableOpacity onPress={() => this.person()}>
                    <Text style={{ marginTop: 30, fontSize: 40, textAlign: 'center' }}>
                      human game
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.ai()}>
                    <Text style={{ marginTop: 30, fontSize: 40, textAlign: 'center' }}>
                      ai game
                    </Text>
                  </TouchableOpacity>
                </View>
              )
            // ):(
            //   <Weather/>
            // )
          }

        </View>
        {/* broard */}

        {/* </View> */}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Cochin',
  },

  boad: {
    backgroundColor: 'steelblue'
  },
  line: {
    position: 'absolute',
    height: 312,
    width: 3,
    backgroundColor: "#ffff",
    // transform: [
    //   {translateX: 150}
    // ],
  }
});

// skip this line if using Create React Native App
AppRegistry.registerComponent('firstApp', () => TicTacToe);

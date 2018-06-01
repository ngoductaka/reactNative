import React, { Component } from 'react';
import { AppRegistry, Text, StyleSheet,View, TouchableWithoutFeedback,TouchableOpacity ,button } from 'react-native';

import Cricle from './Cricle';
import Cross from './Cross';

import {posion,area, CONDITIONS} from '../../constants/game';

let user1 = []
let user2 = []
let Win=''
console.log(Win);

// console.log(  CONDITIONS.some( d => d.every(item => [1,0,2].indexOf(item) !== -1) )   ) ;
export default class Board extends Component {
  constructor(){
    super()
    this.state={
      user1:[],
      user2:[],
      dis:false,
      Win:''
    }
  }
  clickBoard(e){
    // this.setState({startGame: !startGame})
    const {locationX, locationY} = e.nativeEvent
    console.log(e.nativeEvent);
    const { user1, user2, dis, Win } = this.state
    const areas = area.find(d =>
      (locationX >= d.startX && locationX <= d.endX) &&
      (locationY >= d.startY && locationY <= d.endY)
    )
    
    if(areas&&user1.length===0){
      this.setState({user1 : user1.concat(areas.id)});
      console.log("length user1 = 0 ");
      
    }
    
    else if(areas && user1.every(d => d !== areas.id) && user2.every(d => d !== areas.id)){

      console.log(user1.every(d => d !== areas.id));
      console.log(user1[0]);
      console.log(areas.id);
      console.log(areas);

      if(user1.length==user2.length){
        // console.log(areas.id);
        this.setState({user1 : user1.concat(areas.id)});
        console.log(" user1 ++");
      
        setTimeout(()=>{
          this.win();
        },5)
        // console.log(user1);
      }
      else {
        this.setState({user2 : user2.concat(areas.id)});
        console.log(" user2 ++");
      
        setTimeout(()=>{
          this.win();
        },5)
        
      }
    }
    else{
      console.log("understand+++++++++++++");
    }
  }

  restart() {
    const { user1, user2, dis, Win } = this.state
    this.setState({dis:false});
    this.setState({Win:''});
    this.setState({user1 : [] , user2 : [] });
    
  }
  // -----------------
  


  
  // ===============
  win(){
    const { user1, user2, dis, Win } = this.state
    if( CONDITIONS.some(d => d.every(item => user1.indexOf(item) !== -1)) ){
      this.setState({dis:true});
      this.setState({Win:'X win'});
    }
    else if(CONDITIONS.some(d => d.every(item => user2.indexOf(item) !== -1))){
      this.setState({dis:true});
      this.setState({Win: "O win"});
    }
    else if((user1.length+user2.length) == 9){
      this.setState({dis:true});
      this.setState({Win: "No One win"});
    }
    else{
      this.setState({Win: ''});
      
      // this.setState({Win: Win.push("...")});
      
    }    
    console.log(Win);
  }
  render() {
    const  {user1,user2, dis, Win}  = this.state
    // var {startGame} = this.state
    return (
      <View style={{flex: 1, }}>
        {/* container */}
        <View style={{flex: 8,justifyContent: 'center',alignItems: 'center', backgroundColor: 'skyblue'}}>
          <Text 
            onPress={()=>this.restart()}
            style={{fontSize:40, marginTop:20}}
          >
            { (Win!=='')? Win: ""}
          </Text>
          {/* broard */}
          <TouchableWithoutFeedback accessibilityComponentType={button}  onPress={ e=>this.clickBoard(e)} disabled={dis}>
          
            <View testId='foo' style={styles.boad}>
              {
                user1.map((d)=>(
                  <Cross
                    /* key={i} */
                    xTranslate={posion[d].x} 
                    yTranslate={posion[d].y}
                  />
                ))
              }
              {
                user2.map((d)=>(
                  <Cricle
                    /* key={i} */
                    xTranslate={posion[d].x} 
                    yTranslate={posion[d].y}
                  />
                ))
              }
              <Text style={[styles.line, {
                  transform: [
                    {translateX: 100}
                  ]
                }]}
              />
              <Text style={[styles.line, {
                  transform: [
                    {translateX: 200}
                  ]
                }]} 
              />
              <Text style={[styles.line, {
                  height:3,
                  width:456,
                  transform: [
                    {translateY: 100}
                  ]
                }]}
              />
              <Text style={[styles.line, {
                  height:3,
                  width:456,
                  transform: [
                    {translateY: 200}
                  ]
                }]} 
              />
              
              
              {/* <Cross xTranslate={15} yTranslate={15}/> */}
            </View>
          </TouchableWithoutFeedback >
          {/* </TouchableWithoutFeedback> */}

          <Text
            onPress={()=>this.restart()}
            style={{fontSize:40, marginTop:20}}
          > 
            per restart 
          </Text>
          
          
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize:30,
    fontWeight:'bold',
    fontFamily: 'Cochin',
  },
  boad: {
    // position: 'absolute',
    
    height: 312,
    width:312,
    borderWidth: 3,
    backgroundColor: 'steelblue'
  },
  line: {
    position: 'absolute',
    height: 306,
    width: 3,
    backgroundColor:"#ffff",
    // transform: [
    //   {translateX: 100}
    // ],
    
  }

});

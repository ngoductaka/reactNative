import React, { Component } from 'react';
import { AppRegistry, Text, StyleSheet,View, TouchableWithoutFeedback } from 'react-native';

import Cricle from './Cricle';
import Cross from './Cross';

import {posion,area, CONDITIONS,arr} from '../../constants/game';

let user1 = []
let user2 = [4]
let Win=''

export default class Board extends Component {
  constructor(){
    super()
    this.state={
      user1:[],
      user2:[4],
      // dis:true
      dis:false,
      Win:''
    }
  }
  clickBoard(e){
    // this.setState({startGame: !startGame})
    const {locationX, locationY} = e.nativeEvent
    const { user1, user2, dis, Win } = this.state;

    // this.setState({user2 : user2.concat(4)});
    
    
    const areas = area.find(d =>
      (locationX >= d.startX && locationX <= d.endX) &&
      (locationY >= d.startY && locationY <= d.endY)
    )
    if(areas && user1.every(d => d !== areas.id) && user2.every(d => d !== areas.id) && user1.length<user2.length){
        this.setState({user1 : user1.concat(areas.id)});
        setTimeout(()=>{
          this.ai();
    
          this.win();
        },5)
    }
  }
  ai(){
    const { user1, user2, dis, Win } = this.state;
    
    console.log('11sss1');
    console.log(user1);
    console.log('111');

    if(user1[1]==undefined){
      (user1[0]%2==1)?(user1[0]<4?this.setState({user2 : user2.concat(0)}):this.setState({user2 : user2.concat(8)})):(user1[0]<4?this.setState({user2 : user2.concat(1)}):this.setState({user2 : user2.concat(7)}))
    }
    else {
      if(user2[1]==0){//--------------------------- p0 = 1,3 --------------------
        if(user1[1]!=8) (user2[2]=8)
        else {// P1 != 8 M2 =8
          if(user1[0]==1){ //++++++++++++++++++++++ p0=1
            if (user1[2]==undefined){//m2 danh 3
              user2[2]=3
            }
            else{//p2 danh
              if(user1[2]!=5) (user2[3]=5) 
              else {
                if(user1[2]!=6) (user2[3]=6) 
              }
            }
          }
          else {//++++++++++++++++++++++           p0=7
            if (user1[2]==undefined){//m2 danh 3
              user2[2]=1
            }
            else{//p2 danh
              if(user1[2]!=2) (user2[3]=2) 
              else {
                if(user1[2]!=7) (user2[3]=7) 
              }
            }
            
          }
        }
      }else if(user2[1]==8){ // -------------------p0 = 5, 7
        if(user1[1]!=0) (user2[2]=0)
        else {// P1 != 0 M2 =0
          if(user1[0]==5){ //++++++++++++++++++++++ p0=5
            if (user1[2]==undefined){//m2 danh 3
              user2[2]=7
            }
            else{//p2 danh
              if(user1[2]!=1) (user2[3]=1) 
              else {
                if(user1[2]!=6) (user2[3]=6) 
              }
            }
          }
          else {//++++++++++++++++++++++           p0=7
            if (user1[2]==undefined){//m2 danh 3
              user2[2]=5
            }
            else{//p2 danh
              if(user1[2]!=2) (user2[3]=2) 
              else {
                if(user1[2]!=6) (user2[3]=6) 
              }
            }
            
          }
        }
        // (user1[1]!=0)?( user2[2]=0):(
        //   (user1[2]==undefined)?
        //   (user1[0]!=5)?(user2[2]=5):(user2[2]=7):
        //   (user1[2]!=2)?(user2[3]=2):(user2[3]=3)
        // )
          // (user1[0]!=5)?(user2[2]=5):(user2[2]=7)
          
        
      }else if(user2[1]==1){//
        if(user1[0]==0){
          if(user1[1]!=7) user2[2]=7
          else{
            if(user1[2]==undefined){
              user2[2]=6
            }else{
              if(user1[2]!=2)user2[3]=2
              else{
                if(user1[3]==undefined)
                user2[3]=8;
                else{
                  if(user1[3]!=5)user2[4]=5
                  else{user2[4]=3}
                }
              }
            }
          }
        }else{
          if(user1[1]!=7) user2[2]=7 // p1 != 7 m2 = 7 => win
          else{//p1 =7 
            if(user1[2]==undefined){// m2 danh
              user2[2]=8
            }else{//m2 danh xong 
              if(user1[2]!=0)user2[3]=0 //p2 !=0 m3=0 => win
              else{// p2=0
                if(user1[3]==undefined)//m3 danh
                user2[3]=6;
                else{//m3=6
                  if(user1[3]!=5)user2[4]=5
                  else{user2[4]=3}
                }
              }
            }
          }
        }
        
      }else if(user2[1]==7){// th p0=6 ,8
        if(user1[0]==6){//p0=6
          if(user1[1]!=1) user2[2]=1//p1!=1 m2=1 => win
          else{//p1=1
            if(user1[2]==undefined){// danh m2
              user2[2]=0
            }else{//m2 =0
              if(user1[2]!=8)user2[3]=8 //p2!=8 m3 =8 => win
              else{//p2=8
                if(user1[3]==undefined)//m3 danh
                user2[3]=5;//m3=5
                else{
                  if(user1[3]!=3)user2[4]=3 // => win
                  else{user2[4]=2}
                }
              }
            }
          }
        }else{//p0=8
          if(user1[1]!=1) user2[2]=1 // p1 != 1 m2 = 1 => win
          else{//p1 =1 
            if(user1[2]==undefined){// m2 danh
              user2[2]=2
            }else{//m2=2  xong 
              if(user1[2]!=6)user2[3]=6//p2 !=6 m3=6 => win
              else{// p2=6
                if(user1[3]==undefined)//m3 danh
                user2[3]=0;
                else{//m3=6
                  if(user1[3]!=5)user2[4]=5
                  else{user2[4]=3}
                }
              }
            }
          }
        }
        
      }else{

      }
    }
  }
  restart() {
    const { user1, user2, dis, Win } = this.state
    this.setState({dis:false});
    this.setState({Win:''});
    this.setState({user1 : [] , user2 : [4] });
    
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
            { (Win!=='')? Win: user1[0]}
          </Text>
          {/* broard */}
          <TouchableWithoutFeedback onPress={ e=>this.clickBoard(e)} disabled={dis}>
            <View style={styles.boad}>
              <View style={[styles.line, {
                  transform: [
                    {translateX: 100}
                  ]
                }]}
              />
              <View style={[styles.line, {
                  transform: [
                    {translateX: 200}
                  ]
                }]} 
              />
              <View style={[styles.line, {
                  height:3,
                  width:306,
                  transform: [
                    {translateY: 100}
                  ]
                }]}
              />
              <View style={[styles.line, {
                  height:3,
                  width:306,
                  transform: [
                    {translateY: 200}
                  ]
                }]} 
              />
              
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
              {/* <Cross xTranslate={15} yTranslate={15}/> */}
            </View>
          </TouchableWithoutFeedback>

          <Text
            onPress={()=>this.restart()}
            style={{fontSize:40, marginTop:20}}
          > 
            ai restart 
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

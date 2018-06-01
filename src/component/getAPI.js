
import React, { Component } from 'react'; 

export default  async () => {
        try {
          // let response = await fetch( 'http://192.168.1.141:5000/ducdn' );
          // https://gentle-castle-74854.herokuapp.com/ducdn
          let response = await fetch( 'https://gentle-castle-74854.herokuapp.com/ducdn' );
          let data = await response.json();
          return data;
        //   setInterval( ()=>this.setState({api: data}), 10000)
          
        } catch (error) {
          throw error;
          console.error(error);
        }
      }

import React, { Component } from 'react'; 

export default ()=>{
    return new Promise((res, rej)=>{
        navigator.geolocation.getCurrentPosition(
            position => {
                res({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude 
                })
            },// first param 
            error =>  rej(error) ,
            { enableHighAccuracy: true, timeout: 9000, maximumAge: 1000 },
          );
    })
    
}
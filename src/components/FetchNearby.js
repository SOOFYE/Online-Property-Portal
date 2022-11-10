import React from 'react'

export function FetchNearby(lat,lng) {

    const latitude = lat; // you can update it with user's latitude & Longitude
    const longitude = lng;
    let radMetter = 2 * 1000; // Search withing 2 KM radius

    const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + latitude + ',' + longitude + '&radius=' + radMetter + '&key=AIzaSyCfRAQfZ8V5uzxBHy6D8fg9fxuUX125dXc'

    fetch(url,{
        crossDomain:true,
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin':'*'
        },
    }).then(res => { res.json()})
      .then(res => {

        console.log(res)

      var places = [] // This Array WIll contain locations received from google
        
      for(let googlePlace of res.json().results) {
          var place = {}
          var lat = googlePlace.geometry.location.lat;
          var lng = googlePlace.geometry.location.lng;
          var coordinate = {
            latitude: lat,
            longitude: lng,
          }

          place['placeTypes'] = googlePlace.types
          place['coordinate'] = coordinate
          place['placeId'] = googlePlace.place_id
          place['placeName'] = googlePlace.name

          places.push(place);
        }

        console.log(places);

        return places

        // Do your work here with places Array
      })
      .catch(error => {
        console.log(error);
      });
    
}



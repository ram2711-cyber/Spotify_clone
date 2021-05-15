import React, { useEffect,useState } from "react"
import './App.css';
import Login from './Login';
import Player from './Player';
import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";

import { useDataLayerValue } from './DataLayer';


const spotify = new SpotifyWebApi();




function App() {

  const [{ loading, token, playlists }, dispatch] = useDataLayerValue();


  useEffect(() => {

    const hash = getTokenFromUrl();
    window.location.hash = "";
    console.log("Token<<<<<<<<<<<<<<<<< ",hash);
    const _token = hash.access_token;
    if(_token) {
      
      dispatch({
        type:'SET_TOKEN',
        token : _token
      })

      spotify.setAccessToken(_token);

      spotify.getMe().then(user => {
        dispatch({
          type: 'SET_USER',
          user: user
        })
      });

      spotify.getUserPlaylists().then((playlists)=>{
        dispatch({
          type: 'SET_PLAYLIST',
          playlists: playlists
        })
      });

      spotify.getPlaylist("37i9dQZEVXcNRFJwtrf3mv").then((response)=>{
      console.log(response)
      dispatch({
        type:'SET_DISCOVER_WEEKLY',
        discover_weekly : response,
        loading : false
      })
    });

    }

    
  },[]);

  return (
    <div className="app">
      {
        token ? 
        loading ? <h4>Loading .....</h4> : <Player spotify={spotify}/>
         :
         
          (
          <Login/>
        )
      } 
    </div>
  );
}

export default App;

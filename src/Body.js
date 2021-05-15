import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled'
import FavoriteIcon from '@material-ui/icons/Favorite'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import React from 'react'
import "./Body.css"
import { useDataLayerValue } from './DataLayer'
import Header from "./Header.js"
import SongRow from './SongRow'


function Body({ spotify }) {

    const[{discover_weekly, token}, dispatch ] = useDataLayerValue();
    console.log("DISCOVER_WEEKLY", discover_weekly);


    const playSong = (id) => {
        console.log("CLicked")
        spotify.play({
            context_uri: `spotify:playlist:37i9dQZEVXcNRFJwtrf3mv`,
            uris: [`spotify:track:${id}`],
        })
        .then((res)=>{
            console.log("res",res)
            spotify.getMyCurrentPlayingTrack().then((r)=>{
                dispatch({
                    type: "SET_ITEM",
                    item: r.item,
                });
                dispatch({
                    type:'SET_PLAYING',
                    playing: true
                })
            })
        }).catch((e) => console.log("eeeeeeeee", e));
    }


    return (
        <div className="body">
            <Header spotify={spotify} />
            <div className="body__info">
                <img src={discover_weekly?.images[0]?.url} alt="" />
                <div className="body__infoText" >
                    <strong>PLAYLIST</strong>
                    <h2>Discover Weekly</h2>
                    <p>{discover_weekly?.description}</p>
                </div>
            </div>
            <div className="body__songs" >
                <div className="body__icons">
                    <PlayCircleFilledIcon className="body__shuffle"/>
                    <FavoriteIcon fontSize="large" />
                    <MoreHorizIcon/>
                </div>

                {discover_weekly?.tracks.items.map(item => (
                    <SongRow playSong={playSong} track={item.track} />
                ))}

            </div>
        </div>  
    )
}

export default Body

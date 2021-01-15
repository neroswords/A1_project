import React, { useState, useEffect }from 'react';
import {Link} from 'react-router-dom'

function Bot_list (props){
    const [username,setUser] = useState(localStorage.getItem('user_id'))
    const [botData,setBotData] = useState([])
    
    useEffect(()=>{
        fetch('/profile/'+props.match.params.user_id).then(
          response => response.json()
        ).then(data => setBotData(data))
      }, []);

    return(
      <>
        <Link to={'/bot/'+username+'/create_bot'}>
          <button></button>
        </Link>
        <div>
          { botData }
            hi this is {props.match.params.user_id}
          </div>
        </>
    )
}

export default Bot_list;
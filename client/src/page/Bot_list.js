import React, { useState, useEffect }from 'react';

function Bot_list (props){
    
    const [botData,setBotData] = useState([])
    useEffect(()=>{
        fetch('/profile/'+props.match.params.user_id).then(
          response => response.json()
        ).then(data => setBotData(data))
      }, []);
    
        return(
            <div>
                { botData }
                hi this is {props.match.params.user_id}
            </div>  
        )
}

export default Bot_list;
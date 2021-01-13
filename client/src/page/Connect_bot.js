import React, {useState, useEffect} from 'react';
import FacebookForm from '../components/form/facebookform';
import LineForm from '../components/form/lineform';


export default function Connect(props){
    if(props.match.params.platform == 'line'){
        return(
            <LineForm/>
        )
    }
    else if(props.match.params.platform == 'facebook'){
        return(
            <FacebookForm/>
        )
    }

    
}
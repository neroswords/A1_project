import React, { useEffect, useState,Fragment, useCallback } from 'react';
import Tablemap from '../Components/Table/Tablemap';
import Navbar_member from '../Components/Navbar/navbar_member';



import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

const Styles = styled.div` 
.mapping-page {
    display: flex;
    min-height: 92vh;
}
.mapping-page .container-fluid {
    padding: 20px 40px;
    width: 100%;
    overflow: hidden;
}

.mapping-title {
    padding: 4px;
    width: 100% ;
    background-color: white;
    border-radius: 0.25rem;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
}

.mapping-title h2 {
    font-weight:600;
}
.showtablemap{
    min-height: 70vh;
    margin-top: 1%;
    background-color: white;
    padding: 5px;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
    border-radius: 0.25rem;
    overflow-x: auto;
}
.bot-name-on-page {
    
    margin-bottom: 10px;
    /* width: 150px; */
    /* max-width: 800px; */
    width: max-content;
    border-radius: 1rem;
  }

  .bot-name-on-page h4{
    position: relative;
    right: 0;
    font-size: 14px;
    font-weight: 600;
    /* width: 500px; */
    /* max-width: 500px; */
    color: #fff;
    /* border: 2px solid #fca311; */
    background-color : #fca311;
    border-radius: 1rem;
    padding: 5px 20px; 
  }
  .loader {
  animation:spin 1s infinite linear;
  border:solid 2vmin transparent;
  border-radius:50%;
  border-right-color:#fca311;
  border-top-color:#fca311;
  box-sizing:border-box;
  height:20vmin;
  left:calc(50% - 10vmin);
  position:fixed;
  top:calc(50% - 10vmin);
  width:20vmin;
  z-index:1;
  &:before {
    animation:spin 2s infinite linear;
    border:solid 2vmin transparent;
    border-radius:50%;
    border-right-color:#fcc111;
    border-top-color:#fcc111;
    box-sizing:border-box;
    content:"";
    height:16vmin;
    left:0;
    position:absolute;
    top:0;
    width:16vmin;
  }
  &:after {
    animation:spin 3s infinite linear;
    border:solid 2vmin transparent;
    border-radius:50%;
    border-right-color:#fcd111;
    border-top-color:#fcd111;
    box-sizing:border-box;
    content:"";
    height:12vmin;
    left:2vmin;
    position:absolute;
    top:2vmin;
    width:12vmin;
  }
}

@keyframes spin {
  100% {
    transform:rotate(360deg);
  }
}
` 

function Mapping(props){
    const [name, setName] = useState();
    const [loading,setLoading] = useState(false);
    useEffect(() => {
      fetch('/bot/'+props.match.params.bot_id) .then(response => response.json().then(inf => {
        setName(inf)
        setLoading(true)
    }))
    }, []);
  
    return(
        <Styles>
  
        {loading ?            
        <div className="mapping-page">
            <Navbar_member botID = {props.match.params.bot_id} path={"mapping"} />
            <div className="container-fluid">
                <div className="bot-name-on-page">
                    <h4> Bot name : {name}</h4>
                </div>
                <div className="mapping-title">
                    <h2 className='p-2 flex-grow-1 bd-highlight' id="mapping-header">Mapping</h2>
                </div>
                <div className="showtablemap">
                    <Tablemap 
                        botID={props.match.params.bot_id}
                    />  
                </div>
            </div>

        </div>   
                  
                  : <div class="loader"></div>}
        </Styles>        
        
    );
}

export default Mapping;
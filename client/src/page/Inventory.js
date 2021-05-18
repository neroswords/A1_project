import React, {useState, useEffect, useRef } from "react";
import Navbar_member from '../Components/Navbar/navbar_member';
import styled from 'styled-components';
import Invenlist from '../Components/Inventory/Inven_list';
import { Link } from "react-router-dom";

const Styles = styled.div` 
.inventory-page {
    display: flex;
    min-height:92vh;
}
.inventory-page .container-fluid {
    padding: 20px 40px;
    width: 100%;
}
.inven-title{
    padding: 4px;
    width: 100% ;
    background-color: white;
    border-radius: 0.25rem;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
}
.inven-title h2 {
    font-weight:600;
}
.inventory-body {
    min-height: 70vh;
    margin-top: 1%;
    background-color: white;
    padding: 1%;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
    border-radius: 0.25rem;
    /* border: 1px solid #ececec; */
}
.inven-showlist{
    display: grid;
    grid-template-columns: repeat(5, 1fr);
}
@media only screen and (min-width: 800px) {
    .inven-showlist { 
        grid-template-columns: repeat(2, 1fr); 
        }
}
@media only screen and (min-width: 1200px) {
    .inven-showlist { 
        grid-template-columns: repeat(3, 1fr); 
        }
}
@media only screen and (min-width: 1600px) {
    .inven-showlist { 
        grid-template-columns: repeat(5, 1fr); 
    }
  }
.create-inven{
    padding: 7px 20px;
    margin-bottom: 1%;
    font-size: 12px;
    border-radius: 25px;
    border: 1px solid #0078ff;
    transition: 0.5s;
    background-color: #0078ff;
    color: #fff;
}
.bot-name-on-page {
    margin-bottom: 10px;
    /* width: 150px; */
    /* max-width: 800px; */
    width: max-content;
    border-radius: 1rem;
  }

.bot-name-on-page h4{
    max-width: 900px;
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

function Inventory(props){
    const [inventory,setInventory] = useState([]);
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        fetch('/inventory/bot/'+props.match.params.bot_id).then(res => res.json().then(data => {
            setInventory(data)
      }))
      }, []);
    console.log(inventory)
    const card = inventory.map((inventory) => 
        <Invenlist props={inventory}/>
        ,console.log(inventory)
    );
    const [name, setName] = useState();
    useEffect(() => {
      fetch('/bot/'+props.match.params.bot_id) .then(response => response.json().then(inf => {
        setName(inf)
        setLoading(true)
    }))
    }, []);

    return(
        <Styles>
            <div className="inventory-page" >
               <Navbar_member botID = {props.match.params.bot_id} path={"inventory"} />
               <div className="container-fluid">
                    <div className="bot-name-on-page">
                        <h4> Bot name : {name}</h4>
                    </div>
                 
                    <div className="inven-title">
                       <h2 className="p-2 flex-grow-1 bd-highlight" id="inventory-header">Inventories</h2>
                   </div> 
                   {loading ?                    
                      <div className="inventory-body">        
                      <Link to={"/bot/"+props.match.params.bot_id+"/add_item"}>
                          <button className="create-inven btn btn-success" type="button">Create</button>
                      </Link>
                      
                      <div className="inven-showlist">
                          {card}
                      </div>
                  </div>  : <div class="loader"></div>}
                </div> 
            </div>
        </Styles>
    );
}

export default Inventory;
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

@media (min-width: 800px) {
    .inven-showlist { 
        grid-template-columns: repeat(2, 1fr); 
        }
}

@media (min-width: 1200px) {
    .inven-showlist { 
        grid-template-columns: repeat(3, 1fr); 
        }
}

  @media (min-width: 1600px) {
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
` 

function Inventory(props){
    const [inventory,setinventory] = useState([]);
    useEffect(async () => {
        fetch('/inventory/bot/'+props.match.params.bot_id).then(res => res.json().then(data => setinventory(data)))
    },[])
    console.log(inventory)
    const card = inventory.map((inventory) => 

        <Invenlist props={inventory}/>
        ,console.log(inventory)
    );

    return(
        <Styles>
            <div className="inventory-page" >
               <Navbar_member botID = {props.match.params.bot_id} path={"inventory"} />
               <div className="container-fluid">
                    <div className="bot-name-on-page">
                        <h4> Bot name :</h4>
                    </div>
                   <div className="inven-title">
                       <h2 className="p-2 flex-grow-1 bd-highlight" id="inventory-header">Inventories</h2>
                   </div> 
                    <div className="inventory-body">        
                        <Link to={"/bot/"+props.match.params.bot_id+"/add_item"}>
                            <button className="create-inven btn btn-success" type="button">Create</button>
                        </Link>
                        
                        <div className="inven-showlist">
                            {card}
                        </div>
                    
                    </div> 
                </div> 
            </div>
            
        </Styles>
    );
}

export default Inventory;
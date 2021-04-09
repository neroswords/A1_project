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
.container {
    margin-bottom: 2%;
    margin-top: 2%;
    overflow:hidden;
  }

  .inven-title{
    padding: 4px;
    width: 100% ;
    background-color: white;
    border-radius: 0.25rem;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
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
    grid-template-columns: repeat(4, 1fr);
}

@media (min-width: 500px) {
    .inven-showlist { 
        grid-template-columns: repeat(2, 1fr); 
        }
}

@media (min-width: 920px) {
    .inven-showlist { 
        grid-template-columns: repeat(3, 1fr); 
        }
}

  @media (min-width: 1200px) {
    .inven-showlist { 
        grid-template-columns: repeat(4, 1fr); 
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
               <div className="container">
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
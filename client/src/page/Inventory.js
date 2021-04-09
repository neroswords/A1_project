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
.inventory-body {
    margin-left: 2%;
    margin-right: 2%;
    padding: 2%;
    background-color: white;
    width: 100%;
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
    border-radius:1rem;
    padding: 5px 15px;
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
               <div className="inventory-body">
                    <h2 className='' id="inventory-header">Inventories</h2>
                    <Link to={"/bot/"+props.match.params.bot_id+"/add_item"}>
                        <button className="create-inven btn btn-success" type="button">Create</button>
                    </Link>
                    <hr></hr>
                    <div className="inven-showlist">
                        {card}
                    </div>
                    
               </div>  
            </div>
            
        </Styles>
    );
}

export default Inventory;
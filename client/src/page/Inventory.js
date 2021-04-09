import React, {useState, useEffect, useRef } from "react";
import Navbar_member from '../Components/Navbar/navbar_member';
import styled from 'styled-components';
import Invenlist from '../Components/Inventory/Inven_list';
import '../Components/Inventory/Inven.css';

const Styles = styled.div` 
.inventory-page {
    display: flex;
    min-height: 92vh;
}
.inventory-body {
    margin-left: 2%;
    margin-right: 2%;
    padding: 2%;
    background-color: white;
    width: 100%;
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
    );

    return(
        <Styles>
            <div className="inventory-page" >
               <Navbar_member botID = {props.match.params.bot_id} path={"inventory"} />
               <div className="inventory-body">
                    <h2 className='' id="inventory-header">Inventories</h2>
                    <button className="create-invenbtn btn-success" type="button">Create</button>
                    <hr></hr>
                    {card}
                    <hr></hr>
               </div>  
            </div>
            
        </Styles>
    );
}

export default Inventory;
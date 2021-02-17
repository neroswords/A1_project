import React from 'react'
import Navbar_member from '../Components/Navbar/navbar_member';
import styled from 'styled-components';
import Invenlist from '../Components/Inventory/Inven_list';

const Styles = styled.div` 
.inventory-page {
    display: flex;
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
    return(
        <Styles>
            <div className="inventory-page" >
               <Navbar_member botID = {props.match.params.bot_id} path={"inventory"} />
               <div className="inventory-body">
                    <h2 className=''>Inventories</h2>
                    <Invenlist/>
               </div>  
            </div>
            
        </Styles>
    );
}

export default Inventory;
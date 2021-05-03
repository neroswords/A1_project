import React, {useState, useEffect} from 'react'
import Navbar_member from '../Components/Navbar/navbar_member';
import styled from 'styled-components';
import Tablecustomer from '../Components/Table/Tablecustomer';
// import Customer_chat from '../Components/Chat/Customer_chat';
const Styles = styled.div` 
.customer-page {
    display: flex;
    min-height: 92vh;
}
.customer-page .container-fluid {
    padding: 20px 40px;
    width: 100%;
}
.customer-title{
    padding: 4px;
    width: 100% ;
    background-color: white;
    border-radius: 0.25rem;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
    
}

.customer-title h2 {
    font-weight:600;
}
.show-customer{
    min-height: 70vh;
    margin-top: 1%;
    background-color: white;
    padding: 1%;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
    border-radius: 0.25rem;
    /* border: 1px solid #ececec; */
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
function Customer_infomation(props){
    const [name, setName] = useState();
    useEffect(() => {
      fetch('/bot/'+props.match.params.bot_id) .then(response => response.json().then(inf => {
        setName(inf)
    }))
    }, []);
    return(
        <Styles>
            <div className="customer-page">
               <Navbar_member botID = {props.match.params.bot_id} path={"customer_infomation"} />
               <div className="container-fluid">
                    <div className="bot-name-on-page">
                        <h4> Bot name : {name}</h4>
                    </div>
                   <div className="customer-title">
                        <h2 className='p-2 flex-grow-1 bd-highlight' id="customer-header">Customer Infomation</h2>
                    </div>
                    
                    <div className="show-customer">
                        <Tablecustomer botID = {props.match.params.bot_id}/>
                    </div>
               </div> 
            </div>
        </Styles>
    );
}

export default Customer_infomation;
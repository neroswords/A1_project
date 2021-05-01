import React from 'react';
import TableGroup from '../Components/Table/TableGroup';
import Navbar_member from '../Components/Navbar/navbar_member';
import styled from 'styled-components';

const Styles = styled.div` 
.group-page {
    display: flex;
    min-height: 92vh;
}
.container-fluid {
   padding: 40px;
   width: 100%;
   overflow: hidden;
}
.group-title{
    padding: 4px;
    width: 100% ;
    background-color: white;
    border-radius: 0.25rem;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
}

.group-title h2{ 
   font-weight: 600;
}box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);


.showtable-group{
    min-height: 70vh;
    margin-top: 1%;
    background-color: white;
    padding: 1%;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
    border-radius: 0.25rem;
    /* border: 1px solid #ececec; */
}

`

function Group(props){
    const delete_trained =(data)=>{
        // var newdata = []
        // var i = 0
    
        // // var a = []
        // for (i = 0; i < data.length; i++){
        //     newdata.push(data[i].original)
        // }
        // if (data[0]){
        //     fetch('/train_bot/delete/training/'+data[0].original.id, {
        //         method : 'POST',
        //         headers : {
        //             "Access-Control-Allow-Origin": "*",
        //             'Content-Type':'application/json'
        //             },
        //             body : JSON.stringify(newdata),
        //         });
        //         console.log(data)
        //         window.location.reload("bot/"+id+'/trained');
        // }    
    }
    return(
        <Styles>
        <div className="group-page">
            <Navbar_member botID = {props.match.params.bot_id} path={"group"} />
            <div className="container-fluid">
                <div className="group-title container-top d-flex bd-highlight">
                    <h2 className='p-2 flex-grow-1 bd-highlight' id="group-header">Group</h2>
                    {/* <div className="p-2 bd-highlight"><button className="btn btn-danger" type="button">Delete</button></div> */}
                </div>
                <div className="showtable-group">
                    <TableGroup botID = {props.match.params.bot_id} delete_trained={delete_trained}/>
                </div>
            </div>

        </div>
       </Styles>         
        
    );
}

export default Group;
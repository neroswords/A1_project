import React, { useState, useEffect } from "react";
import Table from '../Components/Table/Table';
import Navbar_member from '../Components/Navbar/navbar_member';
import styled from 'styled-components';

const Styles = styled.div` 
.learned-page {
    display: flex;
    min-height: 92vh;
}
.learned-page .container-fluid {
    padding: 20px 40px;
    width: 100%;
    overflow:hidden;
}

.learned-title-page {
    padding: 4px;
    width: 100% ;
    background-color: white;
    border-radius: 0.25rem;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
    /* padding: 0 1%; */
}

.learned-title-page h2{
    font-weight:600;
}

.showtable-learn{
    /* min-height: 70vh; */
    margin-top: 1%;
    background-color: white;
    padding: 5px;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
    border-radius: 0.25rem;
    /* border: 1px solid #ececec; */
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
// const mapStateToProps = (state) =>{
//     return {
//         ichange : state
//     }
// }

function Learned(props){
    const [deleteState,setdeleteState] = useState([]);
    const  [Info,setInfo] = useState([]);
    const [loading,setLoading] = useState(false);
    
    const add_data = (data) =>{
        deleteState.push(data)
        console.log(deleteState)
    }
    const id = (data) =>{
        console.log(id.botID)
    }

    const delete_trained = (data) => {
        // setShowDelete_table(prev => !prev)
        console.log(data)
          var newdata = []
          var i = 0
          for (i = 0; i < data.length; i++){
              newdata.push(data[i].original)
          }
          
          console.log(newdata)
          
          if (data[0]){
              fetch('/train_bot/delete/trained/'+data[0].original.id, {
                  method : 'POST',
                  headers : {
                      "Access-Control-Allow-Origin": "*",
                      'Content-Type':'application/json'
                      },
                      body : JSON.stringify(newdata),
                  });
                  console.log(data)
                  window.location.reload("bot/"+id+'/trained');
          }    
      
    }
    const [name, setName] = useState();
    useEffect(() => {
      fetch('/bot/'+props.match.params.bot_id) .then(response => response.json().then(inf => {
        setName(inf)
        setLoading(true)
    }))
    }, []);
    


    return(
        <Styles>
            {loading ?                    
                    <div className="learned-page">
                    <Navbar_member botID = {props.match.params.bot_id} path={"trained"}  />
                    <div className="container-fluid">
                        <div className="bot-name-on-page">
                            <h4> Bot name : {name}</h4>
                        </div>
                        <div className="learned-title-page d-flex bd-highlight">
                            <h2 className='p-2 flex-grow-1 bd-highlight' id="trained-header">Trained</h2>
                        </div>
                        {/* <hr></hr> */}
                        <div className="showtable-learn">
                            <Table botID={props.match.params.bot_id} delete_trained={delete_trained}/>
                        </div>
                    </div>
                    </div>
                    : <div class="loader"></div>}
        </Styles>
    );

}

export default Learned;
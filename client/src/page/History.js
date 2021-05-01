import React, {useState, useEffect} from 'react'
import Navbar_member from '../Components/Navbar/navbar_member';
import styled from 'styled-components';
import Visualize from "../Components/Graph/Visualize";
import {Link} from "react-router-dom";

const Styles = styled.div` 
.history-page {
    display: flex;
    min-height: 92vh;
}
.container {
    margin-bottom: 2%;
    margin-top: 2%;
    overflow:hidden;
}
.title-history{
    padding: 4px;
    width: 100% ;
    background-color: white;
    border-radius: 0.25rem;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
}
.show-history{
    min-height: 70vh;
    margin-top: 1%;
    background-color: white;
    padding: 1%;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
    border-radius: 0.25rem;
    /* border: 1px solid #ececec; */
}
.CircleRight{
    color: white;
    
}
.MoreInfo{
    color: white;
    margin-left: 30%;
}
.icon{
    color: #E0E0E0 ;
}
`


function History(props) {

    const [history, setHistoryState] = useState([]);

    useEffect(() => {
        fetch('/history/' + props.match.params.bot_id)
          .then(res => res.json().then(data => {
           setHistoryState(data)
            
          }))
    
      }, []);

    return (
        <Styles>
            <div className="history-page">
                <Navbar_member botID={props.match.params.bot_id} path={"history"} />
                <div className="container">
                    <div className="title-history">
                        <h2 className='p-2 flex-grow-1 bd-highlight' id="history-header">History</h2>
                    </div>
                    <div className="row p-3">
                        <div className="small-box bg-info col-4">
                            <div className="inner">
                                <h3>{history.waited}</h3>

                                <p>New Orders</p>
                            </div>
                            <div className="icon">
                                <i className="far fa-shopping-basket"></i>
                            </div>
                            <Link to={'/bot/'+ props.match.params.bot_id +'/history/new'}><a href="#" className="small-box-footer MoreInfo">More info <i class="fas fa-arrow-circle-right CircleRight"></i></a></Link>
                        </div>

                        <div class="col-lg-3 col-6">
                            <div className="small-box bg-success">
                                <div className="inner">
                                    <h3>{history.total}</h3>

                                    <p>Total Order</p>
                                    <br></br>
                                </div>
                                <div className="icon">
                                    <i class="far fa-clipboard-list-check"></i>
                                </div>
                                {/* <Link><a href="#" className="small-box-footer MoreInfo">More info <i class="fas fa-arrow-circle-right CircleRight"></i></a></Link> */}
                            </div>
                        </div>



                    </div>



                    <div className="show-history">
                        <Visualize botID={props.match.params.bot_id}/>
                    </div>
                </div>
            </div>
        </Styles>
    );
}

export default History;
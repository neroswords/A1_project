import React, { useState, useEffect } from 'react'
import Navbar_member from '../Components/Navbar/navbar_member';
import styled from 'styled-components';
import Visualize from "../Components/Graph/Visualize";
import { Link } from "react-router-dom";

const Styles = styled.div` 
.history-page {
    display: flex;
    min-height: 92vh;
}
.container-fluid {
   padding: 20px 40px;
   width: 100%;
   overflow: hidden;
}
.title-history{
    padding: 4px;
    width: 100% ;
    background-color: white;
    border-radius: 0.25rem;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
}

.title-history h2{ 
   font-weight: 600;
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

.widget{
    height: 175px;
    
}

.inner-widget{
    height: 145px;
    padding: 10px;
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


function History(props) {

    const [history, setHistoryState] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        fetch('/history/' + props.match.params.bot_id)
            .then(res => res.json().then(data => {
                setHistoryState(data)

            }))

    }, []);
    const [name, setName] = useState();
    useEffect(() => {
        fetch('/bot/' + props.match.params.bot_id).then(response => response.json().then(inf => {
            setName(inf)
            setLoading(true)
        }))
    }, []);

    return (
        <Styles>
            <div className="history-page">
                <Navbar_member botID={props.match.params.bot_id} path={"history"} />
                <div className="container-fluid">
                    <div className="bot-name-on-page">
                        <h4> Bot name :</h4>
                    </div>
                    <div className="title-history">
                        <h2 className='p-2 flex-grow-1 bd-highlight' id="history-header">Order</h2>
                    </div>

                    <div className="row p-3">
                        <div class="col">
                            <div className="widget small-box bg-info">
                                <div className="inner-widget">
                                    <h3>{history.waited}</h3>
                                    <p>New Orders</p>
                                </div>
                                <div className="icon">
                                    <i className="icon-widget far fa-shopping-basket"></i>
                                </div>
                                <Link to={'/bot/' + props.match.params.bot_id + '/history/new'}><a href="#" className=" MoreInfo">More info <i class="fas fa-arrow-circle-right CircleRight"></i></a></Link>
                            </div>
                        </div>


                        <div class="col">
                            <div className="widget small-box bg-success">
                                <div className="inner-widget">
                                    <h3>{history.total}</h3>
                                    <p>Total Order</p>
                                    <br></br>
                                </div>
                                <div className="icon">
                                    <i class="icon-widget far fa-clipboard-list-check"></i>
                                </div>
                                <Link to={'/bot/' + props.match.params.bot_id + '/history/totalorder'}><a href="#" className=" MoreInfo">More info <i class="fas fa-arrow-circle-right CircleRight"></i></a></Link>
                            </div>
                        </div>

                        <div class="col">
                            <div className="widget small-box bg-warning">
                                <div className="inner-widget">
                                    <h3>{history.tracking}</h3>
                                    <p>Tracking number</p>
                                </div>
                                <div className="icon">
                                    <i class="far fa-truck-moving"></i>
                                </div>
                                <Link to={'/bot/' + props.match.params.bot_id + '/history/tracking'}><a href="#" className=" MoreInfo">More info <i class="fas fa-arrow-circle-right CircleRight"></i></a></Link>
                            </div>
                        </div>
                        <Visualize  botID={props.match.params.bot_id}/>
                    </div>
                </div>
                
            </div>
        </Styles>
    );
}

export default History;
import React from 'react'
import Navbar_member from '../Components/Navbar/navbar_member';
import styled from 'styled-components';
import Visualize from "../Components/Graph/Visualize";

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
`
function History(props) {
    return (
        <Styles>
            <div className="history-page">
                <Navbar_member botID={props.match.params.bot_id} path={"history"} />
                <div className="container">
                    <div className="title-history">
                        <h2 className='p-2 flex-grow-1 bd-highlight' id="history-header">History</h2>
                    </div>
                    <div className="row p-3">
                        <div class="small-box bg-info col-4">
                            <div class="inner">
                                <h3>150</h3>

                                <p>New Orders</p>
                            </div>
                            <div class="icon">
                                <i class="ion ion-bag"></i>
                            </div>
                            <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                        </div>

                        <div class="col-lg-3 col-6">
                            <div class="small-box bg-success">
                                <div class="inner">
                                    <h3>53</h3>

                                    <p>Bounce Rate</p>
                                </div>
                                <div class="icon">
                                    <i class="ion ion-stats-bars"></i>
                                </div>
                                <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                            </div>
                        </div>



                    </div>



                    <div className="show-history">
                        <Visualize />
                    </div>
                </div>
            </div>
        </Styles>
    );
}

export default History;
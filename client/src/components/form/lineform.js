import React from 'react';
import styled from 'styled-components';

const Styles = styled.div`
.container {
    margin-top: 2%;
}


.facebook-card {
    border: 0;
    border-radius: 1rem;
    background-color: #34a853;
    color: white;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
}

.facebook {
    padding : 5%;
}

.facebook p{
    font-weight: bold;
    font-size: 30px;
}
`

export const Lineform = () => (
        <Styles>
            <div className="container">
                 <div className="row my-3">
                    <div className="group facebook-card col-lg-12">
                        <form className="facebook">
                            <div className="row">
                                <p className="col">Connect to Line</p>
                                {/* <i class="fab fa-line"></i> */}
                            </div>
                            <div className="col-lg-12">
                                <label  className="form-label">Channel secret</label>
                                <input type="text" className="form-control" id="inputpagefacebook"/>
                            </div>
                            <div className="col-lg-12 mt-3">
                                <label  className="form-label">Channel access token</label>
                                <input type="text" className="form-control" id="inputbotname"/>
                            </div>
                            <div className="col-lg-12 mt-3">
                                <label  className="form-label">Basic ID</label>
                                <input type="text" className="form-control" id="inputbotname"/>
                            </div>
                        </form>
                    </div>  
                </div>
            </div>
        </Styles>
)

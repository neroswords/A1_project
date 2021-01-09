import React from 'react';
import styled from 'styled-components';

const Styles = styled.div`
.container {
    margin-top: 2%;
}


.facebook-card {
    border: 0;
    border-radius: 1rem;
    background-color: #0078ff;
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

export const Facebookform = () => (
        <Styles>
            <div className="container">
                 <div className="row my-3">
                    <div className="group facebook-card col-lg-12">
                        <form className="facebook">
                            <div className="row">
                                <p className="col">Connect to facebook</p>
                                {/* <i className="col fab fa-facebook"></i> */}
                            </div>
                            <div className="col-lg-12">
                                <label  className="form-label">Page Facebook access token</label>
                                <input type="text" className="form-control" id="inputpagefacebook"/>
                            </div>
                            <div className="col-lg-12 mt-3">
                                <label  className="form-label">Verify token</label>
                                <input type="text" className="form-control" id="inputverity"/>
                            </div>
                        </form>
                    </div>  
                </div>
            </div>
        </Styles>
)

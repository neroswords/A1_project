import React from 'react';
import styled from 'styled-components';

const Styles = styled.div`
  .container {
    font-family: 'Public Sans', sans-serif;
  }

  .card-regis {
    border: 0;
    border-radius: 1rem;
    box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
  }
  
  .card-regis .card-title {
    margin-bottom: 2rem;
    font-size: 2rem;
    text-transform : uppercase;
    font-family: 'Roboto', sans-serif;
  }
  
  .card-regis .card-body {
    margin: 1rem;
  }
  
  .form-floating input {
    border-radius: 1rem;
    height: 2%;
  }

  .title_part p{
      font-weight: bold;
  }

  .form-regis .btn {
    border-radius: 1rem;
    letter-spacing: .1rem;
    font-weight: bold;
    padding: 0.75rem;
    transition: all 0.2s;
    width: 80%;
    align-items: center;
  }

  .btn-login{
      margin-top: 3rem;
      text-align : center;
  }

  .row-2{
    margin-bottom: 2rem;
    margin-top: 1rem;
  }

  
`;

function Create_bot() {
    return (
        <Styles>
              <div className="container">
                    <div className="col-sm-10 col-md-9 col-lg-6 mx-auto">
                      <div className="card card-regis">
                        <div className="card-body">
                          <h5 className="card-title text-center">Create Bot form</h5>
                          <form className="form-regis">
                                <div className="title_part">
                                        <p className="col">Bot infomation</p>
                                        <hr className="col"/>
                                </div>
                                <div className="row row-1">
                                        <div class="form-group  col-lg-6">
                                            <label for="uploadimage">อัพโหลดรูป*</label>
                                            <input type="file" class="form-control-file"  name="image" required/>
                                        </div>
                                        <div className="col-lg-6">
                                            <label  className="form-label">Bot Name</label>
                                            <input type="text" className="form-control" id="inputbotname"/>
                                        </div>
                                </div>
                                <div className="row row-2">
                                        <div class="col-lg-6">
                                            <label for="inputgender" class="form-label">Gender</label>
                                            <select id="inputgender" class="form-select">
                                                <option selected>Choose...</option>
                                                <option>Male</option>
                                                <option>Female</option>
                                            </select>
                                        </div>
                                        <div className="col">
                                            <label for="inputFirstname" className="form-label">Age</label>
                                            <input type="Age" className="form-control" id="inputfirstname" />
                                        </div>
                                </div>
                                <div className="title_part">
                                        <p className="col">Connect platform</p>
                                        <hr className="col"/>
                                </div>                           
                              <div className="btn-login">
                                  <button className="btn btn-success text-uppercase" type="submit">Submit</button>
                              </div>

                          </form>
                          
                        </div>
                      </div>
                    </div>
                    
                </div>
        </Styles>
    );
}

export default Create_bot;
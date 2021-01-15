import React, { useState, useEffect }from 'react';
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

export default function Lineform(props) {
    const [access_token, setAccess_token] = useState('');
    const [channel_secret, setChannel_secret] = useState('');
    const [basic_id, setBasic_id] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();
        const editData = {'access_token':access_token, 
        'channel_secret':channel_secret, 
        'basic_id':basic_id,
        'creator':localStorage.getItem('user_id')}
        fetch('/', {
            method: 'POST',
            headers : {
                "Access-Control-Allow-Origin": "*",
                'Content-Type':'application/json'
            },
            body: JSON.stringify(editData)
        })
    }

    useEffect(() => {
        fetch('/bot/'+props.params.url).then(
            response => response.json()
          ).then(data =>{
            setAccess_token(data.page_facebook_access_token);
            setChannel_secret(data.Channel_secret);
            setBasic_id(data.basic_id);
        })
    }, []);

    return(
            <Styles>
                <div className="container">
                    <div className="row my-3">
                        <div className="group facebook-card col-lg-12">
                            <form className="facebook" onSubmit={ handleSubmit }>
                                <div className="row">
                                    <p className="col">Connect to Line</p>
                                    {/* <i class="fab fa-line"></i> */}
                                </div>
                                <div className="col-lg-12">
                                    <label  className="form-label">Channel secret</label>
                                    <input type="text" value={channel_secret} onChange={e => setChannel_secret(e.target.value)} className="form-control" id="inputpagefacebook"/>
                                </div>
                                <div className="col-lg-12 mt-3">
                                    <label  className="form-label">Channel access token</label>
                                    <input type="text" value={access_token} onChange={e => setAccess_token(e.target.value)} className="form-control" id="inputbotname"/>
                                </div>
                                <div className="col-lg-12 mt-3">
                                    <label  className="form-label">Basic ID</label>
                                    <input type="text" value={basic_id} onChange={e => setBasic_id(e.target.value)} className="form-control" id="inputbotname"/>
                                </div>
                            </form>
                        </div>  
                    </div>
                </div>
            </Styles>
        )   
}

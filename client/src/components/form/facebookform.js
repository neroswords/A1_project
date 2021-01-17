import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import packageJson from '../../../package.json';

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

export default function Facebookform(props) {
    const [access_token, setAccess_token] = useState('');
    const [verify_token, setVerify_token] = useState('');
    console.log(packageJson.proxy)
    const handleSubmit = (event) => {
        event.preventDefault();
        const editData = {access_token, verify_token}
        fetch('/', {
            method: 'POST',
            headers : {
                "Access-Control-Allow-Origin": "*",
                'Content-Type':'application/json'
            },
            body: JSON.stringify(editData)
        })
        // .then( res => res.json())
        // .then(data=>{
        //     localStorage.setItem('access_token', data.access_token);
        //     localStorage.setItem('username', data.username);
        //     localStorage.setItem('user_id', data.user_id);
        //     if (localStorage.getItem("access_token") !== null && localStorage.getItem("access_token")!=="undefined") {
        //       window.location.replace("/")
        //     }else{
        //         alert(data.error);  
        //   }
        // }).catch(error => console.log(error));
    }

    useEffect(() => {
        fetch('/bot/'+localStorage.getItem('user_id')).then(
            response => response.json()
          ).then(data =>{
            setAccess_token(data.page_facebook_access_token);
            setVerify_token(data.VERIFY_TOKEN);
        })
    }, []);

    return (
        <Styles>
            <div className="container">
                 <div className="row my-3">
                    <div className="group facebook-card col-lg-12">
                        <form className="facebook" onSubmit={ handleSubmit }>
                            <div className="row">
                                <p className="col">Connect to facebook</p>
                                {/* <i className="col fab fa-facebook"></i> */}
                            </div>
                            <p>{packageJson.proxy}bot/webhook/{props.props.bot_id}/facebook</p>
                            <div className="col-lg-12">
                                <label  className="form-label">Page Facebook access token</label>
                                <input type="text" value={access_token} onChange={e => setAccess_token(e.target.value)} className="form-control" id="inputpagefacebook" />
                            </div>
                            <div className="col-lg-12 mt-3">
                                <label  className="form-label">Verify token</label>
                                <input type="text" value={ verify_token } onChange={e => setVerify_token(e.target.value)} className="form-control" id="inputverity" />
                            </div>
                            <button type='submit'>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </Styles>
    )
}

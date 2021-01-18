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
    background-color: #fff;
    color: white;
    // box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
    border: 5px solid #0078ff;
}

.facebook {
    padding : 5%;
}

.facebook p{
    font-weight: bold;
    font-size: 23px;
    color: black;
}


.link p{
    font-size: 11px;
    color: black;
}

.link i{
    color: #0078ff;
}

.copy-clipboard {
    color: #34a853;
    position: absolute;
    top: 275px;
    right: 70px;
}

.link button{
    background: white;
    padding: 5px 12px;
    margin-top: 15px;
    font-size: 19px;
    border-radius: 25px;
    border: 3px solid #0078ff;
    transition: 0.5s;
    margin: 10px;
} 

.facebook .input-Box label{
    font-size: 18px;
    color: black;
}

.facebook .input-Box input{
    box-shadow: none;
    outline: none;
    border: none;
    border-bottom: 2px solid #000;
    outline: none;
    margit-bottom: 30px;
    margin-top: 1px;
    font-size: 16px;
    padding: 5px 0;
}

#container-button{
    text-align: center;
}

#container-button .submit{
    padding: 5px 12px;
    margin-top: 15px;
    font-size: 19px;
    border-radius: 25px;
    border: 3px solid #0078ff;
    transition: 0.5s;
    margin: 10px;
    background-color: #0078ff;
    color: #fff;
}

#container-button .submit:hover{
    color: #000;
}

#container-button .cancle{
    padding: 5px 12px;
    margin-top: 15px;
    font-size: 19px;
    border-radius: 25px;
    border: 3px solid #CD5C5C;
    transition: 0.5s;
    margin: 10px;
    background-color: #CD5C5C;
    color: #fff;
}

#container-button .cancle:hover{
    color: #000;
}


`;

export default function Facebookform(props) {
    const [access_token, setAccess_token] = useState('');
    const [verify_token, setVerify_token] = useState('');
    const [webhook, setWebhook] = useState(packageJson.proxy+'bot/webhook/'+props.props.bot_id+'/facebook')

    const handleSubmit = (event) => {
        event.preventDefault();
        const editData = {access_token, verify_token,'platform':'facebook'}
        fetch('/bot/'+props.props.bot_id+'/connect', {
            method: 'POST',
            headers : {
                "Access-Control-Allow-Origin": "*",
                'Content-Type':'application/json'
            },
            body: JSON.stringify(editData)
        }).then(response => response.json().then(data => alert(data.message)))
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

    // useEffect(() => {
    //     fetch('/bot/'+localStorage.getItem('user_id')).then(
    //         response => response.json()
    //       ).then(data =>{
    //         setAccess_token(data.page_facebook_access_token);
    //         setVerify_token(data.VERIFY_TOKEN);
    //     })
    // }, []);

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
                            <div className="link">
                                <p>{packageJson.proxy}bot/webhook/{props.props.bot_id}/facebook</p>
                                <button className="copy-clipboard"><i className="fas fa-copy fa-xs"></i></button>
                            </div>
                            <div className="input-Box">
                            <div className="col-lg-12">
                                <label  className="form-label">Page Facebook access token</label>
                                <input type="text" value={access_token} onChange={e => setAccess_token(e.target.value)} className="form-control" id="inputpagefacebook" />
                            </div>
                            <div className="col-lg-12 mt-3">
                                <label  className="form-label">Verify token</label>
                                <input type="text" value={ verify_token } onChange={e => setVerify_token(e.target.value)} className="form-control" id="inputverity" />
                            </div>
                            </div>
                            <div id="container-button">
                                <button className="submit" type='submit'>Submit</button>
                                <button className="cancle" type='button'>Cancle</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Styles>
    )
}

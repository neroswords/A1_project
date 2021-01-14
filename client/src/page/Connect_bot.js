import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
// import FacebookForm from '../components/form/facebookform';
// import LineForm from '../components/form/lineform';

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


export default function Connect(props){
    if(props.match.params.platform == 'line'){
        return(
            Lineform(props.match.params.bot_id)
        )
    }
    else if(props.match.params.platform == 'facebook'){
        return(
            Facebookform(props.match.params.bot_id)
        )
    }

    
}


function Facebookform(props) {
    const [access_token, setAccess_token] = useState('');
    const [verify_token, setVerify_token] = useState('');
    console.log(props)
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
        fetch('/bot/'+props.params.url).then(
            response => response.json()
          ).then(data =>{
            setAccess_token(data.page_facebook_access_token);
            setVerify_token(data.VERIFY_TOKEN);
        })
    }, []);

        return (<Styles>
            <div className="container">
                 <div className="row my-3">
                    <div className="group facebook-card col-lg-12">
                        <form className="facebook" onSubmit={ handleSubmit }>
                            <div className="row">
                                <p className="col">Connect to facebook</p>
                                {/* <i className="col fab fa-facebook"></i> */}
                            </div>
                            <div className="col-lg-12">
                                <label  className="form-label">Page Facebook access token</label>
                                <input type="text" value={access_token} onChange={e => setAccess_token(e.target.value)} className="form-control" id="inputpagefacebook"/>
                            </div>
                            <div className="col-lg-12 mt-3">
                                <label  className="form-label">Verify token</label>
                                <input type="text" value={ verify_token } onChange={e => setVerify_token(e.target.value)} className="form-control" id="inputverity"/>
                            </div>
                            <input type='submit'>Submit</input>
                        </form>
                    </div>  
                </div>
            </div>
        </Styles>
        )
}

function Lineform(props) {
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
        fetch('/bot/'+localStorage.getItem('user_id')).then(
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

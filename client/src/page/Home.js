import React,{ useState } from 'react';
import {Button, Collapse } from 'react-bootstrap';
import { CardList } from '../Components/Landing/cardList';
import { Mainpage } from '../Components/Landing/Mainpage';
import { Endpage }  from '../Components/Landing/endpage';

import Footer from '../Components/Footer/footer';

function Home(){
    return(
        
        <div className="page-container"> 
                <div className="conatainer">
                    <Mainpage />
                    <CardList/>
                    <Endpage/>
                    {/* <img src={'/images/profile/cats.jpg'}></img>
                    <img src={'/images/logo.png'}></img> */}
                </div>
            <Footer />
        </div>
        
    )
}

export default Home;
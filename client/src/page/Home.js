import React,{ useState } from 'react';
import {Button, Collapse } from 'react-bootstrap';
import { CardList } from '../Components/Landing/cardList';
import { Mainpage } from '../Components/Landing/Mainpage';
import { Endpage }  from '../Components/Landing/endpage';

<<<<<<< HEAD
import Footer from '../components/Footer/footer';
=======
import Footer from '../Components/Footer/footer';
>>>>>>> 93f97da5428f94557a4106c63f7c36a600fd853f

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
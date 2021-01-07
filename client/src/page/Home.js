import React from 'react'

import { CardList } from '../components/Landing/cardList';
import { Mainpage } from '../components/Landing/Mainpage';
import { Endpage }  from '../components/Landing/endpage';

import Footer from '../components/footer/footer';

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
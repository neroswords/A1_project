import React from 'react';
import styled from 'styled-components';
import { Container, Jumbotron as Jumbo } from 'react-bootstrap';

const Styles = styled.div`
.jumbo {
  background: url(${process.env.PUBLIC_URL +'/images/Bg.png'});
  background-size: cover;
  position: relative;
}
`;

export const Firstpage = () => (
    <Styles>
     <Jumbo className="jumbo">
      <div className="main-text">
        <div>
          <h1>A1 Chatbot</h1>
          <p>Lorem ipsum dolor sit ametOmnis non<br/>  dolorem facilis unde blanditiis tempore,<br/> provident rem ratione quae ipsa fugiat perferendis </p>
          <p>Lorem ipsum dolor sit ametOmnis non<br/>  dolorem facilis unde blanditiis tempore,<br/> provident rem ratione quae ipsa fugiat perferendis </p>
          <p>Lorem ipsum dolor sit ametOmnis non<br/>  dolorem facilis unde blanditiis tempore,<br/> provident rem ratione quae ipsa fugiat perferendis </p>
          <p>Lorem ipsum dolor sit ametOmnis non<br/>  dolorem facilis unde blanditiis tempore,<br/> provident rem ratione quae ipsa fugiat perferendis </p>
          <p>Lorem ipsum dolor sit ametOmnis non<br/>  dolorem facilis unde blanditiis tempore,<br/> provident rem ratione quae ipsa fugiat perferendis </p>

        </div>
      </div>
    </Jumbo>
    </Styles>
)
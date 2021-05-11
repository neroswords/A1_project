import React, { useState } from "react";
import styled from 'styled-components';
import Navbar_member from '../Components/Navbar/navbar_member';
import GroupList from "../Components/Form/GroupList";

const Styles = styled.div`

.container-GroupForm .IconTextImage{
  text-align: center;
}
.IconTextImage button{
  margin: 20px;
  margin-top: 45px;
  border-radius: 10px;
  
}
.ButTextIcon{
    border: 3px solid #fca311 ;
    font-size: 15px;
    background-color: #fca311; 
}
.ButImageIcon{
    border: 3px solid #4A7AFF;
    font-size: 15px;
    background-color: #4A7AFF;
}
.ButTextIcon i{
    color: #fff;
    margin-top: 3px;
}
.ButImageIcon i{
    color: #fff;
    margin-top: 3px;
}

.ButTextIcon i:hover{
   color: #000;
}
.ButImageIcon i:hover{
   color: #000;
}

.title-group{
  margin: 10px 10px;
  margin-left: 5%;
    padding: 4px;
    width: 90% ;
    background-color: white;
    border-radius: 0.25rem;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
}

.todo-app {
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 510px;
  min-height: 550px;
  background-color: #fff;
  text-align: center;
  margin: 25px auto;
  border-radius: 2rem;
  padding-bottom: 32px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);

}

.complete {
  text-decoration: line-through;
  opacity: 0.4;
}

.todo-form {
  margin-bottom: 50px;
  
}

.todo-input {
  padding: 14px 32px 14px 16px;
  border-radius: 15px 0 0 15px;
  border: 2px solid #fca311;
  outline: none;
  width: 320px;
  background: transparent;
  color: #000;
}
.todo-input-img{
  padding: 14px 32px 14px 16px;
  border-radius: 15px 0 0 15px;
  border: 2px solid #4A7AFF;
  outline: none;
  width: 320px;
  background: transparent;
  color: #000;
  margin-bottom: 9%;
}

.todo-input::placeholder {
  color: #ADADAD;
}

.todo-button {
  padding: 16px;
  border: none;
  border-radius: 0 15px 15px 0;
  cursor: pointer;
  outline: none;
  /* background: linear-gradient(
    90deg,
    rgba(93, 12, 255, 1) 0%,
    rgba(155, 0, 250, 1) 100%
  ); */

  background: #fca311;
  color: #fff;
  text-transform: capitalize;
}

.todo-button-img{
  padding: 19px;
  border: none;
  border-radius: 0 15px 15px 0;
  cursor: pointer;
  outline: none;
  /* background: linear-gradient(
    90deg,
    rgba(93, 12, 255, 1) 0%,
    rgba(155, 0, 250, 1) 100%
  ); */

  background: #4A7AFF;
  color: #fff;
  text-transform: capitalize;
}

.todo-input.edit {
  border: 2px solid #149fff;
}

.todo-button.edit {
  /* background: linear-gradient(
    90deg,
    rgba(20, 159, 255, 1) 0%,
    rgba(17, 122, 255, 1) 100%
  ); */

  background: #149fff;
  padding: 16px 22px;
}

.todo-container {
  display: flex;
  flex-direction: row;
  position: relative;
}

.todo-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 4px auto;
  color: #000;
  background: #fff;
  box-shadow: 0px 1px 2px rgba(0, 0.2, 0, 0.2);
  padding: 16px;
  border-radius: 5px;
  width: 75%;
  overflow-x: auto;
  text-overflow: ellipsis;
}

.todo-row:nth-child(2n + 1) {
  /* background: linear-gradient(
    90deg,
    rgba(93, 12, 255, 1) 0%,
    rgba(155, 0, 250, 1) 100%
  ); */
  /* background: #fca311; */
}

.icons {
  display: flex;
  align-items: center;
  font-size: 24px;
  cursor: pointer;
}

.delete-icon {
  margin-right: 5px;
  color: red;
}

.edit-icon {
  color: green;
}

.group-page {
    display: flex;
    min-height: 92vh;
}
.container-fluid {
   padding: 40px;
   width: 100%;
   overflow: hidden;
}
.group-title{
    padding: 4px;
    width: 100% ;
    background-color: white;
    border-radius: 0.25rem;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
}

.group-title h2{ 
   font-weight: 600;
  }

.showtable-group{
    min-height: 70vh;
    margin-top: 1%;
    background-color: white;
    padding: 1%;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
    border-radius: 0.25rem;
    /* border: 1px solid #ececec; */
}

.group-name-on-page {
    
    /* width: 150px; */
    /* max-width: 800px; */
    width: max-content;
    border-radius: 1rem;
  }
/* .IconTextImage .group-name-on-page{
    posi

} */

  .group-name-on-page h4{
    position: relative;
    right: 0;
    font-size: 14px;
    font-weight: 600;
    /* width: 500px; */
    /* max-width: 500px; */
    color: #fff;
    /* border: 2px solid #fca311; */
    background-color : #fca311;
    border-radius: 1rem;
    padding: 5px 20px; 
  }

  #container-button .submit{
    padding: 5px 30px;
    font-size: 19px;
    border-radius: 25px;
    border: 3px solid #34a853;
    transition: 0.5s;
    margin-left: 46%;
    background-color: #34a853;
    color: #fff;
}

  #container-button .submit:hover{
      color: #000;
  }


`
function DragText(props) {
  console.log(props)

  return (
    <div>
      <Styles>
        <div className="group-page">
          <Navbar_member botID={props.match.params.bot_id} path={"group"} />

          <div className="container-fluid">
            
            <div className="group-title container-top d-flex bd-highlight">
              <h2 className='p-2 flex-grow-1 bd-highlight' id="group-header">Group</h2>
            </div>
            
            <GroupList groupID={props.match.params.group_id} botID={props.match.params.bot_id} />
          </div>

        </div>

      </Styles>
    </div>
  )
}

export default DragText;
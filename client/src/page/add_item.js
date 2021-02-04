  
import React from 'react';
import styled from 'styled-components';
import {withRouter, Redirect} from 'react-router-dom'

const Styles = styled.div`
  .container {
    font-family: 'Public Sans', sans-serif;
    margin-top: 2%;
  }
  .card-bot{
    border: 0;
    border-radius: 1rem;
    box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
  }
  
  .card-bot .card-title {
    margin-bottom: 2rem;
    font-size: 2rem;
    text-transform : uppercase;
    font-family: 'Roboto', sans-serif;
  }
  
  .card-bot .card-body {
    margin: 1rem;
  }
  
  .title_part p{
      font-weight: bold;
      margin-top: 9%;
  }
  .title_part  .line{
    border: 10;
    height: 4px;
    background-color: #fca311;
    width: 200px;
    margin-bottom: 5%;
  }
  .form-bot .btn {
    border-radius: 1rem;
    letter-spacing: .1rem;
    font-weight: bold;
    padding: 0.75rem;
    transition: all 0.2s;
    width: 80%;
    align-items: center;
    background-color: #;
  }
  .btn-createbot{
      margin-top: 3rem;
      text-align : center;
  }
  .form-bot input {
    border-radius: 0.5rem;
  }
  .form-bot select{
    border-radius: 0.5rem;
  }
  .row-2{
    margin-bottom: 2rem;
    margin-top: 1rem;
  }
  input[type=file]::-webkit-file-upload-button {
    border: 2px;
    padding: 0.5rem ;
    border-radius: 0.75rem;
    background-color: #fca311;
    transition: 1s;
    color: white;
    width: 40%;
    
  }
  
  input[type="file"] {
    max-width: 100%;
  }
  .showimage {
    margin-bottom: 1%;
    text-align: center;
  }
  .showimage img{
    border: 1px solid #ddd;
    border-radius: 50%;
    width: 80%;
    text-align: center;
  }
  
  .vertical-line {
    border-left: 1px solid black;
  }
  .btn-facebook {
    background-color: #0078ff;
  }
  .btn-line {
    background-color: #34a853 ;
  }
`;
let file = {}
export default class Add_item extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      item_name: '',
      type: '',
      amount: '',
      bot_id:'',
      imageURL: '',
      Image: '',
      des:'',
      imagesPreviewUrl: []
    };
    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  
 
  handleChange (evt) {
    this.setState({ [evt.target.name]: evt.target.value });
    console.log(this.state)
  }
  
  _handleImageChange(e) {
    e.preventDefault();


    let i
    for (i = 0; i < e.target.files.length; i++)

      {
        let reader = new FileReader();
        file[i] = this.uploadInput.files[i]
        if (!file){
          return
        }
        reader.onloadend = () => {
          this.setState({
            file: file[i],
            imagesPreviewUrl: [...this.state.imagesPreviewUrl, reader.result]
            });      
        }
        console.log(reader.result)
        reader.readAsDataURL(file[i])

      }

    
  }
  handleUploadImage(ev) {
    ev.preventDefault();
    
    console.log(file)
    var i
    const data = new FormData();
    for ( i = 0; i < this.uploadInput.files.length; i++)
    {
    data.append('file'+[i], this.uploadInput.files[i]);
    }
    data.append('item_name',this.item_name.value);
    data.append('type' ,this.type.value);
    data.append('amount' ,this.amount.value);
    data.append('creator' , localStorage.getItem('user_id'))
    data.append('Image' , this.state.Image)
    data.append('des' ,this.des.value);
    fetch('/bot/'+this.props.match.params.bot_id+'/additem', {
      method: 'POST',
      // headers : {
      //   "Access-Control-Allow-Origin": "*",
      //   //'Content-Type':'application/json'
      // },
      //body : JSON.stringify(form),
      body: data,
    }).then((response) => {
      response.json().then((body) => {
        this.setState({ imageURL: `/${body.file}` });
        this.setState({ bot_id : data.id})
        this.setState({ redirect: true }) 
      });
      console.log("DDD")
    });
  
  }
    //  componentDidMount ()  {
    // fetch('/bot/'+this.props.match.params.bot_id+'/edit').then((response) => {
    //     response.json().then((data) => {
    //       this.setState({ bot_name: data[0].bot_name });
    //       this.setState({ gender : data[0].gender});
    //       this.setState({ age: data[0].age }) ;
    //       this.setState({ Image: data[0].Img }); 
    //     });
    //   });
        
    //     }
      
    render() {
    const { redirect,bot_id } = this.state;
    if (redirect) {
      return <Redirect to={"/bot_list/"+ localStorage.getItem('user_id')} />
    }
    else {
      let {imagePreviewUrl} = this.state;
      let $imagePreview = null;
      if (imagePreviewUrl) {
        
        $imagePreview = (<img src={imagePreviewUrl} />);
      }
      return(
        <Styles>
          
              <div className="container">
                    <div className="col-sm-10 col-md-9 col-lg-6 mx-auto">
                      <div className="card card-bot">
                        <div className="card-body">
                          <h5 className="card-title text-center">Create Bot form</h5>
                          <form className="form-bot" onSubmit={this.handleUploadImage}>
                                <div className="title_part">
                                        <p className="col">Bot infomation</p>
                                        <div className="line"></div>
                                </div>
                                <div className="row">
                                        <div className="group col-lg-6">
                                          {/* <div className="showimage col-lg-8">
                                          { imagePreviewUrl ?   $imagePreview :<img src={'/images/bot/bot_pic/Avatar.jpg'}/>}            
                                          </div> */}
                                          <div className="showimage col-lg-8">
                                          {this.state.imagesPreviewUrl.map((imagesPreviewUrl) => {
                                          return <img key={imagesPreviewUrl} alt='previewImg' src={imagesPreviewUrl}  />
                                                })}
        
                                          </div> 
                                          <div className="mt-3">                                           
                                              <label for="uploadimage">Upload Proflie</label>
                                              <input  ref={(ref) => { this.uploadInput = ref; }} onChange={(e)=>this._handleImageChange(e)} type="file" multiple />
                                            </div>
                                        </div>  
                                        
                                        <div className=" group col-lg-6">
                                            <div className="">
                                              <label  className="form-label">item name</label>
                                              <input type="text"  name="item_name" value = {this.state.item_name}  ref={(ref) => { this.item_name = ref; }} onChange={this.handleChange} className="form-control" id="inputbotname"/>
                                            </div>
                                            <div class="mt-3">
                                              <label for="inputgender" class="form-label">type</label>
                                              <select id="inputgender" name="type" value = {this.state.type}  ref={(ref) => { this.type = ref; }} onChange={this.handleChange} class="form-select">
                                                  <option selected>Choose...</option>
                                                  <option>Male </option>
                                                  <option>Female</option>
                                              </select>
                                            </div>
                                            <div className="mt-3">
                                                <label for="inputFirstname" className="form-label">amount</label>
                                                <input type="integer" name="amount" className="form-control" id="inputfirstname" value = {this.state.amount}   ref={(ref) => { this.amount = ref; }} onChange={this.handleChange} />
                                            </div>
                                            <div className="mt-3">
                                                <label for="inputFirstname" className="form-label">Desciption</label>
                                                <input type="integer" name="des" className="form-control" id="inputfirstname" value = {this.state.des}   ref={(ref) => { this.des = ref; }} onChange={this.handleChange} />
                                            </div>
                                        </div>
                                </div>
                                <div className="row row-2">
                                        
                                </div>
                                {/* <div className="title_part">
                                        <p className="col ">Connect platform</p>
                                        <div className="line"></div>
                                </div>
                                <div className="connect_platform">
                                  <div className="row col-lg-12">
                                      <div className="col-lg-6">
                                          <button className="btn btn-primary text-uppercase" onClick={this.handlefacebookChange} type="">facebook</button>
                                      </div>
                                      <div className="col-lg-6">
                                          <button className="btn btn-success btn-line text-uppercase" onClick={this.handlelineChange} type="">line</button>
                                      </div>
                                  </div>
                                </div> */}

                            {/* {this.renderSwitch(this.state.platform)} */}
                            {/* <Lineform />                                 */}

                              <div className="btn-createbot">
                                  <button className="btn btn-success text-uppercase" onClick={this.handleUploadImage} type="submit">Create ChatBot</button>
                              </div>


                          </form>
                          
                        </div>
                      </div>
                    </div>
                    
                </div>
        </Styles>
      )
    }
}
}

 
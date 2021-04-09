
import React from 'react';
import styled from 'styled-components';
import { withRouter, Redirect } from 'react-router-dom'
// import { Multiselect } from 'multiselect-react-dropdown';
import 'react-widgets/dist/css/react-widgets.css';
import { Multiselect } from 'react-widgets' 

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
  
  .title_addinv p{
      font-weight: bold;
      margin-top: 5%;
  }

  .line-inv{
    border: 10;
    height: 4px;
    background-color: black;
    width: 200px;
    margin-bottom: 3%;
  }

  .form-additem input{
    justify-content: space-between;
  }
  
  .form-additem .btn {
    border-radius: 1rem;
    letter-spacing: .1rem;
    font-weight: bold;
    padding: 0.75rem;
    transition: all 0.2s;
    width: 80%;
    align-items: center;
    /* background-color: #; */
  }
  .btn-submitinv{
      margin-top: 3rem;
      text-align : center;
  }
  .form-mt-2 input {
    border-radius: 0.5rem;
  }
  .form-mt-2 select{
    border-radius: 0.5rem;
  }
  .row-2{
    margin-bottom: 2rem;
    margin-top: 1rem;
  }

  input[type=file]::-webkit-file-upload-button {
    /* border: 2px;
    padding: 0.5rem ;
    border-radius: 0.75rem;
    background-color: #fca311;
    transition: 1s;
    color: white;
    width: 40%;
    margin-top: 30%; */
    margin-top: 10%;
    margin-left: -1%;
    justify-content:center;
    position: absolute;
    padding: 10px 20px;
    background-color: #fca311;
    border: none;
    border-radius: 0.75rem;
    color: white;
    transition: 100ms ease-out;
    cursor: pointer;
  }
  
  input[type="file"] {
    max-width: 80%;
    margin-top: 5%;
  }

  .showimg-newinv{
    text-align: center;
    display: grid;
    /* grid-template-columns: repeat(3, 1fr); */
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 10px;
    margin-bottom: 1%;
  }

  .showimg-newinv img{
    border: 1px solid #ddd;
    border-radius: 0.75rem;
    height: 150px;
    width: 150px;
    object-fit: cover;
  }
  
  /* .showimg-newinv img:hover{
    z-index: 2;
    width:100%
    -webkit-transition: all 200ms ease-in;
    -webkit-transform: scale(1.5);
    -ms-transition: all 200ms ease-in;
    -ms-transform: scale(1.5);   
    -moz-transition: all 200ms ease-in;
    -moz-transform: scale(1.5);
    transition: all 200ms ease-in;
    transform: scale(1.2);
  } */

  .upload-newinv{
    /* display:flex; */
    
    background-color: #feecd1;
    border: 2px dashed #fca311;
    border-radius : 0.75rem;
    text-align:center;
    width: 150px;
    height: 150px;
    
  }

`;
let file = {}
export default class Product_edit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      item_name: '',
      type: '',
      amount: '',
      bot_id: '',
      imageURL: '',
      Image: '',
      des: '',
      imagesPreviewUrl: [],
      options: ["d1","2"],
      value: [],
      price: '',
      url_preview: [],
    };
    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.Onend = this.Onend.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.OnDeletepic = this.OnDeletepic.bind(this);
    
  }

  handleCreate(name) {
    let { options, value } = this.state;


 
    this.setState({
      value: [...value, name],  // select new option
      options: [...options, name] // add new option to our dataset
    })

  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });

  }
  OnDeletepic = (e) => {
    console.log(e)
}



  _handleImageChange(e) {
    e.preventDefault();

    let i
    for (i = 0; i < e.target.files.length; i++) {
      let reader = new FileReader();
      file[i] = this.uploadInput.files[i]
      if (!file) {
        return
      }
      reader.onloadend = () => {
        this.setState({
          file: file[i],
          imagesPreviewUrl: [...this.state.imagesPreviewUrl, reader.result]
        });
      }
      reader.readAsDataURL(file[i])
    }


  }
  handleUploadImage(ev) {
    ev.preventDefault();


    var i
    const data = new FormData();
    var file = []
    for (i = 0; i < this.uploadInput.files.length; i++) {
      
      // file.push(this.uploadInput.files[i])
      
      data.append('file' + [i], this.uploadInput.files[i]);
    }


    // data.append('file', file);
    data.append('item_name', this.item_name.value);
    data.append('type', JSON.stringify(this.state.value));
    data.append('amount', this.amount.value);
    data.append('creator', localStorage.getItem('user_id'))
    console.log(this.state.Image)
    data.append('Image', this.state.Image)
    data.append('des', this.des.value);
    data.append('price', this.price.value);
    fetch('/inventory/'+this.props.match.params.bot_id+'/product_edit/'+this.props.match.params.product_id, {
      method: 'POST',
      // headers : {
      //   "Access-Control-Allow-Origin": "*",
      //   'Content-Type':'application/json'
      // },
      // body : JSON.stringify(json5),
      body : data
    }).then((response) => {
      response.json().then((body) => {
        this.setState({ imageURL: `/${body.file}` });
        this.setState({ bot_id: data.id })
        this.setState({ redirect: true })
      });
    });

  }
    componentDidMount ()  {
    //  var a = []
    //  var unique = []
    //   fetch('/bot/'+this.props.match.params.bot_id+'/getitem').then((response) => {
    //   response.json().then((data) => {console.log(data) 
    //     var i = 0
    //     for(i = 0 ;i<data.length;i++){
    //       a.push(...data[i].type)
    //       unique = [...new Set(a)];
    //   }
    //   this.setState ({ options : unique})
    // });
    // });
    // console.log('/inventory/'+this.props.match.params.bot_id+'/product_edit/'+this.props.match.params.product_id)
    fetch('/inventory/'+this.props.match.params.bot_id+'/product_edit/'+this.props.match.params.product_id).then((response) => {
        response.json().then((data) => {
          this.setState({ item_name: data.item_name });
          this.setState({ value: data.type });
          this.setState({ amount: data.amount });
          this.setState({ url_preview: data.img });
          this.setState({ Image: data.img });
          this.setState({ des: data.des });
          this.setState({ price: data.price });
          console.log(this.state.Image)
        });
        
      });
    
        }
    

      

  render() {
    const { redirect, bot_id } = this.state;

    if (redirect) {
      return <Redirect to={"/bot/" + this.props.match.params.bot_id+"/inventory"} />
    }
    else {
      let { imagePreviewUrl } = this.state;
      
      let $imagePreview = null;
      if (imagePreviewUrl) {

        $imagePreview = (<img src={"imagePreviewUrl"} />);

      }
      return (
        <Styles>
          <div className="container">
            <div className="col-sm-10 col-md-9 col-lg-7 mx-auto">
              <div className="card card-bot">
                <div className="card-body">
                  <h5 className="card-title text-center mt-3 mb-4">Create New Item</h5>
                  <form className="form-additem" onSubmit={this.handleUploadImage}>
                   <div className="title_addinv">
                          <p className="col">Upload image</p>
                          <div className="line-inv"></div>
                    </div> 
                    <div className="showimg-newinv form-row d-flex justify-content-between">
                          <div className="col showimg-newinv">
                            <div className="col upload-newinv">
                                <input ref={(ref) => { this.uploadInput = ref; }} onChange={(e) => this._handleImageChange(e)} type="file" multiple />
                            </div>
                              {this.state.url_preview.map((url_preview) => {
                    
                                return [<img key={url_preview} alt='previewImg' src={"/images/bucket/"+url_preview} /> ]
                              })}
                                {this.state.imagesPreviewUrl.map((imagesPreviewUrl) => {
                                   
                                    return <img key={imagesPreviewUrl} alt='previewImg' src={imagesPreviewUrl} />
                                })}
                          </div>  
                    </div>  
                    
                          
                          <div className="title_addinv">
                            <p className="col">Item descriptions</p>
                            <div className="line-inv"></div>
                          </div>
                          <div className="row">
                              <div className="col">
                                <label className="form-label">Item name</label>
                                <input type="text" name="item_name" value={this.state.item_name} ref={(ref) => { this.item_name = ref; }} onChange={this.handleChange} className="form-control"required />
                              </div>                        
                              <div className="col">
                                <label className="form-label">Price</label>
                                <input type="text" name="price" value={this.state.price} ref={(ref) => { this.price = ref; }} onChange={this.handleChange} className="form-control"required />
                              </div>
                          </div>
                          {/* <div class="mt-3"  onKeyDown ={((e) => this.Onend(e))}> */}
                          <div className="row">
                            <div class="col mt-2"  >
                              <label for="inputtype" class="form-label" required>Type</label>
                              <Multiselect
                                data={this.state.options}
                                value={this.state.value}
                                allowCreate="onFilter"
                                onCreate={name => this.handleCreate(name)}
                                onChange={value => this.setState({ value })}
                                textField="name"
                              />
                              
                              
                            </div>
                            <div className="col mt-2">
                              <label for="inputAmout" className="form-label" required>Amount</label>
                              <input type="integer" name="amount" className="form-control" id="inputfirstname" value={this.state.amount} ref={(ref) => { this.amount = ref; }} onChange={this.handleChange} />
                            </div>
                         </div> 
                          <div className="mt-2">
                            <label for="inputDesciption" className="form-label">Desciption</label>
                            <textarea type="integer" name="des" className="form-control" id="inputfirstname" rows="4" value={this.state.des} ref={(ref) => { this.des = ref; }} onChange={this.handleChange}> </textarea>
                          </div>
                    
                    <hr className="mt-5"></hr>
                    <div className="btn-submitinv">
                      <button className="btn btn-success text-uppercase" onClick={this.handleUploadImage} type="submit">Submit</button>
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


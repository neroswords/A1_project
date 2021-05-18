import React, { useState, useEffect, useRef } from 'react';
import { MDBNotification, MDBContainer } from "mdbreact";


function GroupForm(props) {
    console.log(props)
    const [input, setInput] = useState('');
    const [file, setFile] = useState();
    const [errorState, setErrorState] = useState(false);
    const [imgState, setImgState] = useState(false);
    // const [upload, setUpload] = useState();
    const [panel, setpanel] = useState(true);

    const textPanel = () => { setpanel(true) }
    const filePanel = () => { setpanel(false) }

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const handleChange = e => {
        setInput(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();

        if(input == ''){
            setErrorState(true)
        }
        else{
            setErrorState(false)
            props.onSubmit({
            id: Math.floor(Math.random() * 10000),
            text: input,
        });
            setInput('');
        }
        

        
    };

    const _handleImageChange = (e) =>{
        setImgState(false)
        console.log(e)
        if (e.target.files[0].type != "image/jpeg" && e.target.files[0].type != "image/png" ){
            setImgState(true)
        }
        else{
            setFile(e.target.files[0])
        }
        
    }


    const insertImage = (e) => {
        setImgState(false)
        e.preventDefault();

        console.log(file);
        if(file == null){
            setImgState(true)
        }
        else{
            setImgState(false)
            props.onSubmit({
            
            id: Math.floor(Math.random() * 10000),
            text: file.name,
            file: file,
            // upload: upload
            
        });
        setFile();
        }
        

    }

    return (
        <div>
            { errorState &&  
            <div className="errorstate">

                              
                                  <MDBNotification
                                  style={{
                                    // width: "auto",
                                    position: "absolute",
                                    // top: "10px",
                                    // left: "500px",
                                    zIndex: 9999
                                  }}
                                  bodyClassName="p-2 font-weight-bold white-text "
                                  className="stylish-color-dark position-absolute top-0 start-50 translate-middle-x"
                                  closeClassName="blue-grey-text"
                                  fade
                                  icon="bell"
                                  iconClassName="text-danger"
                                  message="Please input group text"
                                  show
                                  
                                  title="Error"
                                  titleClassName="elegant-color-dark white-text"
                    
                                  />
                                </div>

                                }

            { imgState &&  
            <div className="errorstate">

                              
                                  <MDBNotification
                                  style={{
                                    // width: "auto",
                                    position: "absolute",
                                    // top: "10px",
                                    left: "500px",
                                    zIndex: 9999
                                  }}
                                  bodyClassName="p-2 font-weight-bold white-text "
                                  className="stylish-color-dark position-absolute top-0 start-50 translate-middle-x"
                                  closeClassName="blue-grey-text"
                                  fade
                                  icon="bell"
                                  iconClassName="text-danger"
                                  message="Only PNG or JPG is accepted."
                                  show
                                  
                                  title="Error"
                                  titleClassName="elegant-color-dark white-text"
                    
                                  />
                                </div>

                                }
            <div className='container-GroupForm'>
                <div className="IconTextImage">
                
                    <button className="ButTextIcon" type="button" onClick={textPanel}><i className="fas fa-text TextIcon fa-2x"></i></button>
                    <button className="ButImageIcon" type="button" onClick={filePanel}><i className="fas fa-image ImageIcon fa-2x"></i></button>
                </div>
                <div>
                    {panel ?

                        <form onSubmit={handleSubmit} className='todo-form center-form'>
                            {props.edit ? (
                                <>
                                    <input
                                        placeholder='Update your item'
                                        value={input}
                                        onChange={handleChange}
                                        name='text'
                                        ref={inputRef}
                                        className='todo-input edit'
                                    />
                                    <button onClick={handleSubmit} className='todo-button edit'>
                                        Update
                        </button>
                                </>
                            ) : (
                                <>
                                    <input
                                        placeholder='Add Group'
                                        value={input}
                                        onChange={handleChange}
                                        name='text'
                                        className='todo-input'
                                        ref={inputRef}
                                    />
                                    <button onClick={handleSubmit} className='todo-button'>
                                        Add
                                    </button>
                                </>
                            )}

                        </form>

                        :
                        //form upload image 
                        <form onSubmit={insertImage} className='center-form'>
                            <input accept="image/x-png,image/gif,image/jpeg" className='todo-input-img'  type="file" onChange={e => _handleImageChange(e)}></input>
                            <button className='todo-button-img' onClick={insertImage}>
                                Add
                            </button>
                        </form>
                    }




                </div>

            </div>
        </div>
    )
}

export default GroupForm

import React, { useState, useEffect, useRef } from 'react';


function GroupForm(props) {
    const [input, setInput] = useState('');
    const [file, setFile] = useState();
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

        props.onSubmit({
            id: Math.floor(Math.random() * 10000),
            text: input,
        });
        setInput('');
    };


    const insertImage = (e) => {

        e.preventDefault();

        console.log(file);

        props.onSubmit({
            id: Math.floor(Math.random() * 10000),
            text: file.name,
            file: file
        });
        setFile();

    }

    return (
        <div>
            <div className='container-GroupForm'>
                <div className="IconTextImage">
                    <button className="ButTextIcon" type="button" onClick={textPanel}><i className="fas fa-text TextIcon fa-2x"></i></button>
                    <button className="ButImageIcon" type="button" onClick={filePanel}><i className="fas fa-image ImageIcon fa-2x"></i></button>
                </div>
                <div>
                    {panel ?

                        <form onSubmit={handleSubmit} className='todo-form'>
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
                        <form onSubmit={insertImage}>
                            <input className='todo-input-img' type="file" onChange={e => setFile(e.target.files[0])}></input>
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

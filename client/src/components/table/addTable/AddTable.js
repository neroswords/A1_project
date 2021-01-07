import React from 'react';

function AddTable(){
return(
    <div>
        <div className="container my-3">
            
                <div className="form-group">
                <label>Word</label>
                <input type="text" className="form-control" required />
                </div>
                <div className="form-group">
                <label>Reply Word</label>
                <input type="text" className="form-control" required />
                </div>
                <button type="submit" className="btn btn-primary">
                Submit
                </button>
            
        </div>
    </div>
    );
}


export default AddTable;
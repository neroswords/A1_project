import React,{ useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }

  function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

export default function DeleteModal({dataID,delete_trained,add_data, dataType}){
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    
    const handleOpen = () => {
        setOpen(true);
      };

      const handleClose = () => {
        setOpen(false);
      };
    
    const deleteData = (ID, dataType) => {
        fetch('/'+dataType+'/'+ID+'/delete')
    }
    

    const button = (dataType) =>{
        if(dataType == 'bot'){
            return (
                <a href="#" onClick={handleOpen} ><i class="fas fa-trash"></i> Delete</a>
            )
        }
        else{
            return (
                <button className="btn btn-danger" onClick={handleOpen} type="button">
                    Delete
                </button>
            )
        }
        
    }

    function onKeyDown(event) {
      if (event.key === 'Enter' ) {
        delete_trained(dataID)
      }
    }

    const body = (
        <div style={modalStyle} className={classes.paper}>
            Do you want to delete this data?
            <div>
                <button className="btn btn-success" onKeyDown={onKeyDown} onClick={()=>delete_trained(dataID)} type="button">
                    Yes
                </button>
                <button className="btn btn-danger" onClick={handleClose} type="button">
                    No
                </button>
            </div>
        </div>
      );
    return (
        <>
            {button(dataType)}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
           {body} 
          </Modal>
        </>
    );
}
import React, { useEffect, useState, useRef } from 'react';
import { useToasts } from 'react-toast-notifications'
import { Button} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';


export const ToastDemo = ({ content }) => {
  const { addToast } = useToasts()
  
  useEffect(() => {
    addToast(content, {
      appearance: 'success',
      autoDismiss: true,
    })
  });

}
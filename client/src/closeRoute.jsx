import React from 'react';
import {Route,Redirect } from "react-router-dom";
import {isLoggedIn} from './components/auth';

export const CloseRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
        !isLoggedIn() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);
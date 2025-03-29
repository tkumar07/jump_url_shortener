import React, { useReducer } from 'react';
import axios from 'axios';
import UrlContext from './UrlContext';
import urlReducer from './urlReducer';

const UrlState = props => {
  const initialState = {
    urls: [],
    loading: true,
    error: null
  };

  const [state, dispatch] = useReducer(urlReducer, initialState);

  // Get user URLs
  const getUserUrls = async () => {
    try {
      const res = await axios.get('/api/urls');

      dispatch({
        type: 'GET_URLS',
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: 'URL_ERROR',
        payload: err.response.data.msg
      });
    }
  };

  // Add URL
  const addUrl = async url => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/urls', url, config);

      dispatch({
        type: 'ADD_URL',
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: 'URL_ERROR',
        payload: err.response.data.msg
      });
    }
  };

  return (
    <UrlContext.Provider
      value={{
        urls: state.urls,
        loading: state.loading,
        error: state.error,
        getUserUrls,
        addUrl
      }}
    >
      {props.children}
    </UrlContext.Provider>
  );
};

export { UrlState };
import React, { useContext, useEffect, useState } from 'react';
import UrlContext from '../../context/url/UrlContext';
import UrlList from './UrlList';
import UrlForm from './UrlForm';

const Dashboard = () => {
  const urlContext = useContext(UrlContext);
  const { urls, getUserUrls, loading } = urlContext;

  useEffect(() => {
    getUserUrls();
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="grid-2">
        <div>
          <UrlForm />
        </div>
        <div>
          <h2>My URLs</h2>
          {urls !== null && !loading ? (
            <UrlList urls={urls} />
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
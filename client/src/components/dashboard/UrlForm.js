import React, { useState, useContext } from 'react';
import UrlContext from '../../context/url/UrlContext';

const UrlForm = () => {
  const urlContext = useContext(UrlContext);
  const { addUrl } = urlContext;

  const [url, setUrl] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    if (url === '') {
      alert('Please enter a URL');
    } else {
      addUrl({ originalUrl: url });
      setUrl('');
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Shorten a URL</h2>
      <input
        type="text"
        placeholder="Enter URL to shorten"
        value={url}
        onChange={e => setUrl(e.target.value)}
      />
      <div>
        <input type="submit" value="Shorten" className="btn" />
      </div>
    </form>
  );
};

export default UrlForm;
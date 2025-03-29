import React from 'react';

const UrlItem = ({ url }) => {
  const { shortId, originalUrl, clicks } = url;
  const shortUrl = `${window.location.origin}/${shortId}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    alert('URL copied to clipboard');
  };

  return (
    <div className="url-item">
      <div>
        <h3>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </h3>
        <p>{originalUrl}</p>
        <p>Clicks: {clicks || 0}</p>
      </div>
      <button onClick={copyToClipboard}>Copy</button>
    </div>
  );
};

export default UrlItem;
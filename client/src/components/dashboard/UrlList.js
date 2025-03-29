import React from 'react';
import UrlItem from './UrlItem';

const UrlList = ({ urls }) => {
  return (
    <>
      {urls.length === 0 ? (
        <p>No URLs yet</p>
      ) : (
        urls.map(url => (
          <UrlItem key={url.shortId} url={url} />
        ))
      )}
    </>
  );
};

export default UrlList;
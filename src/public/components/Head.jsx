import React from 'react';
import Helmet from 'react-helmet';

const Head = props => {
  return (
    <Helmet>
      <title>{props.title}</title>
      <meta name="description" content={props.description} />
      <meta name="keywords" content={props.keywords} />
    </Helmet>
  );
};

export default Head;

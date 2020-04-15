import * as React from 'react';
import Helmet from 'react-helmet';

interface HeadProps {
  title?: string;
  description?: string;
  keywords?: string;
}

const Head = (props: HeadProps) => {
  return (
    <Helmet>
      <title>{props.title}</title>
      <meta name="description" content={props.description} />
      <meta name="keywords" content={props.keywords} />
    </Helmet>
  );
};

export default Head;

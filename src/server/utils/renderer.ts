import * as Helmet from 'react-helmet';

const renderer = (
  reactDOM: string,
  preloadedState: object,
  helmetData: Helmet.HelmetData,
) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
          <meta charset="utf-8">
          ${helmetData.title.toString()}
          ${helmetData.meta.toString()}
          <!--Let browser know website is optimized for mobile-->
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="stylesheet" type="text/css" href="./main.css">
          <title>React SSR</title>
      </head>
      
      <body>
          <div id="root">${reactDOM}</div>
          <script>
            window.PRELOADED_STATE = ${JSON.stringify(preloadedState)}
          </script>
          <script src="./main.js"></script>
      </body>
    </html>
`;
};

export default renderer;

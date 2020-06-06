## Tech/Framework
+ Back-end
  + Node.js
  + Express
  + MongoDB
  + Jest
  + Babel

+ Front-end
  + React
  + Redux, Redux-saga
  + Jest, Enzyme
  + Webpack
  + Babel
  
## Project Package Structure
 ```bash
  src
  |__public
    | index.tsx
    | App.tsx
    |__pages
    |__containers
    |__components
    |__hocs
    |__actions
    |__sagas
    |__reducers
    |__services
    |__utils
    |__styles  
    
  |__server
    | app.ts
    |__loaders
    |__routes
       |__api
       |__controller
       |__middleware
    |__services
    |__utils
    |__models
    |__interfaces
 ```
 
 ## Back-end Architecture
 + HTTP logic layer(Routes + controllers) <-> Business logic layer(Services Layer <-> Data Access Layer)
 
 ## Front-end Design Pattern
 + Container and Presentational Component, Stateful and Stateless, HOC
 
 ## 프로젝트를 통해서 경험해 본 것
 + jwt를 사용한 authentication
 + pagination
 + typescript 사용

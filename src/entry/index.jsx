import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';


const RouteArray = [].concat(memberMarketingRoutes);

const RouteCollection = RouteArray.map((props, index) => {
  return <Route {...props} key={index} />;
});

ReactDOM.render(<div>
  <div style={{width: 998, position: 'relative'}}>
    <Router history={hashHistory}>
      {RouteCollection}
    </Router>
  </div>
</div>, document.getElementById('react-content'));

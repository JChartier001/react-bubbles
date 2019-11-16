import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ProtectedRoute from "./helpers/ProtectedRoute";
import BubblePage from "./components/BubblePage"
import {getToken} from "./helpers/axiosWithAuth";

import Login from "./components/Login";
import "./styles.scss";

function App() {
  const signedIn = getToken();
  return (
    <Router>

        {!signedIn && <Link to="/">Login</Link>}
        {signedIn && <Link to="/bubble-page">Bubbles</Link>}
        {signedIn && <Link to="/logout">Logout</Link>}

        <div className="App">
          <Route exact path="/" component={Login} />
          <ProtectedRoute exact path="/bubble-page" component={BubblePage} />          
        </div>
    </Router>
  );
}

export default App;

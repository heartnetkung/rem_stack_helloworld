import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const BACKEND_URL = "https://app.jobfinfin.com";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/status">Status</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/status">
            <Status />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

class Home extends React.Component {
  render() {
    return <h2>Home</h2>;
  }
}

class Status extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    Promise.all([
      fetch(BACKEND_URL + "/hello")
        .then((res) => res.json())
        .then((data) => {
          this.setState(data);
        }),
      fetch(BACKEND_URL + "/mongo")
        .then((res) => res.json())
        .then((data) => {
          this.setState(data);
        }),
    ]).then(() => (window.prerenderReady = true));
  }
  render() {
    return (
      <h2>
        /hello: {this.state.text}
        <br />
        /mongo: {this.state.mongoStatus}
      </h2>
    );
  }
}

export default App;

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import appStore from "./redux/store";
import AppContainer from "./common";

import "./styles/common.css";
import "./styles/fonts.css";
import "./styles/controls.css";
import "./styles/justify.css";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={appStore.store}>
        <AppContainer />
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

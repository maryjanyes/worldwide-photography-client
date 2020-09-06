import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import appStore from "./redux/store";
import AppContainer from "./common";

import "./styles/common.css";
import "./styles/fonts.css";
import "./styles/controls.css";
import "./styles/justify.css";
import "./styles/styles.css";

/* window.requestFileSystem =
  window.requestFileSystem || window.webkitRequestFileSystem;

window.requestFileSystem(
  "TEMPORARY",
  Math.pow(1024, 2),
  function (fs) {
    fs.root.getFile(
      "assets/images/judle-NastyaTelikova.png",
      {},
      function (fileEntry) {
        fileEntry.remove(function () {
          console.log("File removed.");
        }, onError);
      },
      (err) => console.log("error", err)
    );
  },
  (err) => console.log("error", err)
); */

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

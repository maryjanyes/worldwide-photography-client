import React from 'react';
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';

import appStore from './redux/store';
import AppContainer from './common';

import './styles/common.css';
import './styles/fonts.css';
import './styles/controls.css';
import './styles/justify.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      store: appStore.store.subscribe(() => {
        console.log('%c%s', 'color: green; font: 1.2rem/1 Tahoma;', 'APP STATE CHANGED \n')
        console.log('%c%s', 'color: red; font-size: 10px', JSON.stringify(appStore.store.getState()))
      }),
    }
  }
  componentDidMount() {
    console.log('App mounted.')
  }

  componentDidCatch() {
    console.log('App did catched.')
  }

  componentWillUpdate() {
    console.log('App will update.')
  }

  render() {
    return (
      <Provider store={appStore.store}>
        <AppContainer />
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
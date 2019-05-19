import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';

import './styles.css';

import ClicksNeeded from './components/ClicksNeeded';
import PlayersOnline from './components/PlayersOnline';
import Button from './components/Button';
import WinnerList from './components/WinnerList';
import SocketIDComponent from './components/SocketIDComponent';
import Header from './components/Header';
import Rules from './components/Rules';
import Alert from './components/Alert';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playersOnline: null,
      clicksLeft: null,
      winners: [],
      endpoint: window.location.hostname,
      isLoading: true,
      socketId: null,
      alertOpen: false,
      alertMessage: null,
    }
  }

  processClick = () => {
    this.setState({ isLoading: true });
    this.socket.emit('clicks');
  }

  closeAlert = () => {
    this.setState({
      alertOpen: false,
      alertMessage: null
    });
  }

  componentDidMount() {
    const { endpoint } = this.state;
    this.socket = socketIOClient(endpoint);
    this.socket.on('id', data => this.setState({ socketId: data }));
    this.socket.on('players', data => this.setState({ playersOnline: data }));
    this.socket.on('clicks', data => this.setState({ clicksLeft: data, isLoading: false }));
    this.socket.on('wins', data => this.setState({ alertOpen: true, alertMessage: data }));
    this.socket.on('winners', data => {this.setState({ winners: data })});
  }

  render() {

    const { playersOnline, clicksLeft, winners, isLoading, socketId, alertOpen, alertMessage } = this.state;

    return (
      <div className="App">
        {alertOpen && <Alert alertMessage={alertMessage} closeAlert={this.closeAlert} />}
        <Header />
        <Rules />
        <div className="panel">
          <SocketIDComponent socketId={socketId} />
          <ClicksNeeded clicksLeft={clicksLeft} />
          <PlayersOnline playersOnline={playersOnline} />
        </div>
        <Button processClick={this.processClick} isLoading={isLoading} />
        <WinnerList winners={winners} />
      </div>
    );
  }
}

export default App;

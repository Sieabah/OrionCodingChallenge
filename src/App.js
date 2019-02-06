import React from 'react'
import './App.css'
import {AirportSearch} from './AirportSearch';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchTerm: '',
      outbound: true,
    };

    this.search = this.search.bind(this);
    this.outbound = this.outbound.bind(this);
    this.inbound = this.inbound.bind(this);
  }

  search(event) {
    this.setState({
      searchTerm: event.target.value
    });
  }

  outbound() {
    this.setState({
      outbound: true,
    });
  }

  inbound() {
    this.setState({
      outbound: false,
    });
  }

  render() {

    let outboundClass = "nav-button "
    let inboundClass = outboundClass;

    if(this.state.outbound)
      outboundClass += 'selected';
    else
      inboundClass += 'selected';

    return (
      <div className="App">
        <header>
          <h1>Where Do You Want To Go?</h1>
          <input
            className="location-search"
            placeholder="City or airport code"
            onChange={this.search}
            value={this.state.searchTerm}/>
            { this.state.searchTerm != '' ? (
              <nav>
                <div className={outboundClass} onClick={this.outbound}>Outbound</div>
                <div className={inboundClass} onClick={this.inbound}>Inbound</div>
              </nav>
            ) : (
              <nav></nav>
            )}
        </header>
        <main>
          { this.state.searchTerm != '' ? (
            <AirportSearch term={this.state.searchTerm} outbound={this.state.outbound} />
          ) : (
            <span></span>
          ) }
        </main>
      </div>
    );
  }
}

export default App

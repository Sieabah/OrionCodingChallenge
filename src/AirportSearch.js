import React from 'react'
import { Api } from './Api';
import { AirportResult } from './AirportResult';

export class AirportSearch extends React.Component {

  search(term){
    return Api.searchAirports(term).sort((a, b) => {
      if(a.city < b.city) return -1;
      if(a.city > b.city) return 1;
      return 0;
    });
  }

  render(){
    const airports = this.search(this.props.term);

    return (
      <div>
        { airports.length > 0 ?
          airports.map(a => <AirportResult mini={airports.length > 1} key={a.icao} airport={a} outbound={this.props.outbound} />)
          :
          (<h2>No Airports Found</h2>)
        }
      </div>
    )
  }
}

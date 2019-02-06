import React from 'react'
import { Api } from './Api';
import { AirportMap } from './AirportMap'

export class AirportResult extends React.Component {

  getFlights(airport, outbound) {
    return Api.searchFlights(airport.icao, outbound);
  }

  render(){
    const {airport, outbound} = this.props;
    const OutboundKey = outbound ? 'departure': 'arrival';
    const airlines = this.getFlights(airport, outbound);

    return (
      <div className="destination">
        <h2 className="location">{airport.city}, {airport.country}</h2>
        {!this.props.mini ? (
          <div className="routes">
          {airlines.map(airline => {
            if(airline.routes.length > 0)
              return airline.routes.map(route => {
                return (
                  <div className="route" key={route[OutboundKey].time}>
                      <span className="route-detail airline">{airline.name}</span>
                      <span className="route-detail time">{route[OutboundKey].time}</span>
                  </div>
                );
              });
          })}
          </div>
        ) : '' }

        {!this.props.mini ? (<AirportMap lat={airport.latitude} long={airport.longitude} />) : ''}
        <p className="airport"><span className="name">{airport.name}</span> <span className="iata">({airport.iata})</span></p>
      </div>
    )
  }
}

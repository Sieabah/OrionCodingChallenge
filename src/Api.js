import airlineData from '../data/airlines.json'
import airportData from '../data/airports.json'

export class Api {
  static excludedAirportICAO = ['KLAX'];
  static airline() {
    return airlineData;
  }

  static airport() {
    return airportData;
  }

  static splitAndCheck(fullText, check){
    //All lower, split on space,
    return fullText.toLowerCase().split(' ').filter((part) => ~part.indexOf(check));
  }

  static searchAirports(term) {
    const original = Api.airport();
    term = term.toLowerCase();
    const capsTerm = term.toUpperCase();

    return original.filter((airport) => {
      //Handle exclusion
      if(~Api.excludedAirportICAO.indexOf(airport.icao))
        return false;

      //Match any part of the name
      if(Api.splitAndCheck(airport.name, term).length > 0)
        return true;

      //Match any part of the city
      if(Api.splitAndCheck(airport.city, term).length > 0)
        return true;

      //Match IATA
      if(airport.iata.substring(0, term.length) === capsTerm)
        return true;

      //MATCH ICAO
      if(airport.icao.substring(0, term.length) === capsTerm)
        return true;

      return false;
    });
  }

  static searchFlights(icao, outbound){
    const KeyToCheck = outbound ? 'departure' : 'arrival';
    const HomeAirport = !outbound ? 'departure' : 'arrival';
    const original = Api.airline();

    return original.map((airline) => {
      return {
        ...airline,
        routes: airline.routes.filter((flight) => {
          //Ensure opposing airport is relevant at all
          if(!~Api.excludedAirportICAO.indexOf(flight[HomeAirport].icao))
            return false;

          return flight[KeyToCheck].icao === icao && !~Api.excludedAirportICAO.indexOf(flight[KeyToCheck].icao)
        })
          .sort((a, b) => {
            //01/01/2019 is Arbitrary, needed to parse the time
            const _a = Date.parse(`01/01/2019 ${a[KeyToCheck].time}`);
            const _b = Date.parse(`01/01/2019 ${b[KeyToCheck].time}`);
            if(_a < _b) return -1;
            if(_a > _b) return 1;
            return 0;
          })
      };
    });
  }
}

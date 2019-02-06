import React from 'react'

export class AirportMap extends React.Component {
  render() {
    const url = `https://maps.google.com/maps?q=${this.props.lat},${this.props.long}&z=3&hl=en&output=embed`;

    return (
      <iframe className="destination-map"
        frameBorder="0"
        scrolling="no"
        marginHeight="0"
        marginWidth="0"
        src={url}></iframe>
    )
  }
}

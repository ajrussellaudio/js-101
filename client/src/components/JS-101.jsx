var React = require('react');

var FilterPanel = require('./FilterPanel')

var JS101 = React.createClass({

  getInitialState() {
    return {
      vco: {
        waveform: "sawtooth",
        note: 60,
      },
      vcf: {
        cutoff: 10000,
        resonance: 1
      },
      env: {
        decay: 0.1,
        mod: 0
      },
      vca: {
        level: 0
      }
    }
  },

  handleFilterChange( data ) {
    console.log(data)
  },

  render() {
    return (
      <div className="js101">
        <FilterPanel 
          vcf={this.state.vcf}
          env={this.state.env}
          onChange={this.handleFilterChange}/>
      </div>
    )
  }

})

module.exports = JS101;
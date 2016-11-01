var React = require('react');

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
      vca: {
        level: 0
      }
    }
  }

  render() {
    return <div>I am JS-101</div>
  }

})

module.exports = JS101;
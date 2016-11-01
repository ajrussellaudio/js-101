var React = require('react');

var FilterPanel = require('./FilterPanel');
var EnvelopePanel = require('./EnvelopePanel');

var JS101 = React.createClass({

  getInitialState() {
    return {
      note: 60,
      vcfCutoff: 10000,
      vcfResonance: 1,
      envDecay: 1,
      envMod: 0,
      level: 0
    }
  },

  handleChange( data ) {
    this.setState( data );
  },

  render() {
    return (
      <div className="js101">
        <FilterPanel 
          cutoff={this.state.vcfCutoff}
          resonance={this.state.vcfResonance}
          onChange={this.handleChange}/>
        <EnvelopePanel 
          decay={this.state.envDecay}
          onChange={this.handleChange}/>
      </div>
    )
  }

})

module.exports = JS101;
var React = require('react');

var LogSlider = require('./LogSlider');
var LinSlider = require('./LinSlider');

var FilterPanel = React.createClass({

  getInitialState() {
    return {
      cutoff: this.props.vcf.cutoff,
      resonance: this.props.vcf.resonance
    };
  },

  handleCutoffChange( newFreq ) {
    this.setState({ cutoff: newFreq });
  },

  handleResonanceChange( newRes ) {
    this.setState({ resonance: newRes });
  },

  render() {
    return (
      <div className="synthModule">
        <LogSlider 
          name="cutoff"
          min={20}
          max={20000}
          onChange={this.handleCutoffChange}
          default={this.state.cutoff}/>
        <LinSlider 
          name="res"
          min={1}
          max={10}
          onChange={this.handleResonanceChange}
          default={this.state.resonance}/>
      </div>
    )
  }

})

module.exports = FilterPanel;
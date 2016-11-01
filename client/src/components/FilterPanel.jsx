var React = require('react');

var LogSlider = require('./LogSlider');
var LinSlider = require('./LinSlider');

var FilterPanel = React.createClass({

  handleCutoffChange( newFreq ) {
    this.props.onChange({ vcfCutoff: newFreq });
  },

  handleResonanceChange( newRes ) {
    this.props.onChange({ vcfResonance: newRes });
  },

  render() {
    return (
      <div className="synthModule">
        <LogSlider 
          name="cutoff"
          min={20}
          max={20000}
          onChange={this.handleCutoffChange}
          default={this.props.cutoff}/>
        <LinSlider 
          name="res"
          min={1}
          max={40}
          onChange={this.handleResonanceChange}
          default={this.props.resonance}/>
      </div>
    )
  }

})

module.exports = FilterPanel;
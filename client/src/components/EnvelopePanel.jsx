var React = require('react');

var LogSlider = require('./LogSlider');
var LinSlider = require('./LinSlider');

var EnvelopePanel = React.createClass({

  handleDecayChange( newDecay ) {
    this.props.onChange({ envDecay: newDecay });
  },

  render() {
    return (
      <div className="synthModule">
        <LogSlider
          name="decay"
          min={0.01}
          max={10}
          default={this.props.decay}
          onChange={this.handleDecayChange} />
      </div>
    )
  }

})

module.exports = EnvelopePanel;
var React = require('react');

var LinSlider = require('./LinSlider');

var OscPanel = React.createClass({

  handleDetuneChange( newDetune ) {
    this.props.onChange({ vcoDetune: newDetune });
  },

  render() {
    return (
      <div className="synthModule">
        <LinSlider
          name="detune"
          min={-50}
          max={50}
          default={this.props.detune}
          onChange={this.handleDetuneChange} />
      </div>
    )
  }

});

module.exports = OscPanel;
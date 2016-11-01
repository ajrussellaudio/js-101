var React = require('react');

var LinSlider = React.createClass({

  getInitialState: function() {
    var max = this.props.max;
    var min = this.props.min;
    var scale = max - min;
    return {
      max: max,
      min: min,
      scale: scale
    }
  },

  handleChange: function(event) {
    var value = this.linValue( event.target.value );
    this.props.onChange( value );
  },

  linValue: function( position ) {
    var lin = position * this.state.scale + this.state.min;
    return lin;
  },

  getDefaultValue: function() {
    var value = (this.props.default - this.state.min) / this.state.scale ;
    return value;
  },

  render: function() {
    var label = <label>{this.props.name}</label>
    var slider = <input 
      type="range"
      id={this.props.name}
      min={0} 
      max={1}
      step={1 / 128}
      defaultValue={this.getDefaultValue()}
      onChange={this.handleChange}/>

    return (
      <div className="slider" >{label}{slider}</div>
      )
  }
})

module.exports = LinSlider
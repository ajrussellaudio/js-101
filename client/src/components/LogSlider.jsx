// mostly taken from Stack Overflow, adapted for React
// http://stackoverflow.com/questions/846221/logarithmic-slider

var React = require('react');

var LogSlider = React.createClass ({

  getInitialState: function() {
    var minlval = Math.log(this.props.min);
    var maxlval = Math.log(this.props.max);
    var scale = maxlval - minlval
    return {
      minlval: minlval,
      maxlval: maxlval,
      scale: scale
    }
  },

  handleChange: function( event ) {
    var value = this.logValue( event.target.value );
    this.props.onChange( value );
  },

  logValue: function(position) {
    var log = Math.exp( position * this.state.scale + this.state.minlval );
    return log;
  },

  getDefaultValue: function() {
    var value = (Math.log(this.props.default) - this.state.minlval) / this.state.scale;
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

module.exports = LogSlider;
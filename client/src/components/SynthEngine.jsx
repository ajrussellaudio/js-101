var React = require('react');

var SynthEngine = React.createClass({

  getInitialState() {
    return {
      frequency: 0
    }
  },

  componentWillReceiveProps(nextProps) {
    var notes = nextProps.params.notes.reverse()
    var noteFrequency = this.midiNoteToHz( notes[0] )
    this.setState({ frequency: noteFrequency })
  },

  midiNoteToHz( midiNote ) {
    // Thanks, Wikipedia!
    return Math.pow( 2, ( midiNote - 69 ) / 12 ) * 440;
  },

  render() {
    return null;
  }

})

module.exports = SynthEngine;
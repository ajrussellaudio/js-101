var React = require('react');

var MidiInput = React.createClass({

  componentDidMount() {
    if( navigator.requestMIDIAccess ) {
      navigator.requestMIDIAccess({
        sysex: false
      }).then( this.onMIDISuccess, this.onMIDIFailure);
    } else {
      alert("No MIDI support. Sad :(");
    }
  },

  onMIDISuccess( midi ) {
    var inputs = midi.inputs.values();
    for( var input = inputs.next(); input && !input.done; input = inputs.next() ) {
      input.value.onmidimessage = this.onMIDIMessage;
    }
  },

  onMIDIFailure(error) {
    alert("No MIDI devices found. Sad :(")
  },

  onMIDIMessage( message ) {
    this.props.onMessage( message.data )
  },

  render() {
    return null;
  }

})

module.exports = MidiInput;
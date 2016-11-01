var React = require('react');

var SynthEngine = React.createClass({

  getInitialState() {
    return {
      frequency: 0,
      osc: {},
      lpf: {},
      amp: {}
    }
  },

  componentDidMount() {
    var audioContext = new window.AudioContext;

    var oscillator = audioContext.createOscillator();
    var filter = audioContext.createBiquadFilter();

    oscillator.connect(filter);
    filter.connect(audioContext.destination);

    filter.type = "lowpass";
    filter.frequency.value = this.props.params.vcfCutoff;
    filter.Q.value = this.props.params.vcfResonance;

    oscillator.type = "sawtooth";
    oscillator.frequency.value = (this.state.frequency || 440);
    oscillator.start(audioContext.currentTime);

    this.setState({
      context: audioContext,
      osc: oscillator,
      lpf: filter
    })
  },

  componentWillReceiveProps(nextProps) {
    var now = this.state.context.currentTime;
    var notes = nextProps.params.notes.sort().reverse();
    var noteFrequency = this.midiNoteToHz( notes[0] );
    this.state.osc.frequency.setValueAtTime( (noteFrequency || 0), now );
    this.state.lpf.frequency.setValueAtTime( nextProps.params.vcfCutoff, now);
    this.state.lpf.Q.setValueAtTime( nextProps.params.vcfResonance, now);
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
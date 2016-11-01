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
    var outputAmp = audioContext.createGain();

    outputAmp.connect(audioContext.destination);
    outputAmp.gain.value = this.props.params.level;
    
    filter.connect(outputAmp);
    filter.type = "lowpass";
    filter.frequency.value = this.props.params.vcfCutoff;
    filter.Q.value = this.props.params.vcfResonance;

    oscillator.connect(filter);
    oscillator.type = "sawtooth";
    oscillator.frequency.value = (this.state.frequency || 440);
    oscillator.start(audioContext.currentTime);

    this.setState({
      context: audioContext,
      osc: oscillator,
      lpf: filter,
      amp: outputAmp
    })
  },

  componentWillReceiveProps(nextProps) {
    var now = this.state.context.currentTime;
    this.updateNotePlaying( nextProps.params, now );
    this.updateFilter( nextProps.params, now );
    this.updateAmp( nextProps.params, now )
  },

  updateNotePlaying( params, now ) {
    var notes = params.notes.sort().reverse();
    var noteFrequency = this.midiNoteToHz( notes[0] );
    this.state.osc.frequency.setValueAtTime( (noteFrequency || 0), now );
  },

  updateFilter( params, now ) {
    this.state.lpf.frequency.setValueAtTime( params.vcfCutoff, now);
    this.state.lpf.Q.setValueAtTime( params.vcfResonance, now);
  },

  updateAmp( params, now ) {
    this.state.amp.gain.setValueAtTime( params.level, now );
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
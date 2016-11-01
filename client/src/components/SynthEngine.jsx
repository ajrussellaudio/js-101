var React = require('react');

var OscBank = require('./OscBank');

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

    var oscillator = new OscBank( audioContext );
    var filter = audioContext.createBiquadFilter();
    var outputAmp = audioContext.createGain();

    outputAmp.connect(audioContext.destination);
    outputAmp.gain.value = this.props.params.level;
    
    filter.connect(outputAmp);
    filter.type = "lowpass";
    filter.frequency.value = this.props.params.vcfCutoff;
    filter.Q.value = this.props.params.vcfResonance;

    oscillator.connect(filter);
    oscillator.setWaveform("sawtooth");
    oscillator.setFrequency(this.state.frequency || 440);
    oscillator.setDetune(this.props.params.vcoDetune);
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
    this.updateOscillator( nextProps.params, now );
    this.updateNotePlaying( nextProps.params, now );
    this.updateFilter( nextProps.params, now );
    this.updateAmp( nextProps.params, now )
  },

  updateOscillator( params, now ) {
    this.state.osc.setDetune( params.vcoDetune, now );
  },

  updateNotePlaying( params, now ) {
    var lastNotePlayed = params.notes[ params.notes.length-1 ];
    var noteFrequency = this.midiNoteToHz( lastNotePlayed );
    this.state.osc.setFrequency( (noteFrequency || 0) );
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
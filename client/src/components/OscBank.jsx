const React = require('react');

class OscBank extends React.Component{

  constructor(context) {
    super(context);
    this.context = context;
    this.oscillators = [ context.createOscillator(), context.createOscillator() ];
  }

  setWaveform( waveform ) {
    this.oscillators.forEach( (osc) => { osc.type = waveform } )
  }

  setFrequency( freq, time ) {
    if(!time) time = this.context.currentTime;
    this.oscillators.forEach( (osc) => { 
      osc.frequency.setValueAtTime(freq, time);
    });
  }

  setDetune( cents, time ) {
    if(!time) time = this.context.currentTime;
    this.oscillators[0].detune.setValueAtTime(cents, time);
  }

  connect( object ) {
    this.oscillators.forEach( (osc) => { osc.connect(object) } );
  }

  start() {
    this.oscillators.forEach( (osc) => { osc.start() } );
  }

  render() {
    return null;
  }

}

module.exports = OscBank;
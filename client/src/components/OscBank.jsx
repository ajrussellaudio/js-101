const React = require('react');

class OscBank extends React.Component{

  constructor(context) {
    super(context);
    this.context = context;

    // const oscillators = [ context.createOscillator(), context.createOscillator() ] // CHEATING

    // const oscillators = new Array(2).fill( context.createOscillator() ); // two references to same osc

    const oscillators = Array(null,null).map( () => context.createOscillator() ); // [] length: 2

    this.oscillators = [];
    this.addOscillators(2);
  }

  addOscillators(num) {
    if(num < 1) return;
    this.oscillators.push( this.context.createOscillator() );
    this.addOscillators( num - 1 );
  }

  setWaveform( waveform ) {
    this.oscillators.forEach( osc => osc.type = waveform )
  }

  setFrequency( freq, time ) {
    if(!time) time = this.context.currentTime;
    this.oscillators.forEach( osc => osc.frequency.setValueAtTime(freq, time) );
  }

  setDetune( cents, time ) {
    if(!time) time = this.context.currentTime;
    this.oscillators[0].detune.setValueAtTime(cents, time);
  }

  connect( object ) {
    this.oscillators.forEach( osc => osc.connect(object) );
  }

  start( time ) {
    if(!time) time = this.context.currentTime;
    // this.oscillators.forEach( osc => osc.start(time) );
    this.oscillators[0].start();
    this.oscillators[1].start();
  }

  render() {
    return null;
  }

}

module.exports = OscBank;
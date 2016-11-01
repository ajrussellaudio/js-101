var React = require('react');

var MidiInput = require('./MidiInput');
var FilterPanel = require('./FilterPanel');
var EnvelopePanel = require('./EnvelopePanel');

var JS101 = React.createClass({

  getInitialState() {
    return {
      notes: [],
      vcfCutoff: 10000,
      vcfResonance: 1,
      envDecay: 1,
      envMod: 0,
      level: 0
    }
  },

  handleChange( data ) {
    this.setState( data );
  },

  handleMidiMessage( data ) {
    if( data[0] === 144 ) this.handleNoteOn( data[1], data[2] );
    if( data[0] === 128 ) this.handleNoteOff( data[1] );
  },

  handleNoteOn( noteNum, velocity ) {
    var newNotes = this.state.notes.concat(noteNum);
    this.setState({
      notes: newNotes,
      level: 1
    })
  },

  handleNoteOff( noteNum ) {
    var index = this.state.notes.indexOf(noteNum);
    var newNotes = this.state.notes.splice(0);
    newNotes.splice(index, 1);
    var newLevel = newNotes.length ? 1 : 0
    this.setState({
      notes: newNotes.reverse(),
      level: newLevel
    })
  },

  render() {
    return (
      <div className="js101">
        <MidiInput 
          onMessage={this.handleMidiMessage}/>
        <FilterPanel 
          cutoff={this.state.vcfCutoff}
          resonance={this.state.vcfResonance}
          onChange={this.handleChange} />
        <EnvelopePanel 
          decay={this.state.envDecay}
          onChange={this.handleChange} />
      </div>
    )
  }

})

module.exports = JS101;
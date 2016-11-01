var React = require('react');
var ReactDOM = require('react-dom');

var JS101 = require('./components/JS-101');

window.onload = function(){
  ReactDOM.render(
    <JS101/>,
    document.getElementById('app')
  );
}

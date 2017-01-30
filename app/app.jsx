var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

// Load foundation
// require('style!css!foundation-sites/dist/css/foundation.min.css')
$(document).foundation();

// app css
require('style!css!sass!applicationStyles')

ReactDOM.render(
    <p>Boiler Plate React Project</p>, document.getElementById('app'));

import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';
import NetworkGraphContainer from 'NetworkGraphContainer';

// Load foundation
require('style!css!foundation-sites/dist/css/foundation.min.css')
$(document).foundation();

var nodes = [
    {
        id: "A"
    }, {
        id: "B"
    }, {
        id: "C"
    }, {
        id: "D"
    }, {
        id: "E"
    }, {
        id: "F"
    }, {
        id: "G"
    }
]
var links = [
    {
        source: "B",
        target: "A",
        weight: 5
    }, {
        source: "G",
        target: "A",
        weight: 5
    }, {
        source: "C",
        target: "B",
        weight: 5
    }, {
        source: "D",
        target: "B",
        weight: 5
    }
]

// app css
require('style!css!sass!applicationStyles')

ReactDOM.render(
    <NetworkGraphContainer
    width={800}
    height={600}
    nLinks={links}
    nodes={nodes}
    distance={250}
    nodeSize={30}/>, document.getElementById('app'));

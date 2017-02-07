import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';
import NetworkGraph from 'NetworkGraph';

// Load foundation
require('style!css!foundation-sites/dist/css/foundation.min.css')
$(document).foundation();

function addLink(Source, Target) {
    console.log("addLink", Source, Target)
}

const nodes = [
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
const links = [
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
    <NetworkGraph
    addLink={addLink}
    width={800}
    height={600}
    links={links}
    nodes={nodes}/>, document.getElementById('app'));

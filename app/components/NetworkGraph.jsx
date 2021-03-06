import React, {Component, PropTypes} from 'react';
const d3 = require('d3');

class NetworkGraph extends Component {
    constructor(props) {
        super(props);
        console.log("NetworkGraph: Constructor: Props: ", props);
        this.linkSource = undefined;
        this.SourceNodeColor = undefined;
        this.linkTarget = undefined;
        this.TargetNodeColor = undefined;
        this.drawingLinks = false;
        this.controlKeyDown = false;
        this.edges = props.links;

        // Bind Methods with this
        this.createForceLayout = this
            .createForceLayout
            .bind(this);
    }

    render() {

        return (

            <div>
                <svg
                    style={{
                    width: this.props.width + 'px',
                    height: this.props.height + 'px'
                }}/>
            </div>

        );
    }
    // Lifecycle methods
    componentWillMount() {}

    componentDidMount() {
        this.createForceLayout();
    }

    componentWillReceiveProps(nextProps) {}

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    componentWillUpdate(nextProps, nextState) {}

    componentDidUpdate(prevProps, prevState) {}

    componentWillUnmount() {
        d3
            .simulation
            .stop();
    }

    createForceLayout() {

        var drawingLinks = false;
        var controlKeyDown = false;
        const _that = this; // Used by some of the subfunctions so they have the right context
        var edges = this.props.nLinks;
        var nodes = this.props.nodes;
        var g = d3
            .select("svg")
            .append("g")
            .attr("class", "viewport");
        var g_links = d3
            .select("svg")
            .select("g.viewport")
            .append("g")
            .attr("class", "g_links"); // Link layer, should be appended first, order matters
        var g_nodes = d3
            .select("svg")
            .select("g.viewport")
            .append("g")
            .attr("class", "g_nodes"); // Node layer, should be appended second, order matters
        var nodeHash = {};

        function refresh() {
            nodes.forEach(node => {
                nodeHash[node.id] = node;
            })

            edges.forEach(edge => {
                edge.weight = parseInt(edge.weight);
                edge.source = nodeHash[edge.source];
                edge.target = nodeHash[edge.target];
            })

            nodes.forEach(d => {
                d.degreeCentrality = edges
                    .filter(p => p.source === d || p.target === d)
                    .length
            })
        }
        refresh();

        function refreshLinks() {
            //d3.select("svg").select("g.g_links").selectAll("line.link")
            g_links
                .selectAll("line.link")
                .data(edges, d => d.source.id + "-" + d.target.id)
                .enter()
                .append("line")
                .attr("class", "link")
                .style("opacity", .5)
                .style("stroke-width", d => d.weight)
                .style("stroke", "black"); // Todo: Make this a property

        }

        var linkForce = d3
            .forceLink()
            .strength(d => d.weight * .1)
            .distance(this.props.distance)

        var simulation = d3
            .forceSimulation()
            .force("charge", d3.forceManyBody().strength(-800))
            .force("x", d3.forceX(400))
            .force("y", d3.forceY(300))
            .force("link", linkForce)
            .nodes(nodes)
            .on("tick", forceTick);

        simulation
            .force("link")
            .links(edges)

        refreshLinks();

        d3
            .select("body")
            .on("keydown", handleKeyDown);
        d3
            .select("body")
            .on("keyup", handleKeyUp);

        var zoom = d3
            .zoom()
            .scaleExtent([
                1 / 4,
                8
            ])
        zoom.on("zoom", zoomed)
        d3
            .select("svg")
            .call(zoom)

        function zoomed() {

            if (drawingLinks) {
                return false;
            }
            g.attr("transform", d3.event.transform)
        }

        function dragStarted(d) {
            if (drawingLinks === false) {
                if (!d3.event.active) 
                    simulation.alphaTarget(0.1).restart();
                d.fx = d.x;
                d.fy = d.y;
            }
        }

        function dragging(d) {
            if (drawingLinks === false) {
                d.fx = d3.event.x;
                d.fy = d3.event.y;
            }
        }

        function dragEnded(d) {
            if (drawingLinks === false) {
                if (!d3.event.active) 
                    simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            }
        }

        const onNodeClick = (data) => {

            console.log("onNodeClick()", data);
            var d3ev = d3.event;
            if (d3ev.ctrlKey) {

                if (this.linkSource != undefined) { // Unselect the source
                    if (this.linkSource === data) {
                        var selectString = nodeSelectString(this.linkSource);
                        d3
                            .select(selectString)
                            .style("fill", this.SourceNodeColor);
                        this.linkSource = undefined;
                        return;
                    }
                }
                if (this.linkTarget != undefined) {
                    if (this.linkTarget === data) {
                        var selectString = nodeSelectString(this.linkTarget);
                        d3
                            .select(selectString)
                            .style("fill", this.TargetNodeColor);
                        this.linkTarget = undefined;
                        return;
                    }
                }

                if (this.linkSource === undefined) {
                    this.linkSource = data;
                    this.SourceNodeColor = d3
                        .select(d3ev.target)
                        .style("fill");

                    d3
                        .select(d3ev.target)
                        .style("fill", "red");
                    this
                        .props
                        .sourceNodeSelected();
                    return;
                } else if (this.linkTarget === undefined) {
                    this.linkTarget = data;
                    this.TargetNodeColor = d3
                        .select(d3ev.target)
                        .style("fill");
                    d3
                        .select(d3ev.target)
                        .style("fill", "orange");
                    this
                        .props
                        .targetNodeSelected();
                    return;
                }

            }
        }

        var handleKeyDown = () => {
            var d3ev = d3.event;
            console.log("handleKeyDown()", d3ev);
            if (d3ev.key === "Control") {
                drawingLinks = true;
                simulation.stop();
            }
        }

        function nodeSelectString(data) {
            var result = "circle#" + data.id;
            console.log("Node selection string:", result)
            return result;
        }

        function handleKeyUp() {

            var d3ev = d3.event;
            console.log("handleKeyUp()", d3ev);
            if (d3ev.key === "Control") {
                drawingLinks = false;
                if (_that.linkTarget && _that.linkSource) {
                    var source = nodeHash[_that.linkSource.id];
                    var target = nodeHash[_that.linkTarget.id];
                    var links = simulation
                        .force("link")
                        .links();
                    var nodes = simulation.nodes();
                    var newLink = {
                        source: source,
                        target: target,
                        weight: 5
                    };
                    links.push(newLink);
                    simulation
                        .force("link")
                        .links(links);
                    refreshLinks();
                }
                if (_that.linkTarget) {
                    var selectString = nodeSelectString(_that.linkTarget);
                    d3
                        .select(selectString)
                        .style("fill", _that.TargetNodeColor);
                }
                if (_that.linkSource) {
                    var selectString = nodeSelectString(_that.linkSource);
                    d3
                        .select(selectString)
                        .style("fill", _that.SourceNodeColor);
                }
                _that
                    .props
                    .addNewLink(_that.linkSource, _that.linkTarget);
                _that.linkSource = undefined;
                _that.linkTarget = undefined;

                simulation.restart();

            }
        }

        function handleNodeMouseDown() {
            var d3ev = d3.event;

            if (!drawingLinks) {
                return
            }
        }

        function handleDrawingLinkMouseUp() {
            {
                console.log("handleDrawingLinkMouseUp")
            }
        }

        function handleNodeMouseUp() {
            var d3ev = d3.event;
            console.log("handleNodeMouseUp()", d3ev);

        }

        //var nodeEnter = d3.select("svg").select("g.g_nodes").selectAll("g.node")
        var nodeEnter = g_nodes
            .selectAll("g.node")
            .data(nodes, d => d.id)
            .enter()
            .append("g")
            .attr("class", "node");

        nodeEnter
            .append("circle")
            .attr("r", this.props.nodeSize)
            .style("fill", d => "#41A368")
            .on("click", onNodeClick)
            .attr("id", d => d.id)
            //.on("mousedown",handleNodeMouseDown) .on("mouseup", handleNodeMouseUp)
            .call(d3.drag().on("start", dragStarted).on("drag", dragging).on("end", dragEnded));

        nodeEnter
            .append("text")
            .style("text-anchor", "middle")
            .attr("y", 35) // vertical offset of text
            .attr("x", 30) // Horizontal offset of text
            .text(d => d.id)

        function forceTick() {
            d3
                .selectAll("line.link")
                .attr("x1", d => d.source.x)
                .attr("x2", d => d.target.x)
                .attr("y1", d => d.source.y)
                .attr("y2", d => d.target.y)
            d3
                .selectAll("g.node")
                .attr("transform", d => "translate(" + d.x + "," + d.y + ")")
        }
    }
}

NetworkGraph.propTypes = {
    addNewLink: PropTypes.func.isRequired, // Callback for adding a link between two nodes
    nodes: PropTypes.array.isRequired, // Array of nodes
    nLinks: PropTypes.array.isRequired, // Array of links
    width: PropTypes.number.isRequired, // Width of returned SVG element
    height: PropTypes.number.isRequired, // Height of returned SVG element
    distance: PropTypes.number.isRequired, // Link Distance
    nodeSize: PropTypes.number.isRequired, // Node circle size
    sourceNodeSelected: PropTypes.func, // Notify parent that a source node has been selected
    targetNodeSelected: PropTypes.func // Notify parent that a target node has been selected
};

export default NetworkGraph;
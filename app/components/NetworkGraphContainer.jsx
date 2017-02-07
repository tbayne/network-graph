import React, {Component, PropTypes} from 'react';
import NetworkGraph from 'NetworkGraph';

class NetworkGraphContainer extends Component {
    constructor(props) {
        super(props);
        this.addNewLink = this
            .addNewLink
            .bind(this);
        this.sourceNodeSelected = this
            .sourceNodeSelected
            .bind(this);
        this.targetNodeSelected = this
            .targetNodeSelected
            .bind(this);

        this.state = {
            nodes: props.nodes,
            nLinks: props.nLinks,
            nodeSize: props.nodeSize,
            distance: props.distance,
            helpText: "Control + Click to Select a Node (keep the Control Key Depressed)",
            secondaryHelpText: ""
        }
    }
    sourceNodeSelected() {
        this.setState({helpText: "Source node selected, Control + Click a second node to establish a link", secondaryHelpText: "(Control click the node again to unselect it)"})
    }
    targetNodeSelected() {
        this.setState({helpText: "Target node selected, release the Control key to complete the link", secondaryHelpText: "(Control click the node again to unselect it)"})
    }
    addNewLink(Source, Target) {
        console.log("addNewLink", Source, Target)
        this.setState({helpText: "Control + Click to Select a Node (keep the Control Key Depressed)", secondaryHelpText: ""})

        let linksCopy = this.state.nLinks;
        let newSource = {
            id: Source.id
        };
        let newTarget = {
            id: Target.id
        };

        let newLink = {
            source: newSource,
            target: newTarget,
            weight: 5
        };

        linksCopy.push(newLink);
        this.setState({links: linksCopy});
        console.log("addNewLink", this.state.nLinks);

    }

    render() {
        return (
            <div>

                <h3 className="page-title">Network Graph</h3>
                <div className="row">
                    <div className="column medium-centered small-12 medium-10 large-8">
                        <NetworkGraph
                            addNewLink={this.addNewLink}
                            sourceNodeSelected={this.sourceNodeSelected}
                            targetNodeSelected={this.targetNodeSelected}
                            width={800}
                            height={600}
                            nLinks={this.state.nLinks}
                            nodes={this.state.nodes}
                            distance={250}
                            nodeSize={30}/>
                        <p>{this.state.helpText}</p>
                        <p>{this.state.secondaryHelpText}</p>
                    </div>
                </div>
            </div>

        );
    }

}

NetworkGraphContainer.propTypes = {
    nodes: PropTypes.array.isRequired, // Array of nodes
    nLinks: PropTypes.array.isRequired, // Array of links between nodes
    width: PropTypes.number.isRequired, // Width of returned SVG element
    height: PropTypes.number.isRequired, // Height of returned SVG element
    distance: PropTypes.number.isRequired, // Link Distance
    nodeSize: PropTypes.number.isRequired // Node circle size
};

export default NetworkGraphContainer;
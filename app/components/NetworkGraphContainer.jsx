import React, {Component, PropTypes} from 'react';
import NetworkGraph from 'NetworkGraph';

class NetworkGraphContainer extends Component {
    constructor(props) {
        super(props);
        this.addNewLink = this
            .addNewLink
            .bind(this);
        this.state = {
            nodes: props.nodes,
            nLinks: props.nLinks,
            nodeSize: props.nodeSize,
            distance: props.distance
        }
    }
    addNewLink(Source, Target) {
        console.log("addNewLink", Source, Target)
        let linksCopy = this.state.links;
        let newLink = {
            source: Source.id,
            target: Target.id,
            weight: 5
        };
        linksCopy.push(newLink);
        this.setState({links: linksCopy});
    }

    render() {
        return (
            <div>

                <h3 className="page-title">Network Graph</h3>
                <div className="row">
                    <div className="column small-centered small-11 medium-6 large-5">
                        <NetworkGraph
                            addLink={this.addNewLink}
                            width={800}
                            height={600}
                            nLinks={this.state.nLinks}
                            nodes={this.state.nodes}
                            distance={250}
                            nodeSize={30}/>
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
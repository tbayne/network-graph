var React = require('react');
var Nav = require('Nav');

var Main = (props) => {
    return (
        <div>
            <Nav/>
            <div className="row">
                <div className="column small-centered medium-6 large-4">
                    <div className="row">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    );
}
module.exports = Main;
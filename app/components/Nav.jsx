var React = require('react');
var {Link, IndexLink} = require('react-router');

var Nav = () => {

    return (
        <div className="top-bar">
            <div className="top-bar-left">
                <ul className="menu">
                    <li className="menu-text">React Timer Application</li>
                    <li>
                        <IndexLink to="/" activeClassName="active-link">Network Graph</IndexLink>
                    </li>

                </ul>
            </div>
            <div className="top-bar-right">
                <ul className="menu">
                    <li className="menu-text">Created By:
                        <a href="https://github.com/tbayne" target="_blank">Terry Bayne</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
module.exports = Nav;

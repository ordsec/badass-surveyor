import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    console.log(this.props);
    return (
      <nav>
        <div className="nav-wrapper">
          <a className="left brand-logo">
            Badass Surveyor
          </a>
          <ul className="right">
            <li>
              <a>Sign in with Google</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps)(Header);

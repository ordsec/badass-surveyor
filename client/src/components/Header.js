import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="#" className="left brand-logo">
            Badass Surveyor
          </a>
          <ul className="right">
            <li>
              <a href="#">Sign in with Google</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;

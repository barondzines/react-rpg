import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { auth } from '../../firebase/firebase.utils';

import { ReactComponent as Logo } from '../../assets/logo.svg';

import './_header.styles.scss';

const Header = ({ currentUser }) => (

  <div className='header'>
    <Link className='logo-container' to='/'>
      <Logo className='logo'/>
    </Link>
    <div className='options'>
      <Link className='option' to='/shop'>
        About
      </Link>
      <Link className='option' to='/inventory'>
        Character
      </Link>
      {
        currentUser ?
        <div className='option' onClick={() => auth.signOut()}>Sign Out</div>
        :
        <Link className='option' to='/signin'>Sign In</Link>
      }
    </div>

  </div>

)

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(Header);

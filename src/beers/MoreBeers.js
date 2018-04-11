import React from 'react';
import propTypes from 'prop-types';

const MoreBeers = props => (

  props.lastPage ? <div className="moreBeers">{props.children}</div> : null

);

MoreBeers.propTypes = {
  lastPage: propTypes.bool.isRequired,
  children: propTypes.element.isRequired,
};

export default MoreBeers;

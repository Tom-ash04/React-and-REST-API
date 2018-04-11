import React from 'react';
import propTypes from 'prop-types';

class ModalFromRoute extends React.Component {
  constructor(props) {
    super(props);
    this.props.handleRouteBeer.bind(this);
  }

  componentDidMount() {
    fetch(`https://api.punkapi.com/v2/beers/${this.props.match.params.name}`)
      .then(resp => resp.json())
      .then(data =>
        this.props.handleRouteBeer(data[0]));
  }

  render() {
    return (
      null
    );
  }
}

ModalFromRoute.propTypes = {
  handleRouteBeer: propTypes.func.isRequired,
};

export default ModalFromRoute;

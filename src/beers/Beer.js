import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../loader/Loader';
import './Beer.scss';

class Beer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
    this.handleImagLoad = this.handleImagLoad.bind(this);
  }

  handleImagLoad() {
    this.setState({ isLoading: false });
  }

  render() {
    return (
      <div
        className="item"
        id={this.props.id}
        onClick={this.props.openModal.bind(this, this.props)}
        role="presentation"
      >
        <Loader isLoading={this.state.isLoading} />
        <img
          className="item_img"
          src={this.props.image_url}
          alt="beer should be here..."
          onLoad={this.handleImagLoad}
        />
        <div className="item_description">
          <div className="item_h1">{this.props.name}</div>
          <div className="item_h5">{this.props.tagline}</div>
        </div>
      </div>
    );
  }
}

Beer.propTypes = {
  name: PropTypes.string.isRequired,
  tagline: PropTypes.string.isRequired,
  image_url: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default Beer;

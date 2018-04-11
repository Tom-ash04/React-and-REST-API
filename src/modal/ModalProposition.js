import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../loader/Loader';

class ModalProposition extends React.Component {
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
        className="modal_proposition"
        id={`modal_proposition${this.props.id}`}
      >
        <Loader isLoading={this.state.isLoading} />
        <img
          className="modal_proposition_img"
          src={this.props.image_url}
          alt="beer should be here..."
          onLoad={this.handleImagLoad}
        />
        <p>{this.props.name}</p>
      </div>
    );
  }
}

ModalProposition.propTypes = {
  name: PropTypes.string.isRequired,
  image_url: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default ModalProposition;

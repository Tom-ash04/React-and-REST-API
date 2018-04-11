import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Loader from '../loader/Loader';
import ModalPropozition from './ModalProposition';
import './Modal.scss';


class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      moreBeers: [],
    };
    this.handleImagLoad = this.handleImagLoad.bind(this);
  }

  componentDidMount() {
    fetch(`https://api.punkapi.com/v2/beers?abv_gt=${Math.ceil(this.props.abv)}&ibu_gt=${Math.ceil(this.props.ibu)}&ebc_gt=${Math.ceil(this.props.ebc)}`)
      .then(resp => resp.json())
      .then(data =>
        this.setState(prevState => ({ moreBeers: prevState.moreBeers.concat(data) })));
  }

  handleImagLoad() {
    this.setState({ isLoading: false });
  }

  render() {
    return (
      <div>
        <Link to="/dist/">
          <div
            className="modal_close"
            onClick={this.props.closeModal.bind(this)}
            role="presentation"
          >X
          </div>
        </Link>
        <div className="modal_container">
          <Loader isLoading={this.state.isLoading} />
          <img
            className="modal_MainImg"
            alt="beer"
            src={this.props.image_url}
            onLoad={this.handleImagLoad}
          />
          <div className="modal_Description">
            <h1>{this.props.name}</h1>
            <h3>{this.props.tagline}</h3>
            <div className="modal_Description_Details">
              <h4>IBU:</h4><p>{this.props.ibu}</p>
              <h4>ABV:</h4><p>{this.props.abv}%</p>
              <h4>EBC:</h4><p>{this.props.ebc}</p>
            </div>
            <p>{this.props.description}</p>
            <h4>Best served with:</h4>
            <div className="servings">
              {this.props.food_pairing.map(item => (
                <p key={`pairing${Math.random()}`}>{`-${item}`}</p>
              ))}
            </div>
          </div>
        </div>
        <div className="modal_MoreBeers">
          <h4>You might also like:</h4>
          <div className="modal_MoreBeers_List">
            {this.state.moreBeers.map((item, index) => {
              if (index < 3) {
                return <ModalPropozition key={item.id} {...item} />;
              }
              return null;
            })}
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  image_url: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  tagline: propTypes.string.isRequired,
  ibu: propTypes.number.isRequired,
  abv: propTypes.number.isRequired,
  ebc: propTypes.number.isRequired,
  description: propTypes.string.isRequired,
  food_pairing: propTypes.array.isRequired,
  closeModal: propTypes.func.isRequired,
};

export default Modal;

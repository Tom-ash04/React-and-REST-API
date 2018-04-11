import React from 'react';
import fetch from 'isomorphic-fetch';
import ReactModal from 'react-modal';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.scss';
import Beer from './beers/Beer';
import MoreBeers from './beers/MoreBeers';
import Modal from './modal/Modal';
import ModalFromRoute from './modal/ModalFromRoute';

ReactModal.setAppElement('#root');

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      beers: [],
      amount: 1,
      canLoad: true,
      lastPage: false,
      showModal: false,
      clickedBeer: {
        image_url: '#',
        name: '',
        tagline: '',
        ibu: 0,
        abv: 0,
        ebc: 0,
        description: '',
        food_pairing: [],
      },
    };

    this.loadMore = this.loadMore.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentDidMount() {
    fetch('https://api.punkapi.com/v2/beers?page=1&per_page=20')
      .then(resp => resp.json())
      .then(data =>
        this.setState({
          beers: data,
          amount: 2,
        }));

    window.addEventListener('scroll', this.loadMore);
  }

  handleOpenModal(param) {
    this.setState({ showModal: true });
    this.setState({ clickedBeer: param });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  loadMore() {
    if ((document.documentElement.scrollHeight - 200) <=
    (window.scrollY + window.innerHeight) && this.state.canLoad) {
      this.setState({ canLoad: false });
      this.setState(prevState => ({ amount: prevState.amount + 1 }));

      fetch(`https://api.punkapi.com/v2/beers?page=${this.state.amount}&per_page=20`)
        .then(resp => resp.json())

        .then((data) => {
          this.setState(prevState => ({
            beers: prevState.beers.concat(data),
            canLoad: true,
          }));

          if (data.length < 20) {
            this.setState({ lastPage: true });
          }
        });
    }
  }

  render() {
    return (
      <Router>
        <div className="container">
          <h1 className="appTitle">BEER<span>APP</span></h1>
          <Route
            path="/dist/:name"
            render={props => (
              <ModalFromRoute {...props} handleRouteBeer={this.handleOpenModal} />
            )}
          />
          {this.state.beers.map(item => (
            <Beer
              {...item}
              key={item.id}
              openModal={this.handleOpenModal}
            />
          ))}
          <MoreBeers
            lastPage={this.state.lastPage}
          >
            <p>More beers soon...</p>
          </MoreBeers>
          <ReactModal
            isOpen={this.state.showModal}
            onRequestClose={this.handleCloseModal}
            contentLabel="Beer Modal"
            overlayClassName={{
              base: 'Overlay',
              afterOpen: 'show',
            }}
            className={{
              base: 'Modal',
              afterOpen: 'show',
            }}
          >
            <Modal {...this.state.clickedBeer} closeModal={this.handleCloseModal} />
          </ReactModal>
        </div>
      </Router>
    );
  }
}

export default App;

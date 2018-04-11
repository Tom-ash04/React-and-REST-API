import React from 'react';
import propTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import './Loader.scss';

const transitionStyles = {
  exiting: { opacity: 1 },
  exited: { opacity: 0 },
};

const beerFill = {
  exited: { animation: 'none' },
};

const Loader = props =>
  (
    <Transition in={props.isLoading} timeout={300}>
      { state => (
        <div
          className="wrapper"
          style={transitionStyles[state]}
        >
          <div className="glass-wrapper">
            <div className="glass">
              <div
                className="beer"
                style={beerFill[state]}
              >
                <div className="foam">
                  <span className="foambubble" />
                  <span className="foambubble" />
                  <span className="foambubble" />
                  <span className="foambubble" />
                  <span className="foambubble" />
                </div>
              </div>
            </div>
          </div>
        </div>
        )
      }
    </Transition>
  );

Loader.propTypes = {
  isLoading: propTypes.bool.isRequired,
};

export default Loader;

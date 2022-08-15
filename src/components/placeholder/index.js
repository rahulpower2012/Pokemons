import '../pokemon-card/index.scss';
import {useState, useEffect} from 'react';

function PlaceHolder() {

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <div className="card-front">
            <div className="image-container" style={{
                          "display": "flex",
                          "flexDirection": "row",
                          "alignItems": "center",
                          "justifyContent": "space-evenly"
            }}>
              Scroll to load more...
            </div>
          </div>
          <div className="card-back">
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceHolder;

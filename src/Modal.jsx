import React from "react";

class Modal extends React.Component {

    render() {
        return (
          <div>
            <div id="myModal" className="modal">
              <div className="modal-content">
                <span onClick={this.props.completeTransactio} className="close">&times;</span>
                <h2 style={{color: 'green'}}>Transaction Successful!</h2>
              </div>
            </div>
          </div>
        );
    }
}

export default Modal;
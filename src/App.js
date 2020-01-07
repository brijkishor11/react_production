import React from 'react';

//import component
import Modal from "./Modal";

//import product's images
import amul_ghee from "./images/amul_ghee.jpg";
import fortune_rice from "./images/fortune_rice.jpg";
import mother_dairy from "./images/mother_dairy.jpg";
import patanjali_shampoo from "./images/patanjali_shampoo.jpg";

//import css file for styling
import './App.css';

class App extends React.Component {

    state  = {
      productList: [
        {brandName: "Milkfood", productName: "Milfood Rich Desi Danedar Ghee (Carton)", quantity: 0, price: 408, mrp: 498, imageUrl: mother_dairy, offerText: 18},
        {brandName: "Grofers", productName: "Grofers Mother's Choice Desi Ghee", quantity: 0, price: 414, mrp: 450, imageUrl: fortune_rice, offerText: 8},
        {brandName: "Amul", productName: "Amul Pure Ghee (Carton)", quantity: 0, price: 439, mrp: 460, imageUrl: amul_ghee, offerText: 4.5},
        {brandName: "Patanjali", productName: "Patanjali Shudh Desi Ghee (Carton)", quantity: 0, price: 405, mrp: 450, imageUrl: patanjali_shampoo, offerText: 10}
      ],
      quantity: 0,
      total: 0,
      isModal: false,
      timer: null
    }

  addItem = (value, index) => {
    let that = this;
    if (value.quantity >= 0) {
      value.quantity = value.quantity + 1;
      let newPrice = value.quantity * value.price;
      value.newPrice = newPrice;
      document.getElementById(index).innerHTML = value.quantity;
      document.getElementById(
        "item_" + index
      ).innerHTML = `<b>RS ${newPrice}</b>`;
    }
    that.totalItems();
  };

  removeItem = (value, index) => {
    let that = this;
    if (value.quantity > 0) {
      value.quantity = value.quantity - 1;
      if (value.quantity !== 0) {
        let newPrice = value.quantity * value.price;
        value.newPrice = newPrice;
        document.getElementById(
          "item_" + index
        ).innerHTML = `<b>RS ${newPrice}</b>`;
      }
      document.getElementById(index).innerHTML = value.quantity;
      that.totalItems();
    }
  };

  totalItems = () => {
    let that = this;
    let numOfItems = 0,
      totalPrice = 0;
    that.state.productList.map((value, index) => {
      numOfItems += value.quantity;
      if (value.quantity > 0) totalPrice += value.newPrice;
    });
    that.setState({ quantity: numOfItems, total: totalPrice });
  };

  checkoutItems = flag => {
    let that = this;
    that.setState({ isModal: flag });
  };

  render() {
    let that = this;
    return (
      <div className="App">
        {!that.state.isModal &&
          that.state.productList.map((value, index) => {
            return (
              <div key={index} style={styles.container}>
                <div style={{ flex: 0.2 }}>
                  <img
                    alt="no"
                    src={value.imageUrl}
                    height="140px"
                    width="60%"
                  />
                  <p style={{ fontSize: 18 }}>{`${value.offerText}% OFF`}</p>
                </div>

                <div style={{ flex: 0.8 }}>
                  <div style={styles.subcontainer}>
                    <div
                      style={{
                        color: "green",
                        fontWeight: "bold",
                        fontSize: 23
                      }}
                    >
                      {value.brandName}
                    </div>
                    <div>{value.productName}</div>
                    <div>1 |</div>
                    <div>MRP {value.mrp}</div>
                    <div id={`item_${index}`}>
                      <b>RS {value.price}</b>
                    </div>
                    <div style={{ display: "flex" }}>
                      <button
                        className="button cart"
                        onClick={() => this.addItem(value, index)}
                      >
                        ADD CART
                      </button>
                      <button
                        className="button icon"
                        onClick={() => this.addItem(value, index)}
                      >
                        +
                      </button>
                      <div id={index} style={{ margin: "15px" }}>
                        {value.quantity}
                      </div>
                      <button
                        className="button icon"
                        onClick={() => this.removeItem(value, index)}
                      >
                        -
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        {!that.state.isModal && (
          <footer className="footer">
            <div style={{ flex: 0.8 }}>
              <div className="foot-container">Qty:{that.state.quantity}</div>
              <div className="foot-container" onClick={this.totalItems}>
                Total:{that.state.total}
              </div>
            </div>
            <div style={{ flex: 0.2 }}>
              <button
                className="button checkout"
                onClick={() => this.checkoutItems(true)}
              >
                CHECKOUT
              </button>
            </div>
          </footer>
        )}
        {this.state.isModal && (
          <Modal completeTransactio={() => this.checkoutItems(false)} />
        )}
      </div>
    );
  }
}


const styles = {
  container: {
    display: 'flex',
    padding: 12,
    textAlign: "center"

  },

  subcontainer: {
    display: 'flex',
    flexDirection: 'column',
    background: '#0000',
    textAlign: 'left',
    padding: 5
  }

}

export default App;

import React, { useState } from "react";
import "../assets/css/cartPage.css";
import sayur from "../assets/img/image3.png";
import { Link } from "react-router-dom";

function Cartpage() {
  const [count, setCount] = useState(1);
  const [value, setValue] = useState(0);
  const minHandler = () => {
    if (count === 1) {
      setCount(count - 0);
    } else {
      setCount(count - 1);
    }
    console.log(count);
  };
  const plusHandler = () => {
    setCount(count + 1);
    console.log(count);
  };
  const inputHandler = (e) => {
    setValue(e.target.value);
    setCount(count + value - 1);
    console.log(count);
  };

  return (
    <section id="cart-page">
      <div className="cart-container container">
        <div className="cart-header">
          <div className="row d-flex">
            <div className="col-4">Produk</div>
            <div className="col-2">Harga Satuan</div>
            <div className="col-3">Kuantitas</div>
            <div className="col-2">Total Harga</div>
            <div className="col-1">Aksi</div>
          </div>
        </div>
        <div className="cart-body">
          <div className="d-flex row justify-content-center align-items-center">
            <div className="col-4">
              <img src={sayur} alt="product" className="pb-2" />
              <h6>nama produk</h6>
            </div>
            <div className="col-2">Harga Satuan</div>
            <div className="col-3">
              <div className="d-flex justify-content-center">
                <button className="btn-kuantitas" onClick={minHandler}>
                  -
                </button>
                <input
                  type="number"
                  className="kuantitas"
                  value={count}
                  onChange={inputHandler}
                />
                <button className="btn-kuantitas" onClick={plusHandler}>
                  +
                </button>
              </div>
            </div>
            <div className="col-2">Total Harga</div>
            <div className="col-1">
              <button className="btn-aksi">Hapus</button>
            </div>
          </div>
        </div>

        <div className="d-flex flex-row-reverse">
          <Link className="btn-checkout col-3" to="/checkout">
            Checkout
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Cartpage;

import React, { useState, useEffect } from "react";
import "../assets/css/checkoutPage.css";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import swal from "sweetalert";

function Checkoutpage() {
  const [listOrder, setListOrder] = useState(null);
  const [totaPrice, setTotalPrice] = useState(null);
  const idUser = localStorage.getItem("id");

  const makePayment = (token) => {
    const body = {
      token,
      listOrder,
    };

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/checkout`, body, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        console.log(token);
        window.location.href = "/invoicePembeli";
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    console.log(idUser);
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/showCart/${idUser}`)
      .then((response) => {
        setListOrder(response.data);
        console.log(response.data);
        const itemPrice = response.data.reduce((a, c) => a + c.total_price, 0);
        setTotalPrice(itemPrice);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [idUser]);
  const deleteHandler = (id_cart) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary product!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`${process.env.REACT_APP_BACKEND_URL}/deleteCart/${id_cart}`)
          .then((response) => {
            console.log(response);
            const order = [...listOrder];
            const index = order.findIndex((list) => list.id_cart === id_cart);
            order.splice(index, 1);
            setListOrder(order);
          })
          .catch((error) => {
            console.log(error);
          });
        swal("Poof! Your order has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your order is safe!");
      }
    });
    console.log(id_cart);
  };

  return (
    <>
      <section id="checkout-page" style={{ paddingBottom: "15%" }}>
        <div className="checkout-container container">
          <div className="cart-header">
            <div className="d-flex">
              <div className="col-5">Produk</div>
              <div className="col-2">Harga Satuan</div>
              <div className="col-3">Kuantitas</div>
              <div className="col-2">Total Harga</div>
            </div>
          </div>
          {listOrder ? (
            <div className="cart-body py-5">
              {listOrder.map((list) => (
                <div className="d-flex justify-content-center align-items-center">
                  <div className="col-5">
                    <img
                      src={list.product.foto}
                      alt="product"
                      className="pb-2"
                      height="300px"
                      width="300px"
                    />
                    <h6>{list.product.nama_barang}</h6>
                  </div>
                  <div className="col-2">
                    Rp {list.product.harga_barang.toLocaleString()}
                  </div>
                  <div className="col-3">
                    <div className="d-flex justify-content-center">
                      <strong>{list.qty}</strong>
                    </div>
                  </div>
                  <div className="col-2">
                    <strong>Rp. {list.total_price.toLocaleString()}</strong>
                    <button
                      className="btn btn-sm btn-warning mt-2"
                      style={{ color: "white" }}
                      onClick={() => deleteHandler(list.id_cart)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <h1>Keranjang Masih Kosong</h1>
          )}
        </div>
      </section>
      <div className="buat-pesanan py-5" style={{ zIndex: "2" }}>
        <div className="row d-flex justify-content-between">
          <div className="col-lg-6 col-sm-12">
            <br />
            <div className="row d-flex">
              <div className="col-lg-4">
                Jasa Kurir :
                <select className="w-100">
                  <option value="jne">JNE</option>
                  <option value="jnt">J&T</option>
                  <option value="sicepat">SiCepat</option>
                  <option value="gojek">Gojek</option>
                </select>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-sm-12">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-5 col-12">
                Total Harga : <strong>Rp {totaPrice}</strong>
              </div>
            </div>
            <br />

            <div className="row d-flex justify-content-end">
              <div className="col-12 col-lg-7">
                <StripeCheckout
                  stripeKey="pk_test_51IhwCdAOjVh90cSMv79k3OU3vc2a3nhyzQIsJdVckef6KOB3oohiw9cJ1BuuXjCfbpM3oFUFH2CLyNYMkZjpEH2500VdvfZlGp"
                  token={makePayment}
                  name="Checkout"
                  amount={totaPrice * 100}
                  currency="idr"
                >
                  <button
                    className="btn btn-warning"
                    style={{ color: "white" }}
                  >
                    Checkout
                  </button>
                </StripeCheckout>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkoutpage;

import { useState, useEffect } from "react";
// import sayur from "../assets/img/image3.png";
import "../assets/css/thumb_card_costumer.css";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";

function ProdukCostumer(props) {
  const [productUser, setProductUser] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/productToko/${props.idToko}`)
      .then((response) => {
        setProductUser(response.data);
        // console.log("product user")
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.idToko]);


  const deleteHandler = (id_barang) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary product!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`${process.env.REACT_APP_BACKEND_URL}/deleteProduct/${id_barang}`, {
            withCredentials: true,
          })
          .then((response) => {
            console.log(response);
            const products = [...productUser];
            const index = products.findIndex(
              (product) => product.id_barang === id_barang
            );
            products.splice(index, 1);
            setProductUser(products);
          })
          .catch((error) => {
            console.log(error);
          });
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary product is safe!");
      }
    });
    console.log(id_barang);
  };
  return (
    <section id="produk-costumer">
      <div className="container-fluid px-0  px-lg-2 ">
        <h1 className="mt-5 ml-4">Produk Anda</h1>
        {productUser.length !== 0 ? (
          <div className="row no-gutters ">
            {productUser.map((productUser) => (
              <div
                key={productUser.id_toko}
                className="col-6 col-sm-4 col-lg-3 col-md-4 "
              >
                <div className=" mx-sm-1 mx-md-1 mx-0">
                  <div className="card  mt-3" style={{ height: "420px" }}>
                    {
                      <div
                        style={{
                          height: "250px",
                          backgroundImage: `url(${productUser.foto})`,
                          backgroundSize: "cover",
                        }}
                        className="product-costumer-handler"
                      >
                        <button
                          className="btn btn-warning"
                          style={{ color: "white", width: "85px" }}
                          onClick={() => deleteHandler(productUser.id_barang)}
                        >
                          Delete
                        </button>{" "}
                        <Link to={`/editProduct/${productUser.id_barang}`}>
                          <button
                            className="btn btn-primary"
                            style={{ color: "white" }}
                          >
                            Edit
                          </button>
                        </Link>
                      </div>
                    }
                    <div className="card-body">
                      <h5 className="card-title font-weight-bold">
                        {productUser.nama_barang}
                      </h5>
                      <p className="card-text">
                        <span>
                          <strong>Stok: </strong>
                        </span>
                        <span>{productUser.qty}</span>
                      </p>
                      <p className="price">
                        <strong>Rp {productUser.harga_barang.toLocaleString()}</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-container"></div>
        )}
      </div>
    </section>
  );
}

export default ProdukCostumer;

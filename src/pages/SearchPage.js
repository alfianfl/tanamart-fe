import { useState, useEffect } from "react";
import "../assets/css/cardProduct.css";
import queryString from "query-string";
import { Link } from "react-router-dom";
import Banner from "../components/BannerHome";
import ProductCard from "../components/ProductCard";
import axios from "axios";

function SearchPage(props) {
  const [products, setProducts] = useState([]);
  let path = props.location.search;
  let params = queryString.parse(path);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/product/search/${params.query}`)
      .then((response) => {
        setProducts(response.data);
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.query]);

  return (
    <div>
      <section id="marketplace-product">
        <h1 className="mt-5 ml-3">Hasil Pencarian</h1>
        <div className="container-fluid ">
          <div className="row row-cols-1 row-cols-md-4 g-4">
            {products.length !== 0
              ? products.map((product) => (
                  <Link
                    className="link"
                    to={`/detailproduk/${product.id_barang}`}
                  >
                    <div className="col">
                      <div key={product.id_barang} className="card my-2">
                        {product.foto.includes("foto_barang") ? (
                          <div
                            className="thumb-img-product d-flex justify-content-center align-items-center"
                            style={{
                              backgroundImage: ` url(${product.foto})`,
                              height: "250px",
                              backgroundSize: "100% 100%",
                              backgroundRepeat: "no-repeat",
                            }}
                          >
                            <div className="button-beli">
                              <button className="btn ">Beli Produk</button>
                            </div>
                          </div>
                        ) : (
                          <img
                            height="250px"
                            className="card-img-top"
                            src={""}
                            alt="Card"
                          />
                        )}
                        <div className="card-body ">
                          <h5 className="card-title font-weight-bold">
                            {product.nama_barang}
                          </h5>
                          <p className="card-text">
                            <span>
                              4.6<i class="fas fa-star"></i>
                              <i class="fas fa-star"></i>
                              <i class="fas fa-star"></i>
                              <i class="fas fa-star"></i>
                              <i class="fas fa-star"></i>
                            </span>
                          </p>
                          <p className="price">
                            <strong>Rp {product.harga_barang}/kg</strong>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              : (
                <div className="ml-5">
                  <h6>Barang tidak ditemukan</h6>
                </div>
              )}
          </div>
        </div>
      </section>
      <Banner />
      <div className="my-5">
        <h1 className="ml-3 mt-5">Produk Pilihan Kami</h1>
        <ProductCard />
      </div>
    </div>
  );
}

export default SearchPage;

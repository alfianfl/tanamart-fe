import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import "../assets/css/cardProduct.css";
import { Link } from "react-router-dom";
import axios from "axios";

function ProductCard() {
  const [products, setProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 8;
  const pagesVisited = pageNumber * usersPerPage;

  const pageCount = Math.ceil(products.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/product`)
      .then((response) => {
        setProducts(response.data);
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <section id="marketplace-product">
        <div className="container-fluid ">
          <div className="row row-cols-1 row-cols-md-4 g-4">
            {products
              .slice(pagesVisited, pagesVisited + usersPerPage)
              .map((product) => (
                <>
                  <Link
                    className="link"
                    to={`/detailproduk/${product.id_barang}`}
                  >
                    <div className="col">
                      <div
                        key={product.id_barang}
                        className="card my-2"
                        style={{ height: "400px" }}
                      >
                        {product.foto ? (
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
                          {/* <p className="card-text">
                            <span>
                              4.6<i class="fas fa-star"></i>
                              <i class="fas fa-star"></i>
                              <i class="fas fa-star"></i>
                              <i class="fas fa-star"></i>
                              <i class="fas fa-star"></i>
                            </span>
                          </p> */}

                          <p style={{ fontSize: "12px", color: "grey" }}>
                            {product.toko.nama_toko}
                          </p>
                          <p className="card-text" style={{ fontSize: "14px" }}>
                            Stok: {product.qty.toLocaleString()}
                          </p>
                          <p className="price">
                            <strong>
                              Rp {product.harga_barang.toLocaleString()}
                            </strong>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </>
              ))}
          </div>
        </div>
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
      </section>
    </div>
  );
}

export default ProductCard;

import { useReducer } from "react";
import axios from "axios";

const initialState = {
  nama_barang: "",
  harga_barang: null,
  qty: null,
  foto_barang: null,
};
const reducer = (currentState, action) => {
  switch (action.type) {
    case "namabarang":
      return { ...currentState, nama_barang: action.payload };
    case "hargabarang":
      return { ...currentState, harga_barang: action.payload };
    case "qty":
      return { ...currentState, qty: action.payload };
    case "fotobarang":
      return { ...currentState, foto_barang: action.payload };
    default:
      return currentState;
  }
};

function DummyAddProduct() {
  const [products, dispatch] = useReducer(reducer, initialState);
  const onSubmitHandeler = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("id_user", 4);
    data.append("nama_barang", products.nama_barang);
    data.append("harga_barang", products.harga_barang);
    data.append("foto", products.foto_barang);
    data.append("qty", products.qty);

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/addProduct`, data)
      .then((response) => {
        alert("upload berhasil");
      })
      .catch((err) => {
        alert("upload gagal");
        console.log(err);
      });
  };

  return (
    <div>
      <form>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">nama barang</label>
          <input
            name="namabarang"
            onChange={(e) =>
              dispatch({ type: "namabarang", payload: e.target.value })
            }
            value={products.nama_barang}
            type="text"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">harga barang</label>
          <input
            name="hargabarang"
            onChange={(e) =>
              dispatch({ type: "hargabarang", payload: e.target.value })
            }
            value={products.harga_barang}
            type="number"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">QTY</label>
          <input
            name="qty"
            onChange={(e) => dispatch({ type: "qty", payload: e.target.value })}
            value={products.qty}
            type="number"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">foto</label>
          <input
            name="fotobarang"
            accept="image/*"
            onChange={(e) =>
              dispatch({ type: "fotobarang", payload: e.target.files[0] })
            }
            type="file"
            className="form-control"
          />
        </div>
        <button
          onClick={onSubmitHandeler}
          type="submit"
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default DummyAddProduct;

import ListDiskon from "../components/ListDiskon";
import ProductCard from "../components/ProductCard";
import ProductList from "../components/productList";
function ListProduk() {
  return (
    <div className="mb-5">
      {/* detail diskon pada page list Produk */}
      <ListDiskon />
      <h1 className="ml-lg-5 ml-0 mt-5">Tanaman Pilihan Tanamart</h1>
      <ProductList />
      {/* detail product */}
      <h1 className="ml-lg-5 ml-0 mt-5">Tanaman Pilihan Tanamart</h1>
      <ProductCard />
    </div>
  );
}

export default ListProduk;

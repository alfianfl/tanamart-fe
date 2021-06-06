import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "../components/Navbar";
import Homepage from "../pages/Homepage";
import Profile from "../pages/Profilepage";
import ListProduk from "../pages/ListProduk";
import Footer from "../components/Footer";
import EditProfile from "../components/Editprofile";
import Keranjang from "../pages/Cartpage";
import Checkout from "../pages/Checkoutpage";
import Toko from "../pages/TokoPage";
import EditToko from "../pages/EditToko";
import TambahProduk from "../pages/AddProduk";
import DetailProduk from "../pages/DetailProductPage";
import VideoPage from "../pages/VideoPage";
import Forum from "../pages/ForumPage";
import AddThread from "../pages/AddThread";
import SingleThread from "../pages/SingleThreadPage";
import Videoplayer from "../pages/VideoPlayer";
import TokoInvoice from "../pages/TokoInvoice";
import PembeliInvoice from "../pages/PembeliInvoice";
import Artikel from "../pages/Artikel";
import DetailArtikel from "../pages/DetailArtikel";
import EditProduct from "../pages/EditProduct";
import NavAdmin from "../components/admin/NavbarAdmin";
import ArtikelAdmin from "../pages/admin/ArtikelAdmin";
import UserAdmin from "../pages/admin/UserAdmin";
import ProdukAdmin from "../pages/admin/ProdukAdmin";
import AddArtikel from "../pages/admin/AddArtikel";
import SearchPage from "../pages/SearchPage";
import Sidebar from "../components/admin/SidebarAdmin";
import Dashboard from "../pages/admin/DashboardAdmin";
import EditArtikel from "../pages/admin/EditArtikel";
import EditThread from "../pages/EditThread";
import AboutUs from '../pages/AboutUs';

function Routes() {
  const [idUser, setIdUser] = useState(false);
  const [idToko, setIdToko] = useState(false);

  const localDataRole = localStorage.getItem("role");
  console.log(localDataRole);

  const getId = (id) => {
    setIdUser(id);
  };
  const getToko = (tokoID) => {
    setIdToko(tokoID);
  };

  return (
    <div>
      {localDataRole == 1 ? (
        <Router>
          <NavAdmin user_id={idUser} />
          <Sidebar></Sidebar>
          <Switch>
            <Route path="/" exact component={Dashboard}></Route>
            <Route
              path="/dashboard/artikel"
              exact
              component={ArtikelAdmin}
            ></Route>
            <Route path="/dashboard/user" component={UserAdmin}></Route>
            <Route path="/dashboard/produk" component={ProdukAdmin}></Route>
            <Route
              path="/dashboard/artikel/add"
              component={() => <AddArtikel idUser={idUser} />}
            ></Route>
            <Route
              path="/editArtikel/:id_artikel"
              component={EditArtikel}
            ></Route>
          </Switch>
        </Router>
      ) : (
        <Router>
          {/* navbar */}
          <Navbar idUser={(id) => getId(id)} />

          {/* body */}
          <Switch>
            <Route
              path="/"
              exact
              component={() => <Homepage idUser={idUser} />}
            ></Route>
            <Route path="/search" component={SearchPage}></Route>
            <Route path="/keranjang" component={Keranjang}></Route>
            <Route
              path="/checkout"
              component={() => <Checkout idUser={idUser} />}
            ></Route>
            <Route
              path="/detailproduk/:id_barang"
              component={(props) => <DetailProduk idUser={idUser} {...props} />}
            ></Route>
            <Route path="/forum" component={Forum}></Route>
            <Route
              path="/tokoInvoice"
              component={() => <TokoInvoice idUser={idUser} />}
            ></Route>
            <Route
              path="/invoicePembeli"
              exact
              component={() => <PembeliInvoice idUser={idUser} />}
            ></Route>
            <Route
              path="/profile"
              component={() => <Profile idUser={idUser} />}
            ></Route>
            <Route path="/listProduk" component={ListProduk}></Route>
            <Route path="/videoPage" component={VideoPage}></Route>
            <Route
              path="/toko"
              component={() => <Toko idUser={idUser} />}
            ></Route>
            <Route
              path="/editprofile"
              component={() => <EditProfile idUser={idUser} />}
            ></Route>
            <Route
              path="/editToko"
              component={() => (
                <EditToko
                  getIdToko={(tokoID) => getToko(tokoID)}
                  idUser={idUser}
                />
              )}
            ></Route>
            <Route
              path="/addProduk"
              component={() => <TambahProduk idUser={idUser} idToko={idToko} />}
            ></Route>
            <Route
              path="/editProduct/:id_barang"
              component={(props) => <EditProduct idUser={idUser} {...props} />}
            ></Route>
            <Route
              path="/addThread"
              component={() => <AddThread idUser={idUser} />}
            ></Route>
            <Route
              path="/singleThread/:idThreads"
              component={(props) => <SingleThread idUser={idUser} {...props} />}
            ></Route>
            <Route path="/videoPlayer/:id" component={Videoplayer}></Route>
            <Route path="/artikel" component={Artikel}></Route>
            <Route
              path="/detailArtikel/:id_artikel"
              component={DetailArtikel}
            ></Route>
            <Route
              path="/editThread/:id_thread"
              component={(props) => <EditThread idUser={idUser} {...props} />}
            ></Route>
            <Route path="/about" component={AboutUs} ></Route>
          </Switch>

          {/* footer */}
          <Footer />
        </Router>
      )}
    </div>
  );
}

export default Routes;

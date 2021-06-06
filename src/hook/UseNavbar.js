import { useState } from "react";
import { Link } from "react-router-dom";

function useNavbar() {
  const [modal, setModal] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);
  const [appState] = useState({
    activeObjects: null,
    objects: [
      {
        id: (
          <Link className="nav-link" to="/listProduk">
            Produk
          </Link>
        ),
      },
      {
        id: (
          <Link className="nav-link" to="/forum">
            Forum
          </Link>
        ),
      },
      {
        id: (
          <Link className="nav-link" to="/videoPage">
            Video
          </Link>
        ),
      },
      {
        id: (
          <Link className="nav-link" to="/artikel">
            Artikel
          </Link>
        ),
      },
    ],
  });
  const toggle = () => {
    setModal(!modal);
  };

  const loggedInHandler = () => {
    setLoggedIn(true);
    console.log(loggedIn);
  };
  return [appState, toggle, modal, loggedInHandler, loggedIn];
}

export default useNavbar;

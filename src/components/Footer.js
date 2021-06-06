import React from "react";
import "../assets/css/footer.css";
import logo from "../assets/img/Logo.svg";
import { Icon } from "@iconify/react";
import instagramFilled from "@iconify/icons-ant-design/instagram-filled";
import facebookFilled from "@iconify/icons-ant-design/facebook-filled";
import twitterFilled from "@iconify/icons-ant-design/twitter-circle-filled";
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
      <div
        className="row mx-auto pt-5 pb-5 footer"
        style={{ backgroundColor: "#184D47", width: "100%" }}
      >
        <div className="col-lg-12">
          <div className="nav-footer">
            <div className="row ">
              <div className="col-lg-12 ">
                <div className=" list-footer-nav">
                  <ul>
                    <li>
                      <img src={logo} width="100px" alt="gambar" />
                    </li>
                    <li style={{ color: "#fff" }}>
                      © 2021 | All Rights Reserved
                    </li>
                    <li style={{ color: "#fff" }}>
                      PT TanamTanamUbi Indonesia
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <p>Karier</p>
                    </li>
                    <li>
                      <Link className="footer-link" to="/about">Tentang Kami</Link>
                    </li>
                    <li>Blog</li>
                    <li>FAQ</li>
                  </ul>
                  <ul>
                    <li>
                      <p>Bantuan</p>
                    </li>
                    <li>Syarat dan Ketentuan</li>
                    <li>Kebijakan Privasi</li>
                  </ul>
                  <ul>
                    <li>
                      <p>Kemitraan</p>
                    </li>
                    <li>Ajukan Kemitraan</li>
                    <li>Program Afiliasi</li>
                  </ul>
                  <ul>
                    <li>
                      <p>Media Sosial Kami</p>
                    </li>
                    <li className="d-flex justify-space-between">
                      <Icon
                        icon={instagramFilled}
                        style={{ color: "#d6efc7", fontSize: "19px" }}
                      />
                      <Icon
                        icon={facebookFilled}
                        style={{ color: "#d6efc7", fontSize: "19px" }}
                      />
                      <Icon
                        icon={twitterFilled}
                        style={{ color: "#d6efc7", fontSize: "19px" }}
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;

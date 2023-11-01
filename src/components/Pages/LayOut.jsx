import Dropdown from "react-bootstrap/Dropdown";
import "./../../styles/LayOut.css";
import { BiUserCircle } from "react-icons/bi";
import { BsCart3 } from "react-icons/bs";
import { AiTwotoneHeart, AiOutlineHeart } from "react-icons/ai";
import { TbLogin } from "react-icons/tb";
import { MdPersonAdd } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import logo from "./../../assets/logo1.png";

function LayOut() {
  const cartCount = useSelector((state) => state.cartStore.cartCount);
  const wishCount = useSelector((state) => state.wishStore.wishCount);
  const [checkLogin, setCheckLogin] = useState(false);
  const [user, setUser] = useState(null);
  const nav = useNavigate();

  const [searchKey, setSearchKey] = useState(null);
  //check whether token is present - if logged in, token is set else returns null
  const loginToken = localStorage.getItem("token");
  useEffect(() => {
    if (loginToken) {
      setCheckLogin(true);
      const userName = localStorage.getItem("user");
      setUser(userName);
    } else {
      setCheckLogin(false);
      setUser("");
    }
  }, [loginToken]);

  function handleLogout() {
    setCheckLogin(false);
    localStorage.clear();
  }

  function searchHandler(e) {
    e.preventDefault();
    setSearchKey(e.target.value);
    nav("/all");
  }

  return (
    <div id="layout">
      <h1 id="heading-first" className="flex gap-3 items-center basis-1/3">
        <img src={logo} alt="logo" height="7%" width="7%" />
        <div>
          <span style={{ color: "#80B3FF" }}>SHOP</span>
          <span style={{ color: "white" }}>LANE</span>
        </div>
      </h1>
      <div className={!checkLogin ? "m-3 flex basis-1/2" : "m-3 flex"}>
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            placeholder="Search..."
            onChange={searchHandler}
          />
          <div>
            {searchKey ? (
              <Link to={`/search/${searchKey}`}>
                <button class="btn btn-primary" type="button">
                  Search
                </button>
              </Link>
            ) : (
              <button class="btn btn-primary" type="button">
                Search
              </button>
            )}
          </div>
        </div>
      </div>
      <div id="right-layout">
        {!checkLogin ? (
          <div>
            <Dropdown id="drop-login">
              <Dropdown.Toggle variant="null" id="LayoutStyle">
                <BiUserCircle style={{ fontSize: "3em" }} />
                <div>
                  <h5 id="loginName">Login</h5>
                  <h6 id="signupName">or Sign Up</h6>
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu id="drop-resp">
                {/* added tailwind css to single classname and added */}
                <Dropdown.Item
                  className="dropDown"
                  href="#/action-1"
                  onClick={() => nav("/login")}
                >
                  <TbLogin /> Login
                </Dropdown.Item>
                <Dropdown.Item
                  className="dropDown"
                  href="#/action-2"
                  onClick={() => nav("/signup")}
                >
                  <MdPersonAdd /> Sign Up
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  className="dropDown"
                  href="#/action-3"
                  onClick={() => nav("/cart")}
                >
                  <BsCart3 /> Cart
                </Dropdown.Item>
                <Dropdown.Item
                  className="dropDown"
                  href="#/action-3"
                  onClick={() => nav("/wish")}
                >
                  <AiOutlineHeart /> Favourites
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <div id="loginOut">
              <Button onClick={() => nav("/login")}>Login</Button>
              <br />
              <Button onClick={() => nav("/signup")}>Sign Up</Button>
            </div>
          </div>
        ) : (
          <div id="welcome-note">
            <h2 id="note" className="m-1">
              Welcome {user}!!!
            </h2>
            <Button
              onClick={handleLogout}
              variant="light"
              className="btn-outline-danger"
            >
              Logout
            </Button>
          </div>
        )}

        <div style={{ display: "flex" }}>
          <div className="superScript">
            <AiTwotoneHeart
              className="right-icons"
              id="wishIcon"
              onClick={() => nav("/wish")}
            />
            <span className="text-white">{wishCount}</span>
          </div>
          <div className="superScript">
            <BsCart3
              className="right-icons text-white"
              onClick={() => nav("/cart")}
            />
            <span className="text-white">{cartCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LayOut;

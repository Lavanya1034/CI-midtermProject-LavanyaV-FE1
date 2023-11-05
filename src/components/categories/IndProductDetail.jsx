import { useParams } from "react-router-dom";
import "./../../styles/IndProductDetail.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { EndPoints } from "../../api/EndPoints";
import CartBtn from "./CartBtn";
import WishListBtn from "./WishListBtn";

function IndProductDetail() {
  const { id } = useParams();
  const [prodMatched, setProdMatched] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(() => {
    axios
      .get(EndPoints.INDPRODUCT_CATEGORY_URL + id)
      .then(
        (response) => {
          setProdMatched(response.data);
        },
        (error) => {
          console.log(error.response.data.message);
          setErr(error.response.data.message);
        }
      )
      .catch((err) => {
        console.log(err);
        setErr(err.message);
      });
  }, [id]);

  return (
    <div className="container d-flex justify-center items-center p-4">
      {err ? (
        <div
          style={{
            height: "25vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1 style={{ color: "red", textAlign: "center" }}>
            Error status encountered : {err}
          </h1>
        </div>
      ) : (
        <div id="eachIndProduct-detail">
          <div id="left-sec">
            <img
              id="image-size"
              src={prodMatched.image}
              alt="ProductImage"
            ></img>
          </div>
          <div id="right-sec" className="mt-3">
            <div className="d-flex flex-col">
              <span className="text-title text-xl">BRAND</span>
              <h1 id="tit" className="text-xl">
                {prodMatched.title}
              </h1>
              <p className="min-h-fit text-sm">{prodMatched.description}</p>
              <hr />
            </div>
            <div id="bottom-symbols">
              <div>
                <p style={{ color: "blue" }}>
                  <span>&#xFF04;</span>
                  {prodMatched.price}
                </p>
              </div>
              <div className="d-flex gap-2">
                <CartBtn prodMatched={prodMatched} />
                <WishListBtn prodMatched={prodMatched} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default IndProductDetail;

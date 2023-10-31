import { BsFillCartPlusFill } from "react-icons/bs";
import { BsFillCartDashFill } from "react-icons/bs";
import { BsFillTrash3Fill } from "react-icons/bs";

import "./../../styles/DisplayCartWish.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StarRatings from "react-star-ratings";

import {
  deleteCart,
  subtractQuantity,
  addQuantity,
} from "../../reducers/cartSlice";

import { deleteWish } from "../../reducers/wishSlice";
import PriceSummary from "./PriceSummary";
import CartBtn from "./CartBtn";

function DisplayCartWish({ cartWishproducts, cartOrWish }) {
  const dispatch = useDispatch();
  const nav = useNavigate();

  //when a product is removed from cart

  function handletrash(indexGot) {
    cartOrWish === "cart"
      ? dispatch(deleteCart(indexGot))
      : dispatch(deleteWish(indexGot));
  }

  //When plus symbol is clicked to add quantity
  function handleAdd(indexGot) {
    dispatch(addQuantity(indexGot));
  }

  //When minus symbol is clicked to subtract quantity
  function handleMinus(indexGot) {
    if (cartWishproducts[indexGot].quantity > 1) {
      dispatch(subtractQuantity(indexGot));
    } else {
      toast.warning(`Minimum 1 quantity`, {
        position: "bottom-center",
        autoClose: 2000,
        style: {
          background:"#FFFFDD",
          color: "black", // Change the text color
        },
      });
    }
  }

  return (
    <div className="data-output">
      <div
        className={
          cartOrWish == "cart" ? "left-outer" : "row container mediaChange"
        }
      >
        {cartWishproducts.map((prodMatched, ind) => (
          
          <div
            className={
              cartOrWish == "cart"
                ? "eachproduct-detail"
                : " card wishCardStyle"
            }
          >
            {console.log(prodMatched)}
            <div id="left-sec">
              <img
                id="image-size"
                src={prodMatched.image}
                alt="ProductImage"
              ></img>
            </div>
            <div id="right-sec">
              <h5 className="text-title" style={{ width: "100%" }}>
                {" "}
                Brand
              </h5>
              <div className="title-space">
                <h1 className="font-changing">{prodMatched.title}</h1>
              </div>
              {cartOrWish=="wish"&& 
              <div style={{width:"100%"}}>
                {console.log(prodMatched)}
                <StarRatings
                  rating={prodMatched.rating.rate} // The initial rating (you can change this dynamically)
                  starRatedColor="gold" // The color of the filled-in stars
                  // changeRating={(newRating) => console.log(newRating)} // Callback function when the rating changes
                  numberOfStars={5} // Total number of stars to display
                  name="rating" // Unique name for the rating input (required for accessibility)
                  starDimension="20px" // Customize the size of the stars
                  starSpacing="2px" // Customize the spacing between stars
                />
                <p>({prodMatched.rating.count})</p>
              </div>}
              <hr />
              <div id="bottom-sym">
                <p>
                  <span style={{ color: "green", fontWeight: "bolder" }}>
                    Price:{" "}
                  </span>{" "}
                  <span style={{ color: "rgb(152, 148, 148)" }}>&#xFF04;</span>
                  {/* to extract price decimal value and to display as superscript */}
                  <span>{prodMatched.price.toString().split(".")[0]}</span>
                  <sup style={{ color: "rgb(152, 148, 148)" }}>
                    {prodMatched.price.toString().split(".")[1]}
                  </sup>
                </p>
                {cartOrWish === "cart" && (
                  <div style={{ display: "flex" }}>
                    <BsFillCartDashFill
                      className="cart-sym"
                      style={{ color: "red" }}
                      onClick={() => handleMinus(ind)}
                    />
                    
                    <span className="border-gray-900 w-3 pl-2 pr-3 font-bold bg-sky-100">{prodMatched.quantity}</span>
                    <BsFillCartPlusFill
                      className="cart-sym"
                      style={{ color: "green" }}
                      onClick={() => handleAdd(ind)}
                    />
                  </div>
                )}

                {/* Button is added for wishlist page alone */}

                {cartOrWish == "wish" && (
                  <CartBtn prodMatched={prodMatched} />
                )}
        
                <div className="d-flex justify-center items-center">
                <BsFillTrash3Fill
                  onClick={() => handletrash(ind)}
                  
                  
                  className={`trash mb-2 ${cartOrWish == "cart"? "trashbtnCart":null}`}
                  
                />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {cartOrWish == "cart" && (
        <div id="right-outer">
          <PriceSummary
            cartOrWish={cartOrWish}
            cartWishproducts={cartWishproducts}
          />
        </div>
      )}
    </div>
  );
}

export default DisplayCartWish;

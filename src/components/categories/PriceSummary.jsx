import { useDispatch } from "react-redux";
import "./../../styles/PriceSummary.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { deleteAllCart } from "../../reducers/cartSlice";

function PriceSummary({ cartOrWish, cartWishproducts }) {
  const dispatch = useDispatch();
  const nav = useNavigate();

  //get the total price for cart details.

  let totPrice = 0.0;
  let shipAmt = 0.0;
  let taxAmt = 0.0;
  let totalAmt = 0.0;

  cartWishproducts.forEach((element) => {
    totPrice = totPrice + element.price * element.quantity;
  });
  if (totPrice > 0) {
    shipAmt = Math.floor(totPrice * 0.1);
    taxAmt = Math.floor(totPrice * 0.2);
    totalAmt = (totPrice + shipAmt + taxAmt).toFixed(2);
  }

  const handleCheckOut = () => {
    let tokens = localStorage.getItem("token");
    if (tokens) {
      toast(`Thanks for shopping, Visit Again!!!`, {
        position: "bottom-right",
        autoClose: 2000,
        style: {
          background: "#FFFD8C", // Change the background color
          color: "black", // Change the text color
        },
      });

      setTimeout(() => {
        //dispatch event to clear cart item
        dispatch(deleteAllCart());
        nav("/");
      }, 2000);
    } else {
      toast(`Please Login to Proceed Checkout`, {
        position: "bottom-right",
        autoClose: 2000,
        style: {
          background: "#FFFD8C", // Change the background color
          color: "black", // Change the text color
        },
      });

      setTimeout(() => {
        nav("/login");
      }, 2000);
    }
  };
  return (
    <div className="container summaryBorder">
      <h1 className="text-center" id="wishListHead">
        {cartOrWish === "cart" ? "Order Summary" : "WishList Summary"}
      </h1>
      <div>
        <div className="row price-values">
          <div className="col-sm-5">
            <h2 className="priceHeading">Subtotal</h2>
          </div>
          <div className="col-sm-5">
            <h4 className="priceVal">
              <span>&#xFF04;</span>
              {totPrice.toFixed(2)}
            </h4>
          </div>
        </div>
        <div className="row price-values">
          <div className="col-sm-5">
            <h2 className="priceHeading">Shipping Estimate</h2>
          </div>
          <div className="col-sm-5">
            <h4 className="priceVal">
              <span>&#xFF04;</span>
              {shipAmt.toFixed(2)}
            </h4>
          </div>
        </div>
        <div className="row price-values">
          <div className="col-sm-5">
            <h2 className="priceHeading">Tax Estimate</h2>
          </div>
          <div className="col-sm-5">
            <h4 className="priceVal">
              <span>&#xFF04;</span>
              {taxAmt.toFixed(2)}
            </h4>
          </div>
        </div>
        <div className="row price-values">
          <div className="col-sm-5">
            <h2 className="priceHeading">Total</h2>
          </div>
          <div className="col-sm-5">
            <h4 className="priceVal">
              <span>&#xFF04;</span>
              {totalAmt}
            </h4>
          </div>
        </div>
      </div>
      {cartOrWish === "cart" && (
        <div className="btn-move">
          <button
            id="checkOut"
            className="btn btn-center price-values"
            onClick={handleCheckOut}
          >
            Checkout
          </button>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default PriceSummary;

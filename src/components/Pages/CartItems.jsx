import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./../../styles/DisplayCartWish.css";
import DisplayCartWish from "../categories/DisplayCartWish";

function CartItems() {
  const cartProductsId = useSelector((state) => state.cartStore.cart);
  const nav = useNavigate();

  return (
    <div id="body-sec">
      {cartProductsId.length > 0 ? (
        <div>
          <DisplayCartWish
            cartWishproducts={cartProductsId}
            cartOrWish="cart"
          />
        </div>
      ) : (
        <div id="Empty-det">
          <p>Cart is Empty</p>
          <button id="btn-cont" onClick={() => nav("/")}>
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
}

export default CartItems;

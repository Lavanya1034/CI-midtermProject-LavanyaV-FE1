import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./../../styles/DisplayCartWish.css";
import DisplayCartWish from "../categories/DisplayCartWish";

function WishItems() {
  const wishProductsId = useSelector((state) => state.wishStore.wish);
  const nav = useNavigate();

  return (
    <div id="body-sec">
      {wishProductsId.length > 0 ? (
        <div>
          <DisplayCartWish
            cartWishproducts={wishProductsId}
            cartOrWish="wish"
          />
        </div>
      ) : (
        <div id="Empty-det">
          <p>WishList is Empty</p>
        </div>
      )}
    </div>
    
  );
}

export default WishItems;

import { useCart } from "./auth/CartContext";
import {useWishlist} from "./auth/WishlistContext";


function PerfumeCard({id, brand, prod_name, price, image, stock}) {
    const {wishlist, toggleWishlistItem} = useWishlist()
    const {cart, toggleCartItem} = useCart();
    const isWished = wishlist.some(item => item.id === id)
    const isAdded = cart.some(item => item.id === id)
    const isAvailable = stock > 0

    return(
        <div className="perfumeCard">
            <img src={image}/>
            <p>{brand}</p>
            <h4>{prod_name}</h4>
            <p>{price} lei</p>
            <p>
                {isAvailable ? `Current Stock: ${stock}` : "Sold Out"}
            </p>
            <button onClick={() => {toggleCartItem({id, brand, prod_name, price, image})}}
                disabled={!isAvailable}>
                {isAdded ? "Remove from cart" : "Add to cart"}
            </button>
            <button onClick={() => {toggleWishlistItem({id, brand, prod_name, price, image})}}
                disabled={!isAvailable}>
                {isWished ? "Remove from wishlist" : "Add to wishlist"}
            </button>
        </div>
    );
}

export default PerfumeCard;
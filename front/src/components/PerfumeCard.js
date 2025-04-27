import { useCart } from "./auth/CartContext";
import {useWishlist} from "./auth/WishlistContext";


function PerfumeCard({id, brand, name, price, image}) {
    const {wishlist, showWishlist} = useWishlist()
    const {cart, toggleCartItem} = useCart();
    const isWished = wishlist.some(item => item.id === id)
    const isAdded = cart.some(item => item.id === id)

    return(
        <div className="perfumeCard">
            <img src={image}/>
            <p>{brand}</p>
            <h4>{name}</h4>
            <p>{price} lei</p>
            <button onClick={() => {toggleCartItem({id, brand, name, price, image})}}>
                {isAdded ? "Remove from cart" : "Add to cart"}
            </button>
            <button onClick={() => {showWishlist({id, brand, name, price, image})}}>
                {isWished ? "Remove from wishlist" : "Add to wishlist"}
            </button>
        </div>
    );
}

export default PerfumeCard;
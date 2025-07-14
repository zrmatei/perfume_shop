import { useEffect, useState } from "react";
import { useCart } from "./context/CartContext";
import {useWishlist} from "./context/WishlistContext";


function PerfumeCard({id, brand, prod_name, price, image, stock}) {
    const {wishlist, toggleWishlistItem} = useWishlist()
    const {cart, toggleCartItem, removeFromCart} = useCart();
    const [selectedQuantity, setSelectedQuantity] = useState(1)
    const [isAdded, setIsAdded] = useState(false);
    const isWished = wishlist.some(item => item.id === id)
    const isAvailable = stock > 0
    let ml = 50

    useEffect(() => {
        setIsAdded(cart.some(item => item.id === id))
    }, [cart, id])

    if(brand.includes("Marly")){
        ml = 125
    } else if(brand.includes("Kurkdjian")){
        ml = 70
    } else if(brand.includes("Creed")){
        ml = 100
    }

    return(
        <div className="perfumeCard">
            <img src={image}/>
            <p>{brand}</p>
            <h4>{prod_name}, {ml}ml</h4>
            <p>{price} lei</p>
            <p>
                {isAvailable ? `Current Stock: ${stock}` : "Sold Out"}
            </p>
            <div>
                <select id="quantity-ordered" value={selectedQuantity} onChange={(e) => setSelectedQuantity(e.target.value)}>
                    {Array.from({length: stock}, (_, i) => (
                    <option key={i+1} value={i+1}>{i+1}</option>
                    ))}
                </select>
            </div>
            <button onClick={() => {
                if(isAdded){
                    removeFromCart(id);
                }else{
                    toggleCartItem({id, brand, prod_name, price, image, quantity: selectedQuantity})}}
                }
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
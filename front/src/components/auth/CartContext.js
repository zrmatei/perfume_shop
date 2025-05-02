import { createContext, useContext, useEffect, useState  } from "react";
import  {jwtDecode}  from "jwt-decode";

export const CartContext = createContext()

function getUserIdFromToken() {
    const token = localStorage.getItem("token")
    if(!token) return null;

    try {
        const {id, email} = jwtDecode(token);
        return id || email || null
    } catch (err) {
        console.log(err)
        return null;
    }
} 

function CartProvider({children}) {
    const [cart, setCart] = useState([])
    const [cartKey, setCartKey] = useState("visitor")

    const updateCartKey = () => {
        const uId = getUserIdFromToken();
        const currentCartKey = uId ? `cart_${uId}` : "visitor";
        setCartKey(currentCartKey)

        const storedCart = localStorage.getItem(currentCartKey);
        setCart(storedCart ? JSON.parse(storedCart) : []);
    }


    useEffect(() => {
        updateCartKey()
    }, [])

    useEffect(() => {
        localStorage.setItem(cartKey, JSON.stringify(cart));
    }, [cart, cartKey]);

    useEffect(() => {
        const interval = setInterval(() => {
            const currentUID = getUserIdFromToken()
            const currentKey = currentUID ? `cart_${currentUID}` : "visitor"
            if(currentKey !== cartKey){
                updateCartKey()
            }
        }, 500)
        return () => clearInterval(interval)
    }, [cartKey])
      
    const toggleCartItem = (perfume) => {
        if(cart.find(item => item.id === perfume.id)){
            setCart(cart.filter(item => item.id !== perfume.id))
        }else{
            setCart([...cart, perfume])
        }
    }

    const moveToCart = (wishlistPerfume) => {
        const exists = cart.find(item => item.id === wishlistPerfume.id)
        if(!exists){
            setCart([...cart, {...wishlistPerfume, quantity: 1}])
        }
    }

    const clearCart = () => {
        setCart([])
        localStorage.removeItem(cartKey)
    }

    return(
    <CartContext.Provider value={{cart, toggleCartItem, moveToCart, clearCart}}>
        {children}
    </CartContext.Provider>
    )
}

export function useCart() {
    return useContext(CartContext)
}

export default CartProvider
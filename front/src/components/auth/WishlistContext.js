import { createContext, useContext, useEffect, useState  } from "react";
import { jwtDecode } from "jwt-decode";

export const WishlistContext = createContext()

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

function WishlistProvider({children}) {
    const [wishlist, setWishlist] = useState([]);
    const [wishlistKey, setWishlistKey] = useState("wishlist_visitor")

    const updateWishlistKey = () => {
        const uId = getUserIdFromToken();
        const currentWishlistKey = uId ? `wishlist_${uId}` : "wishlist_visitor"
        setWishlistKey(currentWishlistKey)

        const storedWishlist = localStorage.getItem(currentWishlistKey)
        setWishlist(storedWishlist ? JSON.parse(storedWishlist) : [])
    }

    useEffect(() => {
        updateWishlistKey()
    }, [])

    useEffect(() => {
        localStorage.setItem(wishlistKey, JSON.stringify(wishlist))
    }, [wishlist, wishlistKey])

    useEffect(() => {
        const interval = setInterval(() => {
            const currentUID = getUserIdFromToken();
            const currentKey = currentUID ? `wishlist_${currentUID}` : "wishlist_visitor";
            if (currentKey !== wishlistKey) {
                updateWishlistKey();
            }
        }, 500);

        return () => clearInterval(interval);
    }, [wishlistKey]);

    const toggleWishlistItem = (perfume) => {
        if(wishlist.find(item => item.id === perfume.id)){
            setWishlist(wishlist.filter(item => item.id !== perfume.id))
        }else{
            setWishlist([...wishlist, perfume])
        }
    }

    const clearWishlist = () => {
        setWishlist([]);
        localStorage.removeItem(wishlistKey);
    };



    return <WishlistContext.Provider value={{wishlist, toggleWishlistItem, clearWishlist}}>
        {children}
    </WishlistContext.Provider>
}

export function useWishlist() {
    return useContext(WishlistContext)
}

export default WishlistProvider
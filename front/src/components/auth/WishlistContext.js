import { createContext, useContext, useState  } from "react";


const WishlistContext = createContext()

function WishlistProvider({children}) {
    const [wishlist, setWishlist] = useState([]);

    const showWishlist = (perfume) => {
        if(wishlist.find(item => item.id === perfume.id)){
            setWishlist(wishlist.filter(item => item.id !== perfume.id))
        }else{
            setWishlist([...wishlist, perfume])
        }
    }


    return <WishlistContext.Provider value={{wishlist, showWishlist}}>
        {children}
    </WishlistContext.Provider>
}

export function useWishlist() {
    return useContext(WishlistContext)
}

export default WishlistProvider
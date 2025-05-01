import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode"
import { useCart } from "./CartContext";
import { useWishlist } from "./WishlistContext";


export const AuthContext = createContext();
function AuthProvider({children}) {
  const [isLogged, setIsLogged] = useState(false)
  const [user, setUser] = useState("")
  const [profileVisible, setProfileVisible] = useState(false);
  const { clearCart } = useCart();
  const {clearWishlist} = useWishlist()

  useEffect(() => {
    const checkToken = async() => {
      const token = localStorage.getItem("token");
      if(!token) 
        return;
      try {
          const decoded = jwtDecode(token)
          if(decoded.exp * 1000 < Date.now()){
            throw new Error("Token expired");
          }
          const infoUser = await axios.get("http://localhost:8081/infouser",{
            headers: {Authorization: `Bearer ${token}`},
          })
          setIsLogged(true)
          setUser(infoUser.data)
        } catch (err) {
          console.log("Token expirat")
          localStorage.removeItem("token")
          setIsLogged(false)
        }
    }
    checkToken()
  }, [])

  const login = (token) => {
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token)
    setUser(decoded)
    setIsLogged(true);
  }

  const logout = () => {
    localStorage.removeItem("token");
    setIsLogged(false);
    setUser(null)
    clearCart()
    clearWishlist()
  }

  return (
    <AuthContext.Provider value={{ isLogged, user, login, logout, profileVisible, setProfileVisible }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
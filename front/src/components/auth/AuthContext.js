import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode"
import { useCart } from "./CartContext";
import { useWishlist } from "./WishlistContext";


export const AuthContext = createContext();
function AuthProvider({children}) {
  const [isLogged, setIsLogged] = useState(false)
  const [user, setUser] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)
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
          setIsAdmin(infoUser.data.isAdmin === 1)
        } catch (err) {
          console.log("Token expirat")
          localStorage.removeItem("token")
          setIsLogged(false)
        }
    }
    checkToken()
  }, [])

  const login = async (token) => {
    localStorage.setItem("token", token);
    try {
      const uInfo = await axios.get("http://localhost:8081/infouser",{
        headers: {Authorization: `Bearer ${token}`}
      })
      setUser(uInfo.data)
      setIsLogged(true);
      if(uInfo.data.isAdmin === 1){
        setIsAdmin(true)
      }else{
        setIsAdmin(false)
      }
    } catch (err) {
      console.error(err)
      localStorage.removeItem("token")
      setIsLogged(false)
      setUser(null)
    }
  }

  const logout = () => {
    localStorage.removeItem("token");
    setIsLogged(false);
    setUser(null)
    setIsAdmin(false)
    clearCart()
    clearWishlist()
  }

  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8081/infouser", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(prev => ({ ...prev, ...res.data }));
      setIsAdmin(res.data.isAdmin === 1)
    } catch (err) {
      console.error("Could not fetch user info", err);
    }
  };
  

  return (
    <AuthContext.Provider value={{ isLogged, user, login, logout, profileVisible, setProfileVisible, isAdmin, setIsAdmin, fetchUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
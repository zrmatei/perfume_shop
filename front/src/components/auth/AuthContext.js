import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();
function AuthProvider({children}) {
  const [isLogged, setIsLogged] = useState(false)
  const [user, setUser] = useState("")

  useEffect(() => {
    const checkToken = async() => {
      const token = localStorage.getItem("token");
      if(token){
        try {
          await axios.get("http://localhost:8081/verify", {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });
          console.log("User logat")
          setIsLogged(true)
          const infoUser = await axios.get("http://localhost:8081/infouser",{
            headers: {Authorization: `Bearer ${token}`},
          })
          setUser(infoUser.data)
        } catch (err) {
          console.log("Token expirat")
          localStorage.removeItem("token")
          setIsLogged(false)
        }
      }
    }
    checkToken()
  }, [])

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsLogged(true);
  }

  const logout = () => {
    localStorage.removeItem("token");
    setIsLogged(false);
  }

  return (
    <AuthContext.Provider value={{ isLogged, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
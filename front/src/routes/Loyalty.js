import React, { useContext, useState } from "react";
import "../css/loyalty.css"
import {motion} from "motion/react"
import { AuthContext } from "../components/auth/AuthContext";
import axios from "axios";


function Loyalty() {
    const {user, fetchUserInfo} = useContext(AuthContext)
    const [voucher, setVoucher] = useState("")
    const [error, setError] = useState("")
    const [copied, setCopied] = useState(false)
    const min = 1500

    const handleGenerator = async () => {
        setError("")
        if(user.puncte_fidelitate < min){
            setError("You are missing " + min-user.puncte_fidelitate + " points" )
            return
        }
        try {
            const token = localStorage.getItem("token")
            const res = await axios.post(
                "http://localhost:8081/generate-voucher",
                {points: Number(user.puncte_fidelitate)},
                {headers: {Authorization: `Bearer ${token}`}}
            )
            setVoucher(res.data.code)
            setError("")
            fetchUserInfo(user.puncte_fidelitate - min)
        } catch (err) {
            setError("You are missing " + (min - user.puncte_fidelitate).toString() + " points" )
        }
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(voucher)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }
    
    return (
        <div>
            <div className="loyalty-wrapper">
                <h2>Your loyalty is being rewarded</h2>
                <div className="points-box">
                    <p>Your points: <span id="points-no">{user?.puncte_fidelitate}</span></p>
                    <div className="progress-bar">
                        <div className="progress-bar progress-fill"></div>
                    </div>
                    <p>You need <strong>{min}</strong> points to generate a voucher</p>
                </div>
                <motion.button 
                className="btn-voucher-generator"
                whileTap={{scale: 0.75}}
                disabled={user?.puncte_fidelitate < min}
                onClick={handleGenerator}
                >
                    Generate a voucher
                </motion.button>
                {voucher &&
                    <div className="hidden-voucher">
                    <strong className="voucher-code">{voucher}</strong>
                    <motion.button 
                        className="copy-voucher-btn"
                        whileTap={{scale: 0.75}}
                        onClick={handleCopy}>
                        {copied ? "Copied" : "Copy voucher"} 
                    </motion.button>
                    </div>
                }
                {error && <p>{error}</p>}
            </div>
        </div>
    );
}


export default Loyalty;
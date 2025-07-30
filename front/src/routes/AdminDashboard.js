import { useEffect, useState } from "react";
import axios from "axios"
import "../css/adminpanel.css"
import {motion} from "motion/react"
import MapView from "../components/MapView";

function AdminDashboard() {
    const [analytics, setAnalytics] = useState(null)

    useEffect(() => {
        const getStats = async() => {
            const token = localStorage.getItem("token")
            try {
                const res = await axios.get("http://localhost:8081/analytics", {
                    headers: {Authorization: `Bearer ${token}`}
                }
                )
                setAnalytics(res.data)
            } catch (err) {
                console.error(err)
            }
        }
        getStats()
    }, [])

    if(!analytics){
        return <p>Loading stats</p>
    }

  return (
    <div className="admin-dashboard">
      <h1>Analytics</h1>

      <motion.div 
        initial={{opacity: 0, scale:0.5}}
        animate={{opacity: 1, scale: 1}}
        className="stats-grid">
        <div className="stat-card">
          <h2>Users</h2>
          <p>{analytics.totalUsers}</p>
        </div>
        <div className="stat-card">
          <h2>No. orders</h2>
          <p>{analytics.totalOrders}</p>
        </div>
        <div className="stat-card">
          <h2>Sales</h2>
          <p>{analytics.revenue} RON</p>
        </div>
        <div className="stat-card">
          <h2>Average /order</h2>
          <p>{analytics.avgOrderVal} RON</p>
        </div>
      </motion.div>
      <MapView className="map"/>
    </div>
  );
}

export default AdminDashboard;

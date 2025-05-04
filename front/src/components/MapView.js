import {MapContainer, TileLayer, GeoJSON} from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css";
import axios from "axios";
import geo from "../data/geo.json"
import { useEffect, useState } from "react";

const getColor = (revenue) => {
    return revenue > 30000 ? "#084081" :
           revenue > 20000 ? "#0868ac" :
           revenue > 10000 ? "#2b8cbe" :
           revenue > 5000  ? "#4eb3d3" :
                             "#ccece6";
};

function MapView() {
    const [judeteStats, setJudeteStats] = useState([])
    const token = localStorage.getItem("token")

    useEffect(() => {
      const fetchData = async() => {
        try {
          const res = await axios.get("http://localhost:8081/analytics/judete", {
            headers: {Authorization: `Bearer ${token}`}
          })
          setJudeteStats(res.data)
        } catch (err) {
          console.error(err)          
        }
      }
      fetchData()
    }, [token])


    const onEachFeature = (feature, layer) => {
        const judete = feature.properties.judet;
        const stats = judeteStats.find(s => s.judet.trim() === judete.trim());
        console.log(judete, judeteStats)

        const revenue = stats?.revenue || 0
        const orders = stats?.totalOrders || 0

        layer.setStyle({
            fillColor: getColor(revenue),
            weight: 1,
            color: "black",
            fillOpacity: 0.5,
        })
        layer.bindTooltip(`
            <strong>${judete}</strong><br/>
            Orders: ${orders}<br/>
            Sales: ${revenue} RON
          `, { sticky: true });
    }

    return (
        <MapContainer center={[45, 24]} zoom={7} style={{ height: "80vh", width: "100%", borderRadius: "10px", zIndex: "0"}}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {judeteStats.length > 0 && (
            <GeoJSON data={geo} onEachFeature={onEachFeature} />
          )}
        </MapContainer>
      ); 
}

export default MapView
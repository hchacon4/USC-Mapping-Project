import { useState, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import vectorTileLayer from "leaflet-vector-tile-layer";
import "leaflet/dist/leaflet.css";

const MapComponent = () => {
  const [mapData, setMapData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://tiles.arcgis.com/tiles/RmCCgQtiZLDCtblq/arcgis/rest/services/LA_County_Basemap_Source/VectorTileServer"
        );
        const data = await response.json();
        console.log(data);
        setMapData(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ height: "500px" }}>
      {mapData && (
        <MapContainer center={[34.0522, -118.2437]} zoom={10}>
          <TileLayer
            url="https://tiles.arcgis.com/tiles/RmCCgQtiZLDCtblq/arcgis/rest/services/LA_County_Basemap_Source/VectorTileServer/tile/{z}/{y}/{x}.pbf"
            // attribution='&copy; <a href="https://www.arcgis.com/home/item.html?id=3ae8e8e9e1aa4096aecc78b8137f4c1b">ArcGIS</a>'
          />
        </MapContainer>
      )}
    </div>
  );
};

export default MapComponent;

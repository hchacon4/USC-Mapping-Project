import React from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function WMTSLayer({ url, layer,  format }) {
  const map = useMap();

  React.useEffect(() => {
    const wmtsLayer = L.tileLayer.wms(url, {
      layers: layer,
    //   style: style,
    //   tilematrixSet: tileMatrixSet,
      format: format,
      tileSize: 256,
      crossOrigin: true
    });

    map.addLayer(wmtsLayer);

    return () => {
      map.removeLayer(wmtsLayer);
    };
  }, [map, url, layer,  format]);

  return null;
}

const WMTSMap = () => {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px', width: '100%' }}>
      <WMTSLayer
        url="https://svc.pictometry.com/Image/BCC27E3E-766E-CE0B-7D11-AA4760AC43ED/wmts"
        layer="PICT-LARIAC5--u6URKu1Fx3"
        // style="YOUR_STYLE"
        // tileMatrixSet="YOUR_TILE_MATRIX_SET"
        format="image/png"
      />
    </MapContainer>
  );
};

export default WMTSMap;

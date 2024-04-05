import { TileLayer, useMap } from 'react-leaflet';
import { useEffect, useState } from 'react';

const TileLayerNOAA = ({ chartsEnabled, setChartsEnabled, ...props }) => {
  const [adjustedZoom, setAdjustedZoom] = useState(0);
  const map = useMap();

  useEffect(() => {
    const updateZoom = () => {
      const currentZoom = map.getZoom();
      setAdjustedZoom(Math.max(0, currentZoom - 2));
    };

    // Attach the zoom update function to the Leaflet map's zoomend event
    map.addEventListener('zoomend', updateZoom);

    // Initial update
    updateZoom();

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      map.removeEventListener('zoomend', updateZoom);
    };
  }, [map]);

  //const url = `https://gis.charttools.noaa.gov/arcgis/rest/services/MarineChart_Services/NOAACharts/MapServer/WMTS/tile/1.0.0/MarineChart_Services_NOAACharts/default/GoogleMapsCompatible/${adjustedZoom}/{y}/{x}.png`;
  const url = `https://svc.pictometry.com/Image/BCC27E3E-766E-CE0B-7D11-AA4760AC43ED/wmts/PICT-LARIAC5--u6URKu1Fx3/default/GoogleMapsCompatible/${adjustedZoom}/{y}/{x}.png`;

  return (
    <TileLayer
      url={url}
      attribution="NOAA Marine Charts"
      maxZoom={17}
      tms={false}
      opacity={0.4}
      checked={chartsEnabled}
      onLoad={() => setChartsEnabled(true)}
      {...props}
    />
  );
};

export default TileLayerNOAA;
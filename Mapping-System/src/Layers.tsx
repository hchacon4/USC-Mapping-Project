import * as EL from "esri-leaflet";
import ClusterLayer from "react-esri-leaflet/plugins/ClusterLayer";
import VectorTileLayer from "react-esri-leaflet/plugins/VectorTileLayer";
import {
    // BasemapLayer,
    DynamicMapLayer,
    TiledMapLayer,
    // ImageMapLayer,
  } from "react-esri-leaflet";
  import { WMSTileLayer } from "react-leaflet/WMSTileLayer";
  import axios from "axios";
interface LayersProps {
  setLayersControlRef: React.Dispatch<React.SetStateAction<Control.Layers>>;
}
export const Layers: React.FC<LayersProps> = ({
  setLayersControlRef,
}: LayersProps) => {
  /** Ref to the leaflet Layers.Control control component */
  const layerControlRef = useRef<Control.Layers>();

  /**
   * Following list of refs shows how to properly type ref values in typescript
   */

  /**
   * The following plugins don't have TS definitions publicly available, so you're on your own!
   */
  const tiledMapLayerRef = useRef<EL.TiledMapLayer>();
  const vectorBasemapLayerRef = useRef();
  const featureLayerRef = useRef<EL.FeatureLayer>();
  const vectorTileLayerRef = useRef();
  const clusterLayerRef = useRef();
  const heatmapLayerRef = useRef();
  const dynamicMapLayerRef = useRef<EL.DynamicMapLayer>();
  const mapEl = useRef(null);
  // @ts-expect-error No TS defs available
  vectorBasemapLayerRef.current?.once("add", () => {
    console.log(`%c <VectorBasemapLayer /> added:`, "font-weight: bold");
    console.log(vectorBasemapLayerRef.current);
  });

  // @ts-expect-error No TS defs available
  vectorTileLayerRef.current?.once("add", () => {
    console.log(`%c <VectorTileLayer /> added:`, "font-weight: bold");
    console.log(vectorTileLayerRef.current);
  });
  // @ts-expect-error No TS defs available
  clusterLayerRef.current?.once("add", () => {
    console.log(`%c <ClusterLayer /> added:`, "font-weight: bold");
    console.log(clusterLayerRef.current);
  });
  // @ts-expect-error No TS defs available
  heatmapLayerRef.current?.once("add", () => {
    console.log(`%c <HeatmapLayer /> added:`, "font-weight: bold");
    console.log(heatmapLayerRef.current);
  });
  featureLayerRef.current?.once("add", () => {
    console.log(`%c <FeatureLayer /> added:`, "font-weight: bold");
    console.log(featureLayerRef.current);
  });
  dynamicMapLayerRef.current?.once("add", () => {
    console.log(`%c <DynamicMapLayer /> added:`, "font-weight: bold");
    console.log(dynamicMapLayerRef.current);
  });




  return (
    <LayersControl
      position="topleft"
      collapsed={false}
      ref={(ref) => {
        // @ts-ignore refs are hard sometimes
        layerControlRef.current = ref;
        if (ref) {
          setLayersControlRef(ref);
        }
      }}
    >

      <LayersControl.BaseLayer name="(2011 high res imagery)">
        <TiledMapLayer
          ref={tiledMapLayerRef}
          url={
            "https://cache.gis.lacounty.gov/cache/rest/services/LACounty_Cache/LACounty_Aerial_2011/MapServer"
          }
        />
      </LayersControl.BaseLayer>


      <LayersControl.Overlay name="Field Books Service">
        <DynamicMapLayer
          ref={dynamicMapLayerRef}
          url={
            "https://assessor.gis.lacounty.gov/oota/rest/services/MAPPING/FieldBooks_AMP/MapServer"
          }
        />
      </LayersControl.Overlay>
      <LayersControl.Overlay name="Clusters Service">
        <ClusterLayer
          ref={clusterLayerRef}
          url={
            "https://assessor.gis.lacounty.gov/oota/rest/services/MAPPING/Clusters_SFR_AMP/MapServer/5"
          }
        />
      </LayersControl.Overlay>
      <LayersControl.Overlay name="School District Service">
        <ClusterLayer
          ref={clusterLayerRef}
          url={
            "https://arcgis.gis.lacounty.gov/arcgis/rest/services/LACounty_Dynamic/Political_Boundaries/MapServer/25"
          }
        />
      </LayersControl.Overlay>
      
    </LayersControl>
  );
};
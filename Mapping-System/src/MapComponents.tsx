import React, { useRef } from "react";
import { Control } from "leaflet";

import { LayersControl } from "react-leaflet";
import * as EL from "esri-leaflet";

import VectorTileLayer from "react-esri-leaflet/plugins/VectorTileLayer";


interface Props {
  apikey: string;
}


interface LayersProps extends Props {
  setLayersControlRef: React.Dispatch<React.SetStateAction<Control.Layers|null>>;
}

/**
 * LayersControl example containing all react-esri-leaflet layer examples
 */
export const Layers: React.FC<LayersProps> = ({
  setLayersControlRef,
}: LayersProps) => {
  /** Ref to the leaflet Layers.Control control component */
  const layerControlRef = useRef<Control.Layers|null>();

  /**
   * Following list of refs shows how to properly type ref values in typescript
   */
  const tiledMapLayerRef = useRef<EL.TiledMapLayer>();
  const featureLayerRef = useRef<EL.FeatureLayer>();
  const dynamicMapLayerRef = useRef<EL.DynamicMapLayer>();
  const basemapLayerRef = useRef<EL.BasemapLayer>();
  const imageMapLayerRef = useRef<EL.RasterLayer>();

  /**
   * The following plugins don't have TS definitions publicly available, so you're on your own!
   */
  const vectorBasemapLayerRef = useRef();
  const vectorTileLayerRef = useRef();
  const clusterLayerRef = useRef();
  const heatmapLayerRef = useRef();

  tiledMapLayerRef.current?.once("add", () => {
    console.log(`%c <TiledMapLayer /> added:`, "font-weight: bold");
    console.log(tiledMapLayerRef.current);
  });
  featureLayerRef.current?.once("add", () => {
    console.log(`%c <FeatureLayer /> added:`, "font-weight: bold");
    console.log(featureLayerRef.current);
  });
  dynamicMapLayerRef.current?.once("add", () => {
    console.log(`%c <DynamicMapLayer /> added:`, "font-weight: bold");
    console.log(dynamicMapLayerRef.current);
  });
  basemapLayerRef.current?.once("add", () => {
    console.log(`%c <BaseMapLayer /> added:`, "font-weight: bold");
    console.log(basemapLayerRef.current);
  });
  imageMapLayerRef.current?.once("add", () => {
    console.log(`%c <ImageMapLayer /> added:`, "font-weight: bold");
    console.log(imageMapLayerRef.current);
  });
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

  return (
    <LayersControl
      position="topleft"
      collapsed={false}
      ref={(ref) => {
        // @ts-ignore refs are hard sometimes
        layerControlRef.current = ref;
        setLayersControlRef(layerControlRef.current);
      }}
    >
      <LayersControl.Overlay name="Vector Tile Layer">
        <VectorTileLayer ref={vectorTileLayerRef} url={"https://tiles.arcgis.com/tiles/RmCCgQtiZLDCtblq/arcgis/rest/services/LA_County_Basemap_Source/VectorTileServer"}/>
      </LayersControl.Overlay>
    </LayersControl>
  );
};

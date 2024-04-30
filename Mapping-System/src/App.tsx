// JSX allows html to be included in js/ts file. No need to tab between files.
import "./App.css";
import { Control } from "leaflet";
import * as EL from "esri-leaflet";
import ClusterLayer from "react-esri-leaflet/plugins/ClusterLayer";

import "leaflet/dist/leaflet.css";
// import VectorTileLayer from "react-leaflet-vector-tile-layer";

import { useEffect, useRef, useState } from "react";
import { MapContainer, LayersControl } from "react-leaflet";
import VectorTileLayer from "react-esri-leaflet/plugins/VectorTileLayer";
import { loadModules } from 'esri-loader';
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

  const [baseMapUrl, setBaseMapUrl] = useState("");

  useEffect(() => {
    // Make the server call
    fetch("http://localhost:5053/EsriBackend/GetBaseMap")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log(response)
        return response.json(); // Parse the JSON response
      })
      .then((data) => {
        // Convert JSON data to string
        const jsonString = JSON.stringify(data);
        console.log(jsonString); // Output the string to console or do something else with it

        // Set the baseMapUrl state variable to the JSON string
        setBaseMapUrl(jsonString);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []); // Run only once when the component mounts

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
      <LayersControl.BaseLayer name="Vector Tile Layer (Base Map)">

      </LayersControl.BaseLayer>

      <LayersControl.BaseLayer name="(2014 high res imagery)">
        <TiledMapLayer
          // ref={tiledMapLayerRef}
          url={
            "https://cache.gis.lacounty.gov/cache/rest/services/LACounty_Cache/LACounty_Aerial_2014/MapServer"
          }
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name="(2013 high res imagery)">
        <TiledMapLayer
          // ref={tiledMapLayerRef}
          url={
            "https://cache.gis.lacounty.gov/cache/rest/services/LACounty_Cache/LACounty_Aerial_2013/MapServer"
          }
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name="(2012 high res imagery)">
        <TiledMapLayer
          // ref={tiledMapLayerRef}
          url={
            "https://cache.gis.lacounty.gov/cache/rest/services/LACounty_Cache/LACounty_Aerial_2012/MapServer"
          }
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name="(2011 high res imagery)">
        <TiledMapLayer
          // ref={tiledMapLayerRef}
          url={
            "https://cache.gis.lacounty.gov/cache/rest/services/LACounty_Cache/LACounty_Aerial_2011/MapServer"
          }
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name="Vector Tile Layer">
        <WMSTileLayer
          layers={"PICT-LARIAC5--SxmDvXHvYJ"}
          url={
            "https://svc.pictometry.com/Image/BCC27E3E-766E-CE0B-7D11-AA4760AC43ED/wms"
          }
          // <-- comment out this line to stop the map flickering when the button is pressed
          maxZoom={25}
          transparent={true}
          format="image/png"
          opacity={0.8}
          // ref={tiledMapLayerRef}
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name="Vector Tile Layer2">
        <WMSTileLayer
          layers={"PICT-LARIAC5--u6URKu1Fx3"}
          url={
            "https://svc.pictometry.com/Image/BCC27E3E-766E-CE0B-7D11-AA4760AC43ED/wms"
          }
          // <-- comment out this line to stop the map flickering when the button is pressed
          maxZoom={25}
          transparent={true}
          format="image/png"
          opacity={0.8}
          // ref={tiledMapLayerRef}
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name="2022 Summer Urban IR Ortho">
        <WMSTileLayer
          layers={"PICT-LARIAC6--LXMv769zxs"}
          url={
            "https://svc.pictometry.com/Image/BCC27E3E-766E-CE0B-7D11-AA4760AC43ED/wms"
          }
          // <-- comment out this line to stop the map flickering when the button is pressed
          maxZoom={25}
          transparent={true}
          format="image/png"
          opacity={0.8}
          // ref={tiledMapLayerRef}
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name="2021 Spring Urban RGB Ortho">
        <WMSTileLayer
          layers={"PICT-LARIAC6--pQjhm1WxCC"}
          url={
            "https://svc.pictometry.com/Image/BCC27E3E-766E-CE0B-7D11-AA4760AC43ED/wms"
          }
          // <-- comment out this line to stop the map flickering when the button is pressed
          maxZoom={25}
          transparent={true}
          format="image/png"
          opacity={0.8}
          // ref={tiledMapLayerRef}
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name="2021 Fall Urban IR Ortho">
        <WMSTileLayer
          layers={"PICT-LARIAC6--gsBZ87kcdi"}
          url={
            "https://svc.pictometry.com/Image/BCC27E3E-766E-CE0B-7D11-AA4760AC43ED/wms"
          }
          // <-- comment out this line to stop the map flickering when the button is pressed
          maxZoom={25}
          transparent={true}
          format="image/png"
          opacity={0.8}
          // ref={tiledMapLayerRef}
        />
      </LayersControl.BaseLayer>

      <LayersControl.BaseLayer name="2020 AccuPlus Winter Countywide RGB Ortho">
        <WMSTileLayer
          layers={"PICT-LARIAC6--pCqXruF2NL"}
          url={
            "https://svc.pictometry.com/Image/BCC27E3E-766E-CE0B-7D11-AA4760AC43ED/wms"
          }
          // <-- comment out this line to stop the map flickering when the button is pressed
          maxZoom={25}
          transparent={true}
          format="image/png"
          opacity={0.8}
          // ref={tiledMapLayerRef}
        />
      </LayersControl.BaseLayer>

      <LayersControl.BaseLayer name="2022 Bobcat Fire Re-fly RGB Ortho">
        <WMSTileLayer
          layers={"PICT-LARIAC6--IftnvGu8Pc"}
          url={
            "https://svc.pictometry.com/Image/BCC27E3E-766E-CE0B-7D11-AA4760AC43ED/wms"
          }
          // <-- comment out this line to stop the map flickering when the button is pressed
          maxZoom={25}
          transparent={true}
          format="image/png"
          opacity={0.8}
          // ref={tiledMapLayerRef}
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name="2022 Summer Urban RGB Ortho">
        <WMSTileLayer
          layers={"PICT-LARIAC6--X1dnmhXZf9"}
          url={
            "https://svc.pictometry.com/Image/BCC27E3E-766E-CE0B-7D11-AA4760AC43ED/wms"
          }
          // <-- comment out this line to stop the map flickering when the button is pressed
          maxZoom={25}
          transparent={true}
          format="image/png"
          opacity={0.8}
          // ref={tiledMapLayerRef}
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name="2020 Bobcat and Lake Fires RGB Ortho">
        <WMSTileLayer
          layers={"PICT-LARIAC6--LeGqMjqN6p"}
          url={
            "https://svc.pictometry.com/Image/BCC27E3E-766E-CE0B-7D11-AA4760AC43ED/wms"
          }
          // <-- comment out this line to stop the map flickering when the button is pressed
          maxZoom={25}
          transparent={true}
          format="image/png"
          opacity={0.8}
          // ref={tiledMapLayerRef}
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name="2023 AccuPlus Winter Countywide RGB Ortho">
        <WMSTileLayer
          layers={"PICT-LARIAC7--KCrSFBeqgG"}
          url={
            "https://svc.pictometry.com/Image/BCC27E3E-766E-CE0B-7D11-AA4760AC43ED/wms"
          }
          // <-- comment out this line to stop the map flickering when the button is pressed
          maxZoom={25}
          transparent={true}
          format="image/png"
          opacity={0.8}
          // ref={tiledMapLayerRef}
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name="2023 AccuPlus Winter Countywide IR Ortho">
        <WMSTileLayer
          layers={"PICT-LARIAC7--wWaG7ZZTYR"}
          url={
            "https://svc.pictometry.com/Image/BCC27E3E-766E-CE0B-7D11-AA4760AC43ED/wms"
          }
          // <-- comment out this line to stop the map flickering when the button is pressed
          maxZoom={25}
          transparent={true}
          format="image/png"
          opacity={0.8}
          // ref={tiledMapLayerRef}
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name="2020 AccuPlus Winter Countywide IR Ortho">
        <WMSTileLayer
          layers={"PICT-LARIAC6--hT7yCcKe4I"}
          url={
            "https://svc.pictometry.com/Image/BCC27E3E-766E-CE0B-7D11-AA4760AC43ED/wms"
          }
          // <-- comment out this line to stop the map flickering when the button is pressed
          maxZoom={25}
          transparent={true}
          format="image/png"
          opacity={0.8}
          // ref={tiledMapLayerRef}
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name="2014 AccuPlus Winter Countywide RGB Ortho">
        <WMSTileLayer
          layers={"PICT-LARIAC4--NQvK5pJZwy"}
          url={
            "https://svc.pictometry.com/Image/BCC27E3E-766E-CE0B-7D11-AA4760AC43ED/wms"
          }
          // <-- comment out this line to stop the map flickering when the button is pressed
          maxZoom={25}
          transparent={true}
          format="image/png"
          opacity={0.8}
          // ref={tiledMapLayerRef}
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name="2019 Spring Urban RGB Ortho">
        <WMSTileLayer
          layers={"PICT-LARIAC5--pQuVE58lXl"}
          url={
            "https://svc.pictometry.com/Image/BCC27E3E-766E-CE0B-7D11-AA4760AC43ED/wms"
          }
          // <-- comment out this line to stop the map flickering when the button is pressed
          maxZoom={25}
          transparent={true}
          format="image/png"
          opacity={0.8}
          // ref={tiledMapLayerRef}
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name="2019 Fall Urban RGB Ortho">
        <WMSTileLayer
          layers={"PICT-LARIAC5--SasdJh4Z71"}
          url={
            "https://svc.pictometry.com/Image/BCC27E3E-766E-CE0B-7D11-AA4760AC43ED/wms"
          }
          // <-- comment out this line to stop the map flickering when the button is pressed
          maxZoom={25}
          transparent={true}
          format="image/png"
          opacity={0.8}
          // ref={tiledMapLayerRef}
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name="2017 AccuPlus Winter Countywide RGB Ortho">
        <WMSTileLayer
          layers={"PICT-LARIAC5--tF2dpXHbsU"}
          url={
            "https://svc.pictometry.com/Image/BCC27E3E-766E-CE0B-7D11-AA4760AC43ED/wms"
          }
          // <-- comment out this line to stop the map flickering when the button is pressed
          maxZoom={25}
          transparent={true}
          format="image/png"
          opacity={0.8}
          // ref={tiledMapLayerRef}
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name="2018 Woolsey Fire RGB Ortho">
        <WMSTileLayer
          layers={"PICT-LARIAC5--SxmDvXHvYJ"}
          url={
            "https://svc.pictometry.com/Image/BCC27E3E-766E-CE0B-7D11-AA4760AC43ED/wms"
          }
          // <-- comment out this line to stop the map flickering when the button is pressed
          maxZoom={25}
          transparent={true}
          format="image/png"
          opacity={0.8}
          // ref={tiledMapLayerRef}
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name="2019 Saddleridge Fire RGB Ortho">
        <WMSTileLayer
          layers={"PICT-LARIAC5--u6URKu1Fx3"}
          url={
            "https://svc.pictometry.com/Image/BCC27E3E-766E-CE0B-7D11-AA4760AC43ED/wms"
          }
          // <-- comment out this line to stop the map flickering when the button is pressed
          maxZoom={25}
          transparent={true}
          format="image/png"
          opacity={0.8}
          // ref={tiledMapLayerRef}
        />
      </LayersControl.BaseLayer>
      <br />

      <LayersControl.Overlay name="PLSS">
        <DynamicMapLayer
          // ref={dynamicMapLayerRef}
          url={
            "https://gis.blm.gov/arcgis/rest/services/Cadastral/BLM_Natl_PLSS_CadNSDI/MapServer"
          }
        />
      </LayersControl.Overlay>
      <LayersControl.Overlay name="Field Books Service">
        <DynamicMapLayer
          // ref={dynamicMapLayerRef}
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

function MapContent() {
  // `export default` makes App() the default export for this package.
  //   This means that App() can be imported using any alias.

  const [layersControlRef, setLayersControlRef] =
    useState<Control.Layers | null>();
  return (
    <MapContainer
      id="mapId"
      zoom={10}
      center={{ lat: 33.97180352632852, lng: -118.43073695898059 }}
    >
      {/* <WMSTileLayer
        layers={"PICT-LARIAC5--u6URKu1Fx3"}
        url={
          "https://svc.pictometry.com/Image/BCC27E3E-766E-CE0B-7D11-AA4760AC43ED/wms"
        }
        // <-- comment out this line to stop the map flickering when the button is pressed
        maxZoom={8}
        transparent={true}
        format="image/png"
        opacity={0.8}
      /> */}
      <Layers setLayersControlRef={setLayersControlRef} />
    </MapContainer>
  );
}

function EsriMap({  }) {
  // create a ref to element to be used as the map's container
  const mapEl = useRef(null);

  // use a side effect to create the map after react has rendered the DOM
  useEffect(
    () => {
      // define the view here so it can be referenced in the clean up function
      let view;
      // the following code is based on this sample:
      // https://developers.arcgis.com/javascript/latest/sample-code/webmap-basic/index.html
      // first lazy-load the esri classes
      loadModules([        "esri/Map",
      "esri/Basemap",
      "esri/views/MapView",
      "esri/layers/WMTSLayer",
      "esri/widgets/BasemapToggle"], {
        css: true
      }).then(([Map, Basemap, MapView, WMTSLayer, BasemapToggle]) => {
        // then we load a web map from an id
        const plainIGNBasemap = new Basemap({
          baseLayers: [
            new WMTSLayer({
              url:"https://svc.pictometry.com/Image/BCC27E3E-766E-CE0B-7D11-AA4760AC43ED/wmts",
              activeLayer: { id:"PICT-LARIAC5--u6URKu1Fx3", tileMatrixSetId: "GoogleMapsCompatible" },
              serviceMode: "KVP",
            })
          ]
        });

        const orthoIGNBasemap = new Basemap({
          baseLayers: [
            new WMTSLayer({
              url: "https://svc.pictometry.com/Image/BCC27E3E-766E-CE0B-7D11-AA4760AC43ED/wmts",
              activeLayer: { id: "PICT-LARIAC5--u6URKu1Fx3", tileMatrixSetId:"GoogleMapsCompatible" },
              corsEnabled:"svc.pictometry.com"
            })
          ]
        });

        const map = new Map({
          basemap: plainIGNBasemap
        });

        const view = new MapView({
          container: mapEl.current,
          map: map,
          center: [-118.2417, 34.0541],

        });

        view.ui.add(
          new BasemapToggle({
            view,
            nextBasemap: orthoIGNBasemap
          }),
          "bottom-left"
        )
      });
      return () => {
        // clean up the map view
        if (!!view) {
          view.destroy();
          view = null;
        }
      };
    },
    // only re-load the map if the id has changed
    []
  );
  return <div style={{ height: 300 }} ref={mapEl} />;
}

export default function App() {
  // `export default` makes App() the default export for this package.
  //   This means that App() can be imported using any alias.
  return (
    <>
      <div>
        {/* <MapContent/> */}
        <EsriMap/>
      </div>
    </>
  );
}


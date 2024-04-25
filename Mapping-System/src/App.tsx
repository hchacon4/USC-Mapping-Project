// JSX allows html to be included in js/ts file. No need to tab between files.
import "./App.css";
import { Card, Table } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import Col from "react-bootstrap/Col"; // Summary_layer2
import Container from "react-bootstrap/Container"; // Summary_layer2
import Image from "react-bootstrap/Image"; // Summary_layer2
import Row from "react-bootstrap/Row"; // Summary_layer2
import { Control } from "leaflet";
import * as EL from "esri-leaflet";
import ClusterLayer from "react-esri-leaflet/plugins/ClusterLayer";

import "leaflet/dist/leaflet.css";
// import VectorTileLayer from "react-leaflet-vector-tile-layer";

import { useEffect, useRef, useState } from "react";
import { MapContainer, LayersControl } from "react-leaflet";
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
        <VectorTileLayer ref={vectorTileLayerRef} url={baseMapUrl} />
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
      <WMSTileLayer
        layers={"PICT-LARIAC5--u6URKu1Fx3"}
        url={
          "https://svc.pictometry.com/Image/BCC27E3E-766E-CE0B-7D11-AA4760AC43ED/wms"
        }
        // <-- comment out this line to stop the map flickering when the button is pressed
        maxZoom={8}
        transparent={true}
        format="image/png"
        opacity={0.8}
      />
      <Layers setLayersControlRef={setLayersControlRef} />
    </MapContainer>
  );
}

export default function App() {
  // `export default` makes App() the default export for this package.
  //   This means that App() can be imported using any alias.
  return (
    <>
      <div>
        <Nav /> {/*Call the nav function here*/}
        <div className="_accordian_padding"></div>
        <Summary />
        <div className="_accordian_padding"></div>
        <Building_Land_Characteristics />
        <div className="_accordian_padding"></div>
        <Event_History />
        <div className="_accordian_padding"></div>
        <Assessment_History />
      </div>
    </>
  );
}

// In TypeScript (and JavaScript) non-default exports must be part of the func declaration.
export function Nav() {
  return (
    <div className="row text-bg-primary">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div id="navigation" className="container-fluid">
          <a className="navbar-brand" href="#">
            {/* <img
              src={laCountyImg}
              alt="Logo"
              width="30"
              height="24"
              className="d-inline-block align-text-top"
            /> */}
            Los Angeles County Assessor Portal
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  id="_map_search"
                  aria-current="page"
                  href="#"
                >
                  Map Search
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="_pais" href="#">
                  PAIS
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="_assessor_i" href="#">
                  Assessor Internet
                </a>
              </li>
              <li className="nav-item">
                <form className="d-flex" role="search">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <button className="btn btn-outline-success" type="submit">
                    Search
                  </button>
                </form>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
function Summary() {
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Summary</Accordion.Header>
        <Accordion.Body>
          <Summary_layer1 />
          <Summary_layer2 />
          <Summary_layer3 />
          <Summary_layer4 />
          <Summary_layer5 />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

//Layer 1 of summary section (General Info)
function Summary_layer1() {
  return (
    <>
      <div className="row">
        <h2> AIN: 8480-003-062 </h2>
        <hr />
      </div>
      <div className="row">
        <div className="col-4">
          <strong>Street Address:</strong>
          <p>3291 E SPRINGCREEK DR</p>
          <p> WEST COVINA CA 91791-2378</p>
        </div>
        <div className="col-4">
          <strong>Use Type:</strong>
          <p>Single Family Residence</p>
          <strong>Parcel Type:</strong>
          <p> Regular Fee Parcel</p>
          <strong>Tax Rate Type:</strong>
          <p> 10592</p>
        </div>
        <div className="col-4">
          <strong>Street Address:</strong>
          <span className="_green_confirm"> ACTIVE</span>
          <br></br>
          <strong>Create Date:</strong>
          <span className=""> 10/28/2003</span>
          <br></br>
          <strong>Delete Date:</strong>
          <span className=""> </span>
          <br></br>
          <strong>Tax Status:</strong>
          <span className="_green_confirm"> CURRENT</span>
          <br></br>
          <strong>Year Defaulted:</strong>
          <span className=""> </span>
          <br></br>
          <strong>Exemption:</strong>
          <span className=""> None</span>
        </div>
      </div>
    </>
  );
}

//layer 2 of summary section (Table 1 and Clickable map)
function Summary_layer2() {
  return (
    <>
      <br />
      <div className="row">
        <div className="table-responsive col-9 blue-header-accordion">
          <Table bordered>
            <thead>
              <tr>
                <th colSpan={6}>Building (0101) & Land Overview</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Use Code:</strong>
                </td>
                <td>010D</td>
                <td>
                  <strong># of Units</strong>
                </td>
                <td>010D</td>
                <td>
                  <strong>Year Built:</strong>
                </td>
                <td>010D</td>
              </tr>
              <tr>
                <td>
                  <strong>Design Type:</strong>
                </td>
                <td>1234</td>
                <td>
                  <strong>Beds/Baths:</strong>
                </td>
                <td>1234</td>
                <td>
                  <strong>Effective Year:</strong>
                </td>
                <td>1234</td>
              </tr>
              <tr>
                <td>
                  <strong>Quality Class:</strong>
                </td>
                <td>1234</td>
                <td>
                  <strong>Building SqFt:</strong>
                </td>
                <td>1234</td>
                <td>
                  <strong>Land SqFt</strong>
                </td>
                <td>1234</td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="col-3">
          <Container>
            <Row>
              <Col xs={7} md={7} lg={7}>
                <a href="your-link-url">
                  <Image src="src/img/map_image.png" thumbnail />
                </a>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}

//layer 3 of summary section (Table 2)
function Summary_layer3() {
  return (
    <>
      <br />
      <Table>
        <thead>
          <tr>
            <th colSpan={3}>2024 Roll Preparation</th>
            <th colSpan={2}>2023 Current Roll</th>
            <th>RC</th>
            <th>YEAR</th>
            <th colSpan={2}>2020 Base Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Land:</strong>
            </td>
            <td>$</td>
            <td>398,750</td>
            <td>$</td>
            <td>398,750</td>
            <td>T</td>
            <td>2000</td>
            <td>$</td>
            <td>371,900</td>
          </tr>
          <tr>
            <td>
              <strong>Improvements</strong>
            </td>
            <td>$</td>
            <td>398,750</td>
            <td>$</td>
            <td>398,750</td>
            <td>T</td>
            <td>2000</td>
            <td>$</td>
            <td>371,900</td>
          </tr>
          <tr>
            <td>
              <strong>Total</strong>
            </td>
            <td>$</td>
            <td>398,750</td>
            <td>$</td>
            <td>398,750</td>
            <td></td>
            <td></td>
            <td>$</td>
            <td>371,900</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

//layer 4 of summary section (Table 3 as Extra Information)
function Summary_layer4() {
  return (
    <>
      <br />
      <Table>
        <thead>
          <tr>
            <th colSpan={6}>Assessor's Responsible Division</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>District:</strong>
            </td>
            <td>East District Office</td>
            <td>
              <a href="">East District Officea</a>
            </td>
            <td>Phone: (626) 258-6001</td>
          </tr>
          <tr>
            <td>
              <strong>Region:</strong>
            </td>
            <td>06</td>
            <td>1190 Durfee Ave.</td>
            <td>Toll Free: 1 (888) 807-2111</td>
          </tr>
          <tr>
            <td>
              <strong>District:</strong>
            </td>
            <td>06146 W. COVINA HILLS</td>
            <td>South El Monte, CA 91733</td>
            <td>M-F 7:30 am to 5:00 pm</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

//layer 5 of summary section (Mapping API)
function Summary_layer5() {
  return (
    <>
      <div>
        <MapContent />
      </div>
    </>
  );
  //before we hit the return statement do the map API processing, store JSON in string
  // and output JSON
  // i may need to include the backend file Neil made
}

function Building_Land_Characteristics() {
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Building and Land Characteristics</Accordion.Header>
        <Accordion.Body>
          <BAC_layer1 />
          <BAC_layer2 />
          <br></br>
          <BAC_layer3 />
          <BAC_layer4 />
          <BAC_layer5 />
          <BAC_layer6 />
          {/* <BAC_layer7 /> */}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

function BAC_layer1() {
  return (
    <>
      <div className="row">
        <h5> Land Information </h5>
        <hr />
      </div>
      <Table>
        <thead>
          <tr>
            <th colSpan={9}>Use Code = 010D (Single Family Residence)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Total SqFt (GIS):</strong>
            </td>
            <td>0</td>
            <td>
              <strong>Servers:</strong>
            </td>
            <td>No</td>
            <td>
              <strong>Corner Lot:</strong>
            </td>
            <td>No</td>
            <td>
              <strong>Zoning:</strong>
            </td>
            <td>(Refer Issuing Agency)</td>
          </tr>
          <tr>
            <td>
              <strong>Total SqFt (PDB):</strong>
            </td>
            <td>0</td>
            <td>
              <strong>Flight Path:</strong>
            </td>
            <td>No</td>
            <td>
              <strong>Golf Front:</strong>
            </td>
            <td>No</td>
            <td>
              <strong></strong>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>
              <strong>Usable SqFt:</strong>
            </td>
            <td>0</td>
            <td>
              <strong>X-Traffic:</strong>
            </td>
            <td>No</td>
            <td>
              <strong>Horse Lot:</strong>
            </td>
            <td>Yes</td>
            <td>
              <strong>Code Split:</strong>
            </td>
            <td>No</td>
          </tr>
          <tr>
            <td>
              <strong>Acres:</strong>
            </td>
            <td></td>
            <td>
              <strong>Freeway:</strong>
            </td>
            <td>Yes</td>
            <td>
              <strong>View:</strong>
            </td>
            <td>None</td>
            <td>
              <strong>Impairment</strong>
            </td>
            <td>None</td>
          </tr>
          <tr>
            <td>
              <strong>Land W' x D': </strong>
            </td>
            <td>66 x 70</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

function BAC_layer2() {
  return (
    <>
      <div className="row">
        <div className="col-12">
          <strong>Street Address:</strong>
          <p>3291 E SPRINGCREEK DR WEST COVINA CA 91791-2378</p>
        </div>
      </div>
      <br></br>
      <div className="row">
        <div className="col-12">
          <strong>Legal Description</strong> (for assessment purposes):
          <p>TR=53821 LOT 29</p>
        </div>
      </div>
    </>
  );
}

function BAC_layer3() {
  return (
    <Card>
      <Card.Body>
        <Card.Text>
          <strong>Use Code: 010D: </strong>(Single Family Residence)
          <br />
          0 = Residential
          <br />
          1 = Single Family Residence
          <br />
          0 = Open
          <br />D = Planned Unit Development (PUD)
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

function BAC_layer4() {
  return (
    <>
      <br></br>
      <div className="row">
        <h5> Building Information </h5>
        <hr />
      </div>
      <Table bordered>
        <thead></thead>
        <tbody>
          <tr>
            <td>
              <strong>SUBPART:</strong>
            </td>
            <td>0101</td>
            <td>
              <strong># of Units:</strong>
            </td>
            <td>1</td>
            <td>
              <strong>Year Built:</strong>
            </td>
            <td>2003</td>
            <td>
              <strong>RCN Other:</strong>
            </td>
            <td>$ 15,300</td>
          </tr>
          <tr>
            <td>
              <strong>Design Type:</strong>
            </td>
            <td>1030</td>
            <td>
              <strong>Beds/Baths:</strong>
            </td>
            <td>4/3</td>
            <td>
              <strong>Effective Year:</strong>
            </td>
            <td>2003</td>
            <td>
              <strong>RCN Other Trended:</strong>
            </td>
            <td>$ 25,734</td>
          </tr>
          <tr>
            <td>
              <strong>Quality Class:</strong>
            </td>
            <td>D75B</td>
            <td>
              <strong>Building SqFt:</strong>
            </td>
            <td>2406</td>
            <td>
              <strong>Depreciation:</strong>
            </td>
            <td>UN70 / / 0</td>
            <td>
              <strong>Year Change:</strong>
            </td>
            <td>2004</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

function BAC_layer5() {
  return (
    <>
      <br></br>
      <Card>
        <Card.Body>
          <Card.Text>
            <strong>Design Type: 0130</strong>
            <br />
            0 = Residential
            <br />
            1 = Single Family Residence
            <br />
            3 = Central Refrigeration and Heat
            <br />0 = Unused or Unknown Code (No Meaning)
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

function BAC_layer6() {
  return (
    <>
      <br></br>
      <Table bordered>
        <thead></thead>
        <tbody>
          <tr>
            <td colSpan={1}>
              <strong>SUMMARY:</strong>
            </td>
            <td colSpan={1}>
              <strong>Total</strong>
            </td>
            <td colSpan={1}>
              <strong># of Units:</strong>
            </td>
            <td colSpan={1}>1</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>
              <strong>Beds/Baths:</strong>
            </td>
            <td>4/3</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>
              <strong>Building SqFt:</strong>
            </td>
            <td>2406</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>
              <strong>Avg SqFt/Unit:</strong>
            </td>
            <td>2,406</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

// function BAC_layer7() {
//   return (
//     <Accordion defaultActiveKey="0">
//       <Accordion.Item eventKey="0">
//         <Accordion.Header>
//           {" "}
//           Quality Class: Defines the Construction Type, Quality Range, and Shape
//           Class. For Example: D7.5C (Construction Type = 'D', Quality Range =
//           '7.5', Shape Class='C')
//         </Accordion.Header>
//         <Accordion.Body>
//           <p>
//             The Quality Class is used to estimate construction costs and as a
//             unit of comparison in relation to surrounding properties.
//           </p>
//           <p>
//             Construction Type (A, B, C, D, or S):
//             <ul>
//               <li>Class A: Fireproof construction - structural steel frame.</li>
//               <li>
//                 Class B: Fireproof construction - reinforced concrete frame.
//               </li>
//               <li>
//                 Class C: Fire-resistant construction - masonry walls,
//                 combustible roof and interior.
//               </li>
//               <li>
//                 Class D: Non-fireproof construction - usually wood frame (Note:
//                 Class D Single Family Residence Construction predominates in Los
//                 Angeles County).
//               </li>
//               <li>
//                 Class S: Specialized buildings that do not fit in any of the
//                 above categories (typically regarding Commercial/Industrial
//                 properties).
//               </li>
//             </ul>
//           </p>
//           <p>
//             Quality Range (1.0 to 14.5 or 'X' ):
//             <ul>
//               <li>
//                 The quality class concept is a function of all construction
//                 features, depending upon quality of materials, construction
//                 methods, and workmanship. It considers specifications for
//                 foundation, structure, roof, floor, interior, exterior, heating
//                 & cooling, plumbing, kitchen, and bathrooms. 1.0 = lowest
//                 quality.
//               </li>
//               <li>
//                 Note: Quality of 5.5 meets the current minimum standards for new
//                 construction in most municipalities. Quality of 9.0 or greater
//                 is referencing high end or specialty construction and/or
//                 materials.
//               </li>
//               <li>
//                 'X' Quality: Unique or unusual construction that does not lend
//                 itself to being classified using the standard classification
//                 system.
//               </li>
//             </ul>
//           </p>
//           <p>
//             Shape Class (A, B, C, D):
//             <ul>
//               <li>
//                 The shape class is based on the building's perimeter in relation
//                 to the total square footage.
//               </li>
//               <li>
//                 A structure with a relatively large perimeter in relation to its
//                 square footage (many angles, turns, a 'cut-up' custom shape,
//                 etc.) typically costs more to construct than a simple
//                 square/rectangle structure.
//               </li>
//               <li>
//                 Shape A represents a relatively square/rectangle structure. It
//                 has a relatively small perimeter compared to its total square
//                 footage.
//               </li>
//               <li>
//                 Shape D represents a structure with many angles, turns, etc. (a
//                 'cut-up' custom shape). It has a relatively large perimeter
//                 compared to its total square footage.
//               </li>
//               <li>
//                 A structure with a 'DX' Construction Type and Quality Range will
//                 usually not have a Shape Class.
//               </li>
//             </ul>
//           </p>
//         </Accordion.Body>
//       </Accordion.Item>
//     </Accordion>
//   );
// }

function Event_History() {
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Event History</Accordion.Header>
        <Accordion.Body></Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

function Assessment_History() {
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Assessment History</Accordion.Header>
        <Accordion.Body></Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

function Footer() {
  return (
    <footer className="footer p-3">
      <Container fluid>
        <div className="footer-content">
          <div className="footer-section">
            <p>PDB Effective Date: 01/16/2024</p>
            <p>Contact Us Disclaimer FAQ</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}

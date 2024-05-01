// JSX allows html to be included in js/ts file. No need to tab between files.
import "./App.css";
import { Control } from "leaflet";
import "leaflet/dist/leaflet.css";
// import VectorTileLayer from "react-leaflet-vector-tile-layer";

import { forwardRef, useEffect, useRef, useState } from "react";
import { MapContainer } from "react-leaflet";

import { loadModules } from "esri-loader";
import { Layers } from "./Layers";


import Map from "@arcgis/core/Map.js";

import Basemap from "@arcgis/core/Basemap.js";
import MapView from "@arcgis/core/views/MapView.js";
import WMTSLayer from "@arcgis/core/layers/WMTSLayer.js";
import BasemapToggle from "@arcgis/core/widgets/BasemapToggle.js";
import BasemapLayerList from "@arcgis/core/widgets/BasemapLayerList.js";
import MapImageLayer from "@arcgis/core/layers/MapImageLayer.js";

type EsriMapProps = {
  url:string;
  isChecked:boolean;
  coordinates:number[]
}
const EsriWithRef = forwardRef(function EsriMap(props:EsriMapProps,ref) {
  // create a ref to element to be used as the map's container
 // const [view,setView] = useState<MapView>()
 let view;
  const [isChecked, setIsChecked] = useState(false);
  const [coordinates,setCoordinates] = useState([-118.2417, 34.0541])
  const [map,setMap] = useState()
  //const [view,setView] =useState(null)
  // Function to handle checkbox change
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Toggle the checked state


  };

  useEffect(()=>{
    console.log(view)
    if(isChecked){
      console.log(map)
      if(map){
  
        map.add(                new MapImageLayer({
          visible:true,url: "https://arcgis.gis.lacounty.gov/arcgis/rest/services/LACounty_Dynamic/Street_Labels/MapServer"
        }))
        setMap(map)
      }
    
    }
  
  },[isChecked])
  // use a side effect to create the map after react has rendered the DOM
  useEffect(
    () => {
      // define the view here so it can be referenced in the clean up function
      
      // the following code is based on this sample:
      // https://developers.arcgis.com/javascript/latest/sample-code/webmap-basic/index.html
      // first lazy-load the esri classes
      const lods = [
        {
          level: 0,
          resolution: 156543.03392800014,
          scale: 5.91657527591555e8,
        },
        {
          level: 1,
          resolution: 78271.5169639999,
          scale: 295828763.795777,
        },
        {
          level: 2,
          resolution: 39135.7584820001,
          scale: 147914381.897889,
        },
        {
          level: 3,
          resolution: 19567.8792409999,
          scale: 73957190.948944,
        },
        {
          level: 4,
          resolution: 9783.93962049996,
          scale: 36978595.474472,
        },
        {
          level: 5,
          resolution: 4891.96981024998,
          scale: 18489297.737236,
        },
        {
          level: 6,
          resolution: 2445.98490512499,
          scale: 9244648.868618,
        },
        {
          level: 7,
          resolution: 1222.99245256249,
          scale: 4622324.434309,
        },
        {
          level: 8,
          resolution: 611.49622628138,
          scale: 2311162.217155,
        },
        {
          level: 9,
          resolution: 305.748113140558,
          scale: 1155581.108577,
        },
        {
          level: 10,
          resolution: 152.874056570411,
          scale: 577790.554289,
        },
        {
          level: 11,
          resolution: 76.4370282850732,
          scale: 288895.277144,
        },
        {
          level: 12,
          resolution: 38.2185141425366,
          scale: 144447.638572,
        },
        {
          level: 13,
          resolution: 19.1092570712683,
          scale: 72223.819286,
        },
        {
          level: 14,
          resolution: 9.55462853563415,
          scale: 36111.909643,
        },
        {
          level: 15,
          resolution: 4.77731426794937,
          scale: 18055.954822,
        },
        {
          level: 16,
          resolution: 2.38865713397468,
          scale: 9027.977411,
        },
        {
          level: 17,
          resolution: 1.19432856685505,
          scale: 4513.988705,
        },
        {
          level: 18,
          resolution: 0.59716428337097172,
          scale: 2256.9943526,
        },
        {
          level: 19,
          resolution: 0.2985821416854858,
          scale: 1128.497176344,
        },
        {
          level: 20,
          resolution: 0.1492910708694458,
          scale: 564.248588172,
        },
      ];
      // loadModules(
      //   [
      //     "esri/Map",
      //     "esri/Basemap",
      //     "esri/views/MapView",
      //     "esri/layers/WMTSLayer",
      //     "esri/widgets/BasemapToggle",
      //     "esri/layers/MapImageLayer"
      //   ],
      //   {
      //     css: true,
      //   }
      // ).then(([Map, Basemap, MapView, WMTSLayer, BasemapToggle,MapImageLayer ]) => {
        // then we load a web map from an id


        const plainIGNBasemap = new Basemap({
          baseLayers: [
            new WMTSLayer({
              url: props.url,
              activeLayer: {
                id: "PICT-LARIAC6--LXMv769zxs",
                tileMatrixSetId: "GoogleMapsCompatible",
              },
              dependentLayers:["streetlabel"],
              corsEnabled: "svc.pictometry.com",
              referenceLayers:[ ]
            }),

          ],
        });
         

        setMap( new Map({
          basemap: plainIGNBasemap,
          center: coordinates,

          // //zoom doesn't work because no LOD
          showLabels:true,
          zoom: 11,
          constraints: {
            lods: lods,
          },
          spatialReference: {
            wkid: 102100,
            latestWkid: 3857,
          },
        }))
       view =  new MapView({
          container: ref.current, // add via ref
          map: new Map({
            basemap: plainIGNBasemap,
            center: coordinates,
            // center: {
            //   type: "point",
            //   x: 699,
            //   y: 1633,
            //   spatialReference: {
            //     wkid: 102100,
            //     latestWkid: 3857
            // },
            // },
            // //zoom doesn't work because no LOD
            showLabels:true,
            zoom: 11,
            constraints: {
              lods: lods,
            },
            spatialReference: {
              wkid: 102100,
              latestWkid: 3857,
            },
          }),
          center: coordinates,
          // //zoom doesn't work because no LOD
          zoom: 11,
          constraints: {
            lods: lods,
          },
          spatialReference: {
            wkid: 102100, //got it from bg assesor project
            latestWkid: 3857,
          },
        })

        return () => {
          // clean up the map view
          if (!!view) {
            view.destroy();
            view=null;
          }
        };
      }
    ,
    // only re-load the map if the id has changed
    []
  );
  
      // if(!ref)return null

      return(
        <>
        <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
    <div style={{ height:300 }} ref={ref}></div>
    </>
    );
  })


export default function App() {
  // `export default` makes App() the default export for this package.
  //   This means that App() can be imported using any alias.

  //find a way to pass in coordinates
  // State to track the checked state of the checkbox

  const esriRef = useRef();
  return (
    <>
      <div>

        <EsriWithRef  url={'https://svc.pictometry.com/Image/BCC27E3E-766E-CE0B-7D11-AA4760AC43ED/wmts'} ref={esriRef}/>
      </div>
    </>
  );
}

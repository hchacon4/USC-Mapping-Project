// JSX allows html to be included in js/ts file. No need to tab between files.

// import VectorTileLayer from "react-leaflet-vector-tile-layer";
import { forwardRef, useEffect, useRef, useState } from "react";
import Map from "@arcgis/core/Map.js";
import Basemap from "@arcgis/core/Basemap.js";
import MapView from "@arcgis/core/views/MapView.js";
import WMTSLayer from "@arcgis/core/layers/WMTSLayer.js";
import MapImageLayer from "@arcgis/core/layers/MapImageLayer.js";
import LOD from "@arcgis/core/layers/support/LOD.js";
import { LODS } from "./constants";
import Search from "@arcgis/core/widgets/Search.js";
import SearchSource from "@arcgis/core/widgets/Search/SearchSource.js"; // to pass in sources
import LocatorSearchSource from "@arcgis/core/widgets/Search/LocatorSearchSource.js";
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol.js";
import Extent from "@arcgis/core/geometry/Extent.js";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import LayerSearchSource from "@arcgis/core/widgets/Search/LayerSearchSource.js";
import TileLayer from "@arcgis/core/layers/TileLayer.js";

// const streetBaseMap = new Basemap({
//   baseLayers:[
//     new TileLayer({
//       url:"https://cache.gis.lacounty.gov/cache/rest/services/LACounty_Cache/LACounty_StreetMap/MapServer"
//     })
//   ]
// })
const wmtsBaseMap = new Basemap({
  baseLayers: [
    new WMTSLayer({
      url: "https://svc.pictometry.com/Image/BCC27E3E-766E-CE0B-7D11-AA4760AC43ED/wmts",
      activeLayer: {
        id: "PICT-LARIAC6--LXMv769zxs",
        tileMatrixSetId: "GoogleMapsCompatible",
      },
    }),
  ],
});

const streetMap = new MapImageLayer({
  visible: true,
  url: "https://arcgis.gis.lacounty.gov/arcgis/rest/services/LACounty_Dynamic/Street_Labels/MapServer",
});

const assessorParcelMap = new MapImageLayer({
  visible: true,
  url: "https://cache.gis.lacounty.gov/cache/rest/services/LACounty_Cache/LACounty_Parcel/MapServer",
});

const taxRateMap = new FeatureLayer({
  visible:true,
  url:"https://assessor.gis.lacounty.gov/oota/rest/services/MAPPING/Tax_Rate_Area_AMP/MapServer"
})
const communitiesMap = new FeatureLayer({
  visible:true,
  url:"https://arcgis.gis.lacounty.gov/arcgis/rest/services/LACounty_Dynamic/Political_Boundaries/MapServer/23"
})

const mobileHomeMap = new FeatureLayer({
  visible:true,
  url:"https://assessor.gis.lacounty.gov/oota/rest/services/MAPPING/MobileHomes_Service_AMP/MapServer"
})
// export const createMapView = (url:string,coordinates:number[],mapRef:any) => {

//   const wmtsBaseMap = new Basemap({
//     baseLayers: [
//       new WMTSLayer({
//         url: 'https://svc.pictometry.com/Image/BCC27E3E-766E-CE0B-7D11-AA4760AC43ED/wmts',
//         activeLayer: {
//           id: "PICT-LARIAC6--LXMv769zxs",
//           tileMatrixSetId: "GoogleMapsCompatible",
//         }
//       })
//     ],
//   });

//   const view = new MapView({
//     container: mapRef.current, // add via ref
//     map: new Map({
//       basemap: wmtsBaseMap,
//     }),
//     center: coordinates,
//     // //zoom doesn't work because no LOD
//     zoom: 11,
//     constraints: {
//       lods:LODS,
//     },
//     spatialReference: {
//       wkid: 102100, //got it from bg assesor project
//     },
//   })

//   //not working

//   const searchWidget = new Search({
//     view: view,
//     visible:true
//   });
//   view.ui.add(searchWidget, {
//     position: "top-left",
//     index: 2,
//   });
//   return view;
// }
type EsriMapProps = {
  url: string;
  isCheckedStreetLabel: boolean;
  coordinates: number[];
};
const EsriWithRef = forwardRef(function EsriMap(props: EsriMapProps, ref) {
  // create a ref to element to be used as the map's container
  // const [view,setView] = useState<MapView>()

  //view should be in state
  const [view, setView] = useState<any>(null);
  const [basemap, setBasemap] = useState<any>(wmtsBaseMap);
  //later in useEffect()
  //setView(createMapView(mapRef.current,mapProperties,viewProperties))
  const createMapView = (mapRef: any) => {
    const lods = LODS;

    const view = new MapView({
      container: mapRef.current, // add via ref
      map: new Map({
        basemap: basemap,
      }),
      center: coordinates,
      // //zoom doesn't work because no LOD
      zoom: 11,
      constraints: {
        lods: lods,
      },
      spatialReference: {
        wkid: 102100, //got it from bg assesor project
      },
    });
    const searchWidget = new Search({
      view: view,
      sources: [
        new LocatorSearchSource({
          url: "https://geocode.gis.lacounty.gov/geocode/rest/services/CAMS_Locator/GeocodeServer",
          singleLineFieldName: "SingleLine",
          resultSymbol: new PictureMarkerSymbol({
            url: "/redpin.png",
            width: 30,
            height: 41,
            yoffset: 14,
            xoffset: 2,
          }),
          name: "LA County CAMS",
          placeholder: "address",
          suggestionsEnabled: true,
        }),
        // ESRI Geocoder

        // hardcode search extent to la county for esri world locator
        new LocatorSearchSource({
          url: "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer",
          singleLineFieldName: "SingleLine",
          name: "Esri World Geocoder",
          placeholder: "place",
          outFields: ['Addr_type'],
          resultSymbol: new PictureMarkerSymbol({
            url: "/redpin.png",
            width: 30,
            height: 41,
            yoffset: 14,
            xoffset: 2,
          }),
          filter:{
            geometry: new Extent({
              xmin: -13400407.025469452,
              ymin: 3854157.8250249373,
              xmax: -12937519.219911631,
              ymax: 4153533.5605398538,
              spatialReference: {
                  wkid: 102100,
              }
          }),
          }
        }),
       new LayerSearchSource({searchFields:["AIN"],layer:new FeatureLayer({url:"https://cache.gis.lacounty.gov/cache/rest/services/LACounty_Cache/LACounty_Parcel/MapServer/0"}),exactMatch:true,outFields:["*"],placeholder:"AIN"})
      ],
    });

    searchWidget.allSources.on("after-add", ({ item }) => {
      //https://community.esri.com/t5/arcgis-javascript-maps-sdk-questions/how-to-change-the-marker-of-the-search-result/m-p/1088925
      item.resultSymbol = new PictureMarkerSymbol({
        url: "/redpin.png",
        width: 30,
        height: 41,
        yoffset: 14,
        xoffset: 2,
      });
    });
    view.ui.add(searchWidget, {
      position: "top-left",
      index: 2,
    });

    return view;
  };
  const [isCheckedStreetLabel, setIsCheckedStreetLabel] = useState(false);
  const [isCheckedAssessorParcel,setIsCheckedAssessorParcel] = useState(false)
  const [isCheckedTaxRate,setIsCheckedTaxRate] = useState(false)
  const [isCheckedCommunitiesMap,setIsCheckedCommunitiesMap] = useState(false)
  const [isMobileHomeChecked,setIsMobileHomeChecked] = useState(false)
  const [coordinates, setCoordinates] = useState([-118.2417, 34.0541]);
  const [selectedOption, setSelectedOption] = useState("street");
  // const [map,setMap] = useState()
  //const [view,setView] =useState(null)
  // Function to handle checkbox change
  const handleStreetLabelCheck = () => {
    setIsCheckedStreetLabel(!isCheckedStreetLabel); // Toggle the checked state
  };

  const handleAssessorParcelCheck = ()=>{
    setIsCheckedAssessorParcel(!isCheckedAssessorParcel)
  }

  const handleTaxRateCheck = ()=>{
    setIsCheckedTaxRate(!isCheckedTaxRate)
  }
  const handleCommunityCheck = ()=>{
    setIsCheckedCommunitiesMap(!isCheckedCommunitiesMap)
  }

  const handleMobileHome= ()=>{
    setIsMobileHomeChecked(!isMobileHomeChecked)
  }

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value); // Update the selected option
  };
  const handleBaseMapChange = (map:any)=>{
    setBasemap(map)
  }
  // use a side effect to create the map after react has rendered the DOM
  useEffect(
    () => {
      setView(createMapView(ref));
      return () => {
        // clean up the map view
        if (!!view) {
          view.destroy();
          setView(null);
        }
      };
    },
    // only re-load the map if the id has changed
    []
  );

  useEffect(() => {
    if (!view) {
      //this was called before setView()
      return;
    }
    view.map.basemap = basemap;
  }, [view]);

  useEffect(()=>{
    if (!view) {
      //this was called before setView()
      return;
    }

      if(view.map.basemap){
        view.map.basemap.destroy();
      }
    if(selectedOption==="street"){
      const streetBaseMap = new Basemap({
                      baseLayers:[
                        new TileLayer({
                          url:"https://cache.gis.lacounty.gov/cache/rest/services/LACounty_Cache/LACounty_StreetMap/MapServer"
                        })
                      ]
                    })
     
      view.map.basemap = streetBaseMap
    }

    if(selectedOption==="aerial 2017"){
      const wmtsBaseMap = new Basemap({
        baseLayers: [
          new WMTSLayer({
            url: "https://svc.pictometry.com/Image/BCC27E3E-766E-CE0B-7D11-AA4760AC43ED/wmts",
            activeLayer: {
              id: "PICT-LARIAC6--LXMv769zxs",
              tileMatrixSetId: "GoogleMapsCompatible",
            },
          }),
        ],
      });

      view.map.basemap = wmtsBaseMap
    }
  },[view,selectedOption])

  //add/remove a reference layer
  useEffect(() => {
    if (!view) {
      return;
    }

    if (isCheckedStreetLabel) {
      view.map.add(streetMap);
    } else {
      view.map.remove(streetMap);
    }
    if(isCheckedAssessorParcel){
      view.map.add(assessorParcelMap)
    }
    else{
      view.map.remove(assessorParcelMap)
    }

    if(isCheckedTaxRate){
      view.map.add(taxRateMap)
    }
    else{
      view.map.remove(taxRateMap)
    }
    if(isCheckedCommunitiesMap){
      view.map.add(communitiesMap)
    }
    else{
      view.map.remove(communitiesMap)
    }

    if(isMobileHomeChecked){
      view.map.add(mobileHomeMap)
    }
    else{
      view.map.remove(mobileHomeMap)
    }
  }, [view, isCheckedStreetLabel,isCheckedAssessorParcel,isCheckedTaxRate,isCheckedCommunitiesMap,isMobileHomeChecked]);
  //watch or event callbacks

  // useEffect(()=>{
  //   if(!view){
  //     return;
  //   }
  //   const handle = view.on("click",onClick);
  //   return function removeHandle(){
  //     handle && handle.remove();
  //   }
  // },[view,onClick])

  // if(!ref)return null

  return (
    <>
    <div>
    <div>
      {/* Radio option 1 */}
      <label>
        <input
          type="radio"
          value="street"
          checked={selectedOption === "street"}
          onChange={handleOptionChange}
        />
        Street
      </label>
      <br />

      {/* Radio option 2 */}
      <label>
        <input
          type="radio"
          value="aerial 2017"
          checked={selectedOption === "aerial 2017"}
          onChange={handleOptionChange}
        />
        Aerial 2017
      </label>
      <br />
    </div>
    </div>
    <div>
    <div>
      <label>
        <input
          type="checkbox"
          checked={isCheckedStreetLabel}
          onChange={handleStreetLabelCheck}
        />
        Street labels
      </label>
      </div>
      <div>
      <label>
        <input
          type="checkbox"
          checked={isCheckedAssessorParcel}
          onChange={handleAssessorParcelCheck}
        />
        Assesor Parcel
      </label>
      </div>
      <div>
      <label>
        <input
          type="checkbox"
          checked={isCheckedTaxRate}
          onChange={handleTaxRateCheck}
        />
        Tax Rate
      </label>
      </div>
      <div>
      <label>
        <input
          type="checkbox"
          checked={isCheckedCommunitiesMap}
          onChange={handleCommunityCheck}
        />
        Communities
      </label>
      </div>
      <div>
      <label>
        <input
          type="checkbox"
          checked={isMobileHomeChecked}
          onChange={handleMobileHome}
        />
        Mobile Home
      </label>
      </div>                       
      </div>
      <div style={{ height: 800 }} ref={ref}></div>
    </>
  );
});

export default function App() {
  // `export default` makes App() the default export for this package.
  //   This means that App() can be imported using any alias.

  //user can enter address, place , or AIN , then tracks to location
  //find a way to pass in coordinates
  // State to track the checked state of the checkbox

  const esriRef = useRef();
  return (
    <>
      <div>
        <EsriWithRef
          url={
            "https://svc.pictometry.com/Image/BCC27E3E-766E-CE0B-7D11-AA4760AC43ED/wmts"
          }
          ref={esriRef}
        />
      </div>
    </>
  );
}

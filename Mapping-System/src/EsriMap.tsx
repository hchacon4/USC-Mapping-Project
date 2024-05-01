import { loadModules } from "esri-loader";
import { useEffect } from "react";

function EsriMap({ref}) {
    // create a ref to element to be used as the map's container
    
  
    // use a side effect to create the map after react has rendered the DOM
    useEffect(
      () => {
        // define the view here so it can be referenced in the clean up function
        let view;
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
        loadModules(
          [
            "esri/Map",
            "esri/Basemap",
            "esri/views/MapView",
            "esri/layers/WMTSLayer",
            "esri/widgets/BasemapToggle",
            "esri/layers/MapImageLayer"
          ],
          {
            css: true,
          }
        ).then(([Map, Basemap, MapView, WMTSLayer, BasemapToggle,MapImageLayer ]) => {
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
              new MapImageLayer({
                visible:true,url: "https://arcgis.gis.lacounty.gov/arcgis/rest/services/LACounty_Dynamic/Street_Labels/MapServer"
              })
              // new WMTSLayer({
              //   url: props.url,
              //   activeLayer: {
              //     id: "PICT-LARIAC5--SxmDvXHvYJ",
              //     tileMatrixSetId: "GoogleMapsCompatible",
              //   },
              //   corsEnabled: "svc.pictometry.com",
              //   dependentLayers: ["streetlabel"],
              // }),
            ],
          });
  
          const orthoIGNBasemap = new Basemap({
            baseLayers: [
              new WMTSLayer({
                url: props.url,
                activeLayer: {
                  id: "PICT-LARIAC5--SxmDvXHvYJ",
                  tileMatrixSetId: "GoogleMapsCompatible",
                },
                corsEnabled: "svc.pictometry.com",
                dependentLayers: ["streetlabel"],
              }),
            ],
          });
  
          const map = new Map({
            basemap: plainIGNBasemap,
            center: [-118.648, 34.07314],
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
            zoom: 10,
            constraints: {
              lods: lods,
            },
            spatialReference: {
              wkid: 102100,
              latestWkid: 3857,
            },
          });
  
           view = new MapView({
            container: ref.current, // add via ref
            map: map,
            center: [-118.648, 34.07314],
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
            zoom: 10,
            constraints: {
              lods: lods,
            },
            spatialReference: {
              wkid: 102100,
              latestWkid: 3857,
            },
          });
  
          view.ui.add(
            new BasemapToggle({
              view,
              nextBasemap: orthoIGNBasemap,
            }),
            "bottom-left"
          );
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
    return <div style={{ height: 300 }} ref={ref} />;
  }

  export default EsriMap;
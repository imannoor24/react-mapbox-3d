import React from 'react';
import Map, {Source, Layer, FullscreenControl, NavigationControl} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import layer from './data/pakpop.geojson' ;
//import LegendControl from 'mapboxgl-legend';
import 'mapboxgl-legend/dist/style.css'
import Legend from './components/Legend';

function App() {

  //const [geoJSONData, setGeoJSONData] = useState(null);
  let geoJSONData = layer; 
  //let labelid = layer.NAME_1;
  // useEffect(() => {
  //   // Load the GeoJSON file from your desktop
  //   fetch('C:/Users/imann/OneDrive/Desktop/PAK_adm/pakpop.geojson')
  //     .then((response) => response.json())
  //     .then((data) => setGeoJSONData(data))
  //     .catch((error) => console.error('Error loading GeoJSON:', error));
  // }, []);


  return (<div style={{backgroundColor:'#EEEEEE', width:'100vw', height:'100vh', position:'fixed',top: 0, left: 0}} >
    <div style={{height:20, position: 'absolute', zIndex: 10, backgroundColor: 'white'}}>
     <h2 style={{textAlign: 'center', backgroundColor: 'white'}}>3D Extrusion based on Provincial Population</h2>
    </div>
    <Legend />
    
     <Map
    mapboxAccessToken='pk.eyJ1IjoiYXJmYWtsIiwiYSI6ImNsYnQzd284eDA5OGUzcHBmc2VjOTJ4dzEifQ.RFRiN_WHNN8c4zO7nt2XLA'
        initialViewState={{
            longitude:69.3451,
            latitude:30.3753,
            zoom:4.8,
            pitch: 75
        }}
       //style={{width: 1525, height:650 }}
       style={{width:'100%', height:'100%'}}
        mapStyle="mapbox://styles/mapbox/streets-v12"
    >
    {geoJSONData && (
        <Source type="geojson" data={geoJSONData}>
          <Layer
            id="my-geojson-layer"
            type="fill-extrusion"
            paint={{

              'fill-extrusion-color': [
                'interpolate',
                ['linear'],
                ['get', 'Population'],
                30000, '#DDE6ED',
                40000, '#9DB2BF',
                60000, '#526D82',
                75000, '#27374D',
                100000, '#0B2447'
              ],
            'fill-extrusion-height': {
                 // ['get', 'Population'],
                 'property': 'Population',
                 'stops': [
                 [30000, 20000],
                 [40000,75000],
                 [50000,90000],
                 [75000, 120000],
                 [100000, 250000]]
            },
            //    'fill-extrusion-height': {
            //     'property': 'Population',
            //      'stops': [[0,5],[100,100],[1000,1000],[5000,5000],[10000,10000],[50000,50000],[100000,100000],[500000,500000],[1000000,1000000]],
            //     'base': 0
            // },

             // 'fill-extrusion-color': '',
              //'fill-extrusion-height': ['get', 'Population'],
              //'fill-extrusion-base': 10,
              'fill-extrusion-opacity': 0.9,
            }}
          />
        
        </Source>
      )}
      <NavigationControl />
    </Map> 
</div>);
}

export default App;

import './assets/icons/icons.css'
import './style.css'
import './dialog.css'
// import {
//   GraphComponent,
//   GraphViewerInputMode,
//   ICommand,
//   ScrollBarVisibility,
// } from 'yfiles'
import loadGraph from './lib/loadGraph'
import './lib/yFilesLicense'
import { initializeTooltips } from './tooltips'
import { exportDiagram } from './diagram-export'
import { PrintingSupport } from './lib/PrintingSupport'
import { initializeContextMenu } from './context-menu'

// async function run() {
//   const graphComponent = await initializeGraphComponent()
//   initializeToolbar(graphComponent)
//   initializeTooltips(graphComponent)
//   initializeContextMenu(graphComponent)
// }

// async function initializeGraphComponent(): Promise<GraphComponent> {
//   // create a GraphComponent in its designated container
//   const graphComponent = new GraphComponent(
//     document.querySelector('.graph-component-container')!
//   )

//   // show scrollbars only as needed
//   graphComponent.horizontalScrollBarPolicy =
//     ScrollBarVisibility.AS_NEEDED_DYNAMIC
//   graphComponent.verticalScrollBarPolicy = ScrollBarVisibility.AS_NEEDED_DYNAMIC

//   graphComponent.inputMode = new GraphViewerInputMode()

//   graphComponent.graph = await loadGraph()

//   // center the newly created graph
//   graphComponent.fitGraphBounds()

//   return graphComponent
// }

// function initializeToolbar(graphComponent: GraphComponent) {
//   document
//     .getElementById('btn-increase-zoom')!
//     .addEventListener('click', () => {
//       ICommand.INCREASE_ZOOM.execute(null, graphComponent)
//     })

//   document
//     .getElementById('btn-decrease-zoom')!
//     .addEventListener('click', () => {
//       ICommand.DECREASE_ZOOM.execute(null, graphComponent)
//     })

//   document.getElementById('btn-fit-graph')!.addEventListener('click', () => {
//     ICommand.FIT_GRAPH_BOUNDS.execute(null, graphComponent)
//   })

//   document.getElementById('btn-export-svg')!.addEventListener('click', () => {
//     exportDiagram(graphComponent, 'svg')
//   })

//   document.getElementById('btn-export-png')!.addEventListener('click', () => {
//     exportDiagram(graphComponent, 'png')
//   })

//   document.getElementById('btn-export-pdf')!.addEventListener('click', () => {
//     exportDiagram(graphComponent, 'pdf')
//   })

//   document.getElementById('btn-print')!.addEventListener('click', () => {
//     const printingSupport = new PrintingSupport()
//     printingSupport.printGraph(graphComponent.graph)
//   })
// }

// run()

import L from 'leaflet';
import 'leaflet.heat'; // Import heat layer plugin

// Initialize the Leaflet map with a dark theme
const map = L.map('map', {
  preferCanvas: true,
  zoomControl: true,
}).setView([20, 0], 4); // Start zoomed in at the center

// Add a dark-themed OpenStreetMap tile layer
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
}).addTo(map);

// Define coordinates for a subset of countries
const countryCoords: { [key: string]: [number, number] } = {
  "Afghanistan": [33.93911, 67.709953],
  "Albania": [41.153332, 20.168331],
  "Algeria": [28.033886, 1.659626],
  "Andorra": [42.546245, 1.601554],
  "Angola": [-11.202692, 17.873887],
  "Argentina": [-38.416097, -63.616672],
  "Armenia": [40.069099, 45.038189],
  "Australia": [-25.274398, 133.775136],
  "Austria": [47.516231, 14.550072],
  "Azerbaijan": [40.143105, 47.576927],
  "Bahamas": [25.03428, -77.39628],
  "Bahrain": [26.0667, 50.5577],
  "Bangladesh": [23.685, 90.3563],
  "Barbados": [13.1939, -59.5432],
  "Belarus": [53.7098, 27.9534],
  "Belgium": [50.8503, 4.3517],
  "Belize": [17.1899, -88.4977],
  "Benin": [9.3077, 2.3158],
  "Bhutan": [27.5142, 90.4336],
  "Bolivia": [-16.2902, -63.5887],
  "Bosnia and Herzegovina": [43.9159, 17.6791],
  "Botswana": [-22.3285, 24.6849],
  "Brazil": [-14.235, -51.9253],
  "Brunei": [4.5353, 114.7277],
  "Bulgaria": [42.7339, 25.4858],
  "Burkina Faso": [12.2383, -1.5616],
  "Burundi": [-3.3731, 29.9189],
  "Cambodia": [12.5657, 104.991],
  "Cameroon": [7.3697, 12.3547],
  "Canada": [56.1304, -106.3468],
  "Cape Verde": [16.0021, -24.0132],
  "Central African Republic": [6.6111, 20.9394],
  "Chad": [15.4542, 18.7322],
  "Chile": [-35.6751, -71.543],
  "China": [35.8617, 104.1954],
  "Colombia": [4.5709, -74.2973],
  "Comoros": [-11.6455, 43.3333],
  "Congo (Brazzaville)": [-0.228, 15.8277],
  "Congo (Kinshasa)": [-4.0383, 21.7587],
  "Costa Rica": [9.7489, -83.7534],
  "Croatia": [45.1, 15.2],
  "Cuba": [21.5218, -77.7812],
  "Cyprus": [35.1264, 33.4299],
  "Czech Republic": [49.8175, 15.473],
  "Denmark": [56.2639, 9.5018],
  "Djibouti": [11.8251, 42.5903],
  "Dominica": [15.415, -61.371],
  "Dominican Republic": [18.7357, -70.1627],
  "East Timor": [-8.8742, 125.7275],
  "Ecuador": [-1.8312, -78.1834],
  "Egypt": [26.8206, 30.8025],
  "El Salvador": [13.7942, -88.8965],
  "Equatorial Guinea": [1.6508, 10.2679],
  "Eritrea": [15.1794, 39.7823],
  "Estonia": [58.5953, 25.0136],
  "Eswatini": [-26.5225, 31.4659],
  "Ethiopia": [9.145, 40.4897],
  "Fiji": [-17.7134, 178.065],
  "Finland": [61.9241, 25.7482],
  "France": [46.6034, 1.8883],
  "Gabon": [-0.8037, 11.6094],
  "Gambia": [13.4432, -15.3101],
  "Georgia": [42.3154, 43.3569],
  "Germany": [51.1657, 10.4515],
  "Ghana": [7.9465, -1.0232],
  "Greece": [39.0742, 21.8243],
  "Grenada": [12.1165, -61.679],
  "Guatemala": [15.7835, -90.2308],
  "Guinea": [9.9456, -9.6966],
  "Guinea-Bissau": [11.8037, -15.1804],
  "Guyana": [4.8604, -58.9302],
  "Haiti": [18.9712, -72.2852],
  "Honduras": [15.2, -86.2419],
  "Hungary": [47.1625, 19.5033],
  "Iceland": [64.9631, -19.0208],
  "India": [20.5937, 78.9629],
  "Indonesia": [-0.7893, 113.9213],
  "Iran": [32.4279, 53.688],
  "Iraq": [33.2232, 43.6793],
  "Ireland": [53.1424, -7.6921],
  "Israel": [31.0461, 34.8516],
  "Italy": [41.8719, 12.5674],
  "Ivory Coast": [7.5399, -5.5471],
  "Jamaica": [18.1096, -77.2975],
  "Japan": [36.2048, 138.2529],
  "Jordan": [30.5852, 36.2384],
  "Kazakhstan": [48.0196, 66.9237],
  "Kenya": [-0.0236, 37.9062],
  "Kiribati": [-3.3704, -168.734],
  "Kuwait": [29.3117, 47.4818],
  "Kyrgyzstan": [41.2044, 74.7661],
  "Laos": [19.8563, 102.4955],
  "Latvia": [56.8796, 24.6032],
  "Lebanon": [33.8547, 35.8623],
  "Lesotho": [-29.6099, 28.2336],
  "Liberia": [6.4281, -9.4295],
  "Libya": [26.3351, 17.2283],
  "Liechtenstein": [47.166, 9.5554],
  "Lithuania": [55.1694, 23.8813],
  "Luxembourg": [49.8153, 6.1296],
  "Madagascar": [-18.7669, 46.8691],
  "Malawi": [-13.2543, 34.3015],
  "Malaysia": [4.2105, 101.9758],
  "Maldives": [3.2028, 73.2207],
  "Mali": [17.5707, -3.9962],
  "Malta": [35.9375, 14.3754],
  "Marshall Islands": [7.1315, 171.1845],
  "Mauritania": [21.0079, -10.9408],
  "Mauritius": [-20.3484, 57.5522],
  "Mexico": [23.6345, -102.5528],
  "Micronesia": [7.4256, 150.5508],
  "Moldova": [47.4116, 28.3699],
  "Monaco": [43.7503, 7.4128],
  "Mongolia": [46.8625, 103.8467],
  "Montenegro": [42.7087, 19.3744],
  "Morocco": [31.7917, -7.0926],
  "Mozambique": [-18.6657, 35.5296],
  "Myanmar": [21.9162, 95.956],
  "Namibia": [-22.9576, 18.4904],
  "Nauru": [-0.5228, 166.9315],
  "Nepal": [28.3949, 84.124],
  "Netherlands": [52.1326, 5.2913],
  "New Zealand": [-40.9006, 174.886],
  "Nicaragua": [12.8654, -85.2072],
  "Niger": [17.6078, 8.0817],
  "Nigeria": [9.081999, 8.675277],
  "North Korea": [40.3399, 127.5101],
  "North Macedonia": [41.6086, 21.7453],
  "Norway": [60.472, 8.4689],
  "Oman": [21.5126, 55.9233],
  "Pakistan": [30.3753, 69.3451],
  "Palau": [7.51498, 134.58252],
  "Panama": [8.537981, -80.782127],
  "Papua New Guinea": [-6.314993, 143.95555],
  "Paraguay": [-23.442503, -58.443832],
  "Peru": [-9.19, -75.0152],
  "Philippines": [12.879721, 121.774017],
  "Poland": [51.9194, 19.1451],
  "Portugal": [39.3999, -8.2245],
  "Qatar": [25.3548, 51.1839],
  "Romania": [45.9432, 24.9668],
  "Russia": [61.524, 105.3188],
  "Rwanda": [-1.9403, 29.8739],
  "Saint Kitts and Nevis": [17.3578, -62.782998],
  "Saint Lucia": [13.9094, -60.9789],
  "Saint Vincent and the Grenadines": [12.9843, -61.2872],
  "Samoa": [-13.759, -172.1046],
  "San Marino": [43.9424, 12.4578],
  "Sao Tome and Principe": [0.1864, 6.6131],
  "Saudi Arabia": [23.8859, 45.0792],
  "Senegal": [14.4974, -14.4524],
  "Serbia": [44.0165, 21.0059],
  "Seychelles": [-4.6796, 55.491977],
  "Sierra Leone": [8.4606, -11.7799],
  "Singapore": [1.3521, 103.8198],
  "Slovakia": [48.669, 19.699],
  "Slovenia": [46.1512, 14.9955],
  "Solomon Islands": [-9.6457, 160.1562],
  "Somalia": [5.1521, 46.1996],
  "South Africa": [-30.5595, 22.9375],
  "South Korea": [35.9078, 127.7669],
  "South Sudan": [4.85, 31.6],
  "Spain": [40.4637, -3.7492],
  "Sri Lanka": [7.8731, 80.7718],
  "Sudan": [12.8628, 30.2176],
  "Suriname": [3.9193, -56.0278],
  "Sweden": [60.1282, 18.6435],
  "Switzerland": [46.8182, 8.2275],
  "Syria": [34.8021, 38.9968],
  "Taiwan": [23.6978, 120.9605],
  "Tajikistan": [38.861, 71.2761],
  "Tanzania": [-6.369028, 34.888822],
  "Thailand": [15.870032, 100.99254],
  "Togo": [8.6195, 0.8248],
  "Tonga": [-21.1789, -175.1982],
  "Trinidad and Tobago": [10.6918, -61.2225],
  "Tunisia": [33.8869, 9.5375],
  "Turkey": [38.9637, 35.2433],
  "Turkmenistan": [38.9697, 59.5563],
  "Tuvalu": [-7.1095, 179.194],
  "Uganda": [1.373333, 32.290275],
  "Ukraine": [48.3794, 31.1656],
  "United Arab Emirates": [23.4241, 53.8478],
  "United Kingdom": [55.3781, -3.436],
  "UK": [55.3781, -3.436],
  "United States": [37.0902, -95.7129],
  "USA": [37.0902, -95.7129],
  "US": [37.0902, -95.7129],
  "Uruguay": [-32.522779, -55.765835],
  "Uzbekistan": [41.377491, 64.585262],
  "Vanuatu": [-15.376706, 166.959158],
  "Vatican City": [41.9029, 12.4534],
  "Venezuela": [6.4238, -66.5897],
  "Vietnam": [14.0583, 108.2772],
  "Yemen": [15.5527, 48.5164],
  "Zambia": [-13.1339, 27.8493],
  "Zimbabwe": [-19.0154, 29.1549]
};

// Function to clear existing layers from the map
function clearMapLayers() {
  map.eachLayer((layer) => {
    if (layer instanceof L.Marker || layer instanceof L.Polyline || layer instanceof (L as any).heatLayer) {
      map.removeLayer(layer);
    }
  });
}

// Variables to store selected nodes for pathfinding
let selectedNodes: string[] = [];

// Dijkstra's Algorithm for Shortest Path
function findShortestPath(graph: { [key: string]: string[] }, start: string, end: string) {
  const distances: { [key: string]: number } = {};
  const prev: { [key: string]: string | null } = {};
  const unvisited = new Set<string>(Object.keys(graph));

  // Initialize distances and previous nodes
  for (const node of Object.keys(graph)) {
    distances[node] = Infinity;
    prev[node] = null;
  }
  distances[start] = 0;

  while (unvisited.size > 0) {
    // Get the node with the smallest distance
    const currentNode = Array.from(unvisited).reduce((minNode, node) =>
      distances[node] < distances[minNode] ? node : minNode
    );

    if (currentNode === end) break;

    unvisited.delete(currentNode);

    // Update distances for neighbors
    for (const neighbor of graph[currentNode]) {
      const alt = distances[currentNode] + 1; // All edges are considered as distance 1
      if (alt < distances[neighbor]) {
        distances[neighbor] = alt;
        prev[neighbor] = currentNode;
      }
    }
  }

  // Reconstruct the shortest path
  const path: string[] = [];
  let u = end;
  while (u !== null) {
    path.unshift(u);
    u = prev[u] as string;
  }

  return path;
}

// Function to visualize the shortest path
function visualizeShortestPath(path: string[], countryCoords: { [key: string]: [number, number] }) {
  for (let i = 0; i < path.length - 1; i++) {
    const startCountry = path[i];
    const endCountry = path[i + 1];
    if (countryCoords[startCountry] && countryCoords[endCountry]) {
      const startLatLng = countryCoords[startCountry];
      const endLatLng = countryCoords[endCountry];

      // Draw a straight line (polyline) between the two points
      L.polyline([startLatLng, endLatLng], {
        color: '#ffcc00', // Modern yellow color for the path
        weight: 5,
        dashArray: '5, 10', // Dashed lines for better visibility
        opacity: 0.8,
      }).addTo(map);
    }
  }
}

// Function to deselect nodes on right-click
function deselectNode(country: string) {
  const index = selectedNodes.indexOf(country);
  if (index !== -1) {
    selectedNodes.splice(index, 1);
  }
}

// Function to calculate and visualize degree centrality
function calculateDegreeCentrality(inboundCounts: { [country: string]: number }, outboundCounts: { [country: string]: number }) {
  const centrality: { [country: string]: number } = {};

  Object.keys(inboundCounts).forEach((country) => {
    centrality[country] = (centrality[country] || 0) + inboundCounts[country];
  });

  Object.keys(outboundCounts).forEach((country) => {
    centrality[country] = (centrality[country] || 0) + outboundCounts[country];
  });

  return centrality;
}


// Load and visualize data using Leaflet markers and polylines
function loadData(type: string) {
  console.log('Loading data for type:', type); // Log the type for debugging

  const validTypes = ['transfer', 'context-transfer', 'app-transfer'];
  if (!validTypes.includes(type)) {
    console.error('Invalid data type:', type);
    return; // Exit if invalid type
  }

  fetch(`http://localhost:3000/data/${type}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      clearMapLayers(); // Clear existing markers and polylines

      const appCounts: { [country: string]: number } = {};
      const inboundCounts: { [country: string]: number } = {}; // To track inbound edges
      const outboundCounts: { [country: string]: number } = {}; // To track outbound edges
      const graph: { [country: string]: string[] } = {}; // For pathfinding
      const heatmapData: [number, number, number][] = [];

      // Create markers for each app based on its country
      data.metadata.forEach((entry: { app: string; country: string }) => {
        const country = entry.country;
        if (countryCoords[country]) {
          appCounts[country] = (appCounts[country] || 0) + 1;
          graph[country] = []; // Initialize graph adjacency list
          const [lat, lng] = countryCoords[country];

          // Add to heatmap data
          heatmapData.push([lat, lng, appCounts[country]]);
        }
      });

      // Create edges (polylines) between apps based on relationships
      data.relationships.forEach((entry: { sending: string; receiving: string }) => {
        const sendingApp = data.metadata.find((app: any) => app.app === entry.sending);
        const receivingApp = data.metadata.find((app: any) => app.app === entry.receiving);

        if (sendingApp && receivingApp) {
          const sendingCountry = countryCoords[sendingApp.country];
          const receivingCountry = countryCoords[receivingApp.country];

          if (sendingCountry && receivingCountry) {
            // Draw a straight line between the sending and receiving countries
            L.polyline([sendingCountry, receivingCountry], {
              color: '#4fc3f7', // Light blue color
              weight: 3,
              opacity: 0.6,
              className: 'responsive-edge' // Add a CSS class for hover effect
            }).addTo(map);

            // Add the relationship to the graph for pathfinding
            graph[sendingApp.country].push(receivingApp.country);

            // Track the outbound edge count from the sending country
            outboundCounts[sendingApp.country] = (outboundCounts[sendingApp.country] || 0) + 1;
            // Track the inbound edge count to the receiving country
            inboundCounts[receivingApp.country] = (inboundCounts[receivingApp.country] || 0) + 1;
          }
        }
      });

      // Calculate degree centrality (total number of edges connected to each country)
      const degreeCentrality = calculateDegreeCentrality(inboundCounts, outboundCounts);

      // Create markers and bind tooltips for each country
      Object.keys(appCounts).forEach((country) => {
        if (countryCoords[country]) {
          const [lat, lng] = countryCoords[country];
          const appCount = appCounts[country];
          const outboundCount = outboundCounts[country] || 0;
          const inboundCount = inboundCounts[country] || 0;
          const centrality = degreeCentrality[country] || 0;

          // Create a marker for the country
          const marker = L.marker([lat, lng])
            .bindPopup(`<b>Country:</b> ${country}<br/><b>Total Apps:</b> ${appCount}`);

          // Bind a tooltip that shows the total apps, outbound edges, inbound edges, and centrality score on hover
          marker.bindTooltip(`
            <b>Country:</b> ${country}<br/>
            <b>Total Apps:</b> ${appCount}<br/>
            <b>Outbound Edges:</b> ${outboundCount}<br/>
            <b>Inbound Edges:</b> ${inboundCount}<br/>
            <b>Degree Centrality:</b> ${centrality}
          `, { permanent: false, direction: 'top' });

          // Click event for selecting nodes
          marker.on('click', function () {
            selectedNodes.push(country);

            if (selectedNodes.length === 2) {
              // If two nodes are selected, find and visualize the shortest path
              const [start, end] = selectedNodes;
              const shortestPath = findShortestPath(graph, start, end);
              visualizeShortestPath(shortestPath, countryCoords);
              selectedNodes = []; // Reset after showing the path
            }
          });

          // Right-click event to deselect a node
          marker.on('contextmenu', function () {
            deselectNode(country); // Deselect the node
          });

          marker.addTo(map);
        }
      });

      // Add heatmap overlay based on outbound apps with increased intensity
      addHeatmap(heatmapData);

      // Add legend to explain the heatmap and edge thickness
      addLegend();
    })
    .catch((error) => {
      console.error('Error loading data:', error);
    });
}

// Add heatmap layer based on outbound app counts with red shading
function addHeatmap(heatmapData: [number, number, number][]) {
  (L as any).heatLayer(heatmapData, {
    radius: 50, // Increased radius to cover more area (e.g., whole countries)
    maxZoom: 7,
    max: 2,  // Increase intensity
    gradient: {
      0.2: 'yellow',
      0.4: 'orange',
      0.6: 'red',
      0.8: '#990000', // Darker red
      1.0: '#660000' // Very intense dark red
    }
  }).addTo(map);
}

// Add legend to explain the heatmap and edge thickness
function addLegend() {
  const legend = new L.Control({ position: 'bottomright' });

  legend.onAdd = function () {
    const div = L.DomUtil.create('div', 'info legend');
    div.innerHTML += '<h4>Map Legend</h4>';
    div.innerHTML += '<i style="background: yellow"></i> Low App Density<br>';
    div.innerHTML += '<i style="background: red"></i> High App Density<br>';
    div.innerHTML += '<i style="background: #660000"></i> Very High App Density<br>';
    div.innerHTML += '<hr>';
    div.innerHTML += '<i style="background: blue; width: 20px; height: 2px; display: inline-block;"></i> 1-2 Connections<br>';
    div.innerHTML += '<i style="background: blue; width: 20px; height: 5px; display: inline-block;"></i> 3-5 Connections<br>';
    div.innerHTML += '<i style="background: blue; width: 20px; height: 10px; display: inline-block;"></i> 6+ Connections<br>';
    return div;
  };

  legend.addTo(map);
}

// Event listeners for the tabs
document.querySelectorAll('.tab-button').forEach((button) => {
  button.addEventListener('click', (e) => {
    document.querySelectorAll('.tab-button').forEach((b) => b.classList.remove('active'));
    (e.target as HTMLElement).classList.add('active');
    loadData((e.target as HTMLElement).dataset.type!);
  });
});

// Load initial data for 'transfer' tab
loadData('transfer');

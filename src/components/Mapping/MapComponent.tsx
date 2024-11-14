import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import { StationsResponse } from "@/interfaces/ApiResponse";
import { MapComponentProps } from "@/interfaces/MapComponentsInterfaces";
import { Link } from "react-router-dom";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  shadowAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function MapComponent({
  center,
  scrollWheelZoom = false,
  markers,
}: MapComponentProps) {
  return (
    <div className="w-full max-w-3xl mx-auto p-1 bg-white rounded-lg shadow-md"> 
      <h2 className="text-center text-3xl font-semibold mb-4">Estações</h2> 
      <div className="flex items-center space-x-3">
        <div className="flex-1 bg-gray-100 p-1 rounded-lg">
          <MapContainer
            center={center}
            zoom={13}
            scrollWheelZoom={scrollWheelZoom}
            className="w-full h-80 rounded-lg" 
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markers?.map((marker: StationsResponse) => (
              <Marker key={marker.id} position={[marker.latitude, marker.longitude]}>
                <Popup>
                  <Link to={`/readings/${marker.id}`}>
                    <span className="text-gray-900">{marker.name}</span>
                  </Link>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Painel de Busca */}
        <div className="w-64 bg-gray-50 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Buscar</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700">Buscar por ID</label>
              <input type="text" placeholder="Informe o ID" className="w-full p-2 border rounded" />
              <button className="mt-2 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Buscar</button>
            </div>
            <div>
              <label className="block text-gray-700">Buscar por Tag</label>
              <input type="text" placeholder="Informe a tag" className="w-full p-2 border rounded" />
              <button className="mt-2 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Buscar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

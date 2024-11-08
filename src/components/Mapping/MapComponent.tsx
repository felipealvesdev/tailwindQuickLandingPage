import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import { StationsResponse } from "@/interfaces/ApiResponse";
import { MapComponentProps } from "@/interfaces/MapComponentsInterfaces";
import { Link } from "react-router-dom";

// Set up the default icon for markers
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
    <MapContainer center={center} zoom={13} scrollWheelZoom={scrollWheelZoom}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers?.map((marker: StationsResponse) => {
        return (
          <Marker position={[marker.latitude, marker.longitude]}>
            <Popup>
              <Link to={`/readings/${marker.id}`}>
                <span className="text-gray-900">{marker.name}</span>
              </Link>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

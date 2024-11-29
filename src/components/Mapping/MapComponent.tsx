import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import { StationsResponse } from "@/interfaces/ApiResponse";
import { MapComponentProps } from "@/interfaces/MapComponentsInterfaces";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { ListRestart } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  shadowAnchor: [12, 41],
});

function renderSelectItems(markers: StationsResponse[]) {
  return markers
    .filter((marker) => marker)
    .map((marker) => (
      <SelectItem key={marker.id} value={String(marker.id)}>
        {marker.name}
      </SelectItem>
    ));
}

L.Marker.prototype.options.icon = DefaultIcon;

export default function MapComponent({
  center,
  scrollWheelZoom = false,
  markers,
}: MapComponentProps) {
  const { language } = useTranslation();
  const [select, setselect] = useState<string | undefined>("");
  const filteredMarkers = select
    ? markers?.filter((marker) => String(marker.id) === select)
    : markers;

  const handleReset = () => {
    setselect("");
  };

  const translateObject = {
    title: {
      "pt-BR": "Estações",
      "en-US": "Stations",
    },
    cartTitle: {
      "pt-BR": "Buscar Estações",
      "en-US": "Search Stations",
    },
    resetSelection: {
      "pt-BR": "Resetar Seleção",
      "en-US": "Clear Selection",
    },
    selectPlaceholder: {
      "pt-BR": "Selecione uma estação",
      "en-US": "Select a station",
    },
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-center text-2xl sm:text-3xl font-semibold mb-6">
        {language === "pt-BR"
          ? translateObject.title["pt-BR"]
          : translateObject.title["en-US"]}
      </h2>
      <div className="w-full bg-gray-50 p-4 rounded-lg shadow-md mb-4">
        <h3 className="text-lg font-semibold mb-4">
          {language === "pt-BR"
            ? translateObject.cartTitle["pt-BR"]
            : translateObject.cartTitle["en-US"]}
        </h3>
        <div className="flex items-center space-x-2">
          <div className="flex w-full items-center space-x-2">
            <Select value={select} onValueChange={setselect}>
              <SelectTrigger className="w-full flex flex-1">
                <SelectValue
                  placeholder={
                    language === "pt-BR"
                      ? translateObject.selectPlaceholder["pt-BR"]
                      : translateObject.selectPlaceholder["en-US"]
                  }
                />
              </SelectTrigger>
              <SelectContent className="max-h-60 overflow-y-auto">
                {markers && renderSelectItems(markers)}
              </SelectContent>
            </Select>
            <button
              onClick={handleReset}
              className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-300"
              title={
                language === "pt-BR"
                  ? translateObject.resetSelection["pt-BR"]
                  : translateObject.resetSelection["en-US"]
              }
            >
              <ListRestart className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      <div className="w-full bg-gray-100 p-1 rounded-lg z-0">
        <MapContainer
          center={center}
          zoom={13}
          scrollWheelZoom={scrollWheelZoom}
          className="w-full h-80 rounded-lg z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filteredMarkers?.map((marker: StationsResponse) => (
            <Marker
              key={marker.id}
              position={[marker.latitude, marker.longitude]}
            >
              <Popup>
                <Link to={`/readings/${marker.id}`}>
                  <span className="text-gray-900">{marker.name}</span>
                </Link>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

import { StationsResponse } from "./ApiResponse";

export interface MapComponentProps {
  center: [number, number];
  scrollWheelZoom?: boolean;
  markers?: StationsResponse[];
}

export interface ApiResponse {
  readings: ReadingsProps[];
  station_id: number;
  station_name: string;
}

export interface ReadingsProps {
  created_at: string;
  id: number;
  organization: null;
  station: number;
  type: "T" | "L" | "P" | "U" | "A" | "H";
  value: number;
}

export interface GraphType {
  type: "T" | "L" | "P" | "U" | "A" | "H";
}

export interface StationsResponse {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  created_at: string;
  updated_at: string;
  user: null;
  organization: null;
}

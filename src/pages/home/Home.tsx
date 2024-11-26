import useStations from "@/hooks/useStations";
import Announcement from "../../components/Announcement/Announcement";
import MapComponent from "../../components/Mapping/MapComponent";
import Loading from "@/components/Loading/Loading";
import colors from "tailwindcss/colors";

export default function Home() {
  const token = import.meta.env.VITE_API_TOKEN;
  const stationsUrl = import.meta.env.VITE_API_STATIONS_URL;
  const { data, loading } = useStations({
    url: stationsUrl,
    token: token,
  });
  if (loading) {
    return (
      <div className="flex p-12 flex-1 items-center justify-center">
        <Loading size={48} color={colors.slate[900]} />
      </div>
    );
  }
  console.log(data);
  return (
    <div className="w-full flex flex-col py-4 px-4 lg:px-0 space-y-2">
      <MapComponent
        center={[-8.061731971923335, -34.87185848861633]}
        markers={data}
      />
      <Announcement />
    </div>
  );
}

import { Loader2 } from "lucide-react";
import colors from "tailwindcss/colors";

function Loading({ color, size }: { color?: string; size?: number }) {
  return (
    <div className="animate-pulse">
      <div className="animate-spin">
        <Loader2
          color={color ? color : colors.gray[900]}
          size={size ? size : 24}
        />
      </div>
    </div>
  );
}

export default Loading;

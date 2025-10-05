import { MapView } from "../MapView";
import { ThemeProvider } from "../ThemeProvider";

export default function MapViewExample() {
  return (
    <ThemeProvider>
      <div className="h-screen bg-background">
        <MapView />
      </div>
    </ThemeProvider>
  );
}

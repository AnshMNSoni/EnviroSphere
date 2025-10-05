import { WhatIfSimulator } from "../WhatIfSimulator";
import { ThemeProvider } from "../ThemeProvider";

export default function WhatIfSimulatorExample() {
  return (
    <ThemeProvider>
      <div className="p-8 bg-background min-h-screen">
        <div className="max-w-2xl mx-auto">
          <WhatIfSimulator />
        </div>
      </div>
    </ThemeProvider>
  );
}

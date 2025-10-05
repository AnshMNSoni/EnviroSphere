import { CommunityReport } from "../CommunityReport";
import { ThemeProvider } from "../ThemeProvider";
import { Card } from "@/components/ui/card";

export default function CommunityReportExample() {
  return (
    <ThemeProvider>
      <div className="p-8 bg-background min-h-screen">
        <div className="max-w-2xl mx-auto">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Report an Issue</h2>
            <CommunityReport />
          </Card>
        </div>
      </div>
    </ThemeProvider>
  );
}

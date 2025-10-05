import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, X } from "lucide-react";
import { useState } from "react";

interface CommunityReportProps {
  onSubmit?: (data: ReportData) => void;
  className?: string;
}

interface ReportData {
  category: string;
  location: string;
  description: string;
  photo?: File;
}

export function CommunityReport({
  onSubmit,
  className = "",
}: CommunityReportProps) {
  const [formData, setFormData] = useState<ReportData>({
    category: "",
    location: "",
    description: "",
  });
  const [photo, setPhoto] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Report submitted:", formData);
    onSubmit?.(formData);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-6 ${className}`}
      data-testid="form-community-report"
    >
      <div className="space-y-2">
        <Label htmlFor="category">Issue Category</Label>
        <Select
          value={formData.category}
          onValueChange={(value) =>
            setFormData({ ...formData, category: value })
          }
        >
          <SelectTrigger data-testid="select-category">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="air-quality">Air Quality</SelectItem>
            <SelectItem value="water">Water Issues</SelectItem>
            <SelectItem value="waste">Waste Management</SelectItem>
            <SelectItem value="green-space">Green Space</SelectItem>
            <SelectItem value="noise">Noise Pollution</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          placeholder="e.g., 123 Main St or coordinates"
          value={formData.location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
          data-testid="input-location"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Describe the issue you're reporting..."
          rows={4}
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          data-testid="textarea-description"
        />
      </div>

      <div className="space-y-2">
        <Label>Photo (Optional)</Label>
        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover-elevate">
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
            id="photo-upload"
            data-testid="input-photo"
          />
          {photo ? (
            <div className="flex items-center justify-between">
              <span className="text-sm">{photo.name}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setPhoto(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <label
              htmlFor="photo-upload"
              className="cursor-pointer flex flex-col items-center gap-2"
            >
              <Upload className="h-8 w-8 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Click to upload photo
              </span>
            </label>
          )}
        </div>
      </div>

      <Button type="submit" className="w-full" data-testid="button-submit-report">
        Submit Report
      </Button>
    </form>
  );
}

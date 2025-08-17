import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Download, 
  File, 
  FileText, 
  Image, 
  Archive,
  Video,
  Music,
  Search,
  Calendar,
  HardDrive,
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface DownloadableFile {
  id: string;
  name: string;
  type: "document" | "image" | "video" | "audio" | "archive" | "other";
  size: string;
  uploadDate: string;
  downloadCount: number;
  orderId: string;
  description?: string;
  url: string;
  isExpired?: boolean;
  expiryDate?: string;
}

interface DownloadsFilesProps {
  files?: DownloadableFile[];
  className?: string;
  onDownload?: (file: DownloadableFile) => void;
  onPreview?: (file: DownloadableFile) => void;
}

const DownloadsFiles: React.FC<DownloadsFilesProps> = ({
  files,
  className = "",
  onDownload,
  onPreview
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  // Sample data if none provided
  const defaultFiles: DownloadableFile[] = [
    {
      id: "1",
      name: "Project_Proposal_Final.pdf",
      type: "document",
      size: "2.4 MB",
      uploadDate: "2024-12-20",
      downloadCount: 15,
      orderId: "ORD-001",
      description: "Final project proposal with specifications",
      url: "/downloads/proposal.pdf",
      isExpired: false
    },
    {
      id: "2",
      name: "Website_Mockups.zip",
      type: "archive",
      size: "15.8 MB",
      uploadDate: "2024-12-19",
      downloadCount: 8,
      orderId: "ORD-006",
      description: "UI/UX mockups and design assets",
      url: "/downloads/mockups.zip",
      isExpired: false
    },
    {
      id: "3",
      name: "Brand_Guidelines.pdf",
      type: "document",
      size: "5.2 MB",
      uploadDate: "2024-12-18",
      downloadCount: 12,
      orderId: "ORD-002",
      description: "Complete brand identity guidelines",
      url: "/downloads/brand.pdf",
      isExpired: false
    },
    {
      id: "4",
      name: "Logo_Variations.png",
      type: "image",
      size: "892 KB",
      uploadDate: "2024-12-17",
      downloadCount: 25,
      orderId: "ORD-003",
      description: "Logo in various formats and sizes",
      url: "/downloads/logo.png",
      isExpired: false
    },
    {
      id: "5",
      name: "Training_Video.mp4",
      type: "video",
      size: "125 MB",
      uploadDate: "2024-12-15",
      downloadCount: 5,
      orderId: "ORD-004",
      description: "Software training and tutorial video",
      url: "/downloads/training.mp4",
      isExpired: true,
      expiryDate: "2024-12-22"
    }
  ];

  const displayFiles = files || defaultFiles;

  const getFileIcon = (type: string) => {
    switch (type) {
      case "document":
        return FileText;
      case "image":
        return Image;
      case "video":
        return Video;
      case "audio":
        return Music;
      case "archive":
        return Archive;
      default:
        return File;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "document":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "image":
        return "bg-green-100 text-green-800 border-green-200";
      case "video":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "audio":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "archive":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const filteredFiles = displayFiles.filter(file => {
    const matchesSearch = 
      file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.orderId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === "all" || file.type === typeFilter;
    
    return matchesSearch && matchesType;
  });

  const canPreview = (type: string) => {
    return ["image", "document"].includes(type);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="flex items-center gap-2">
            <HardDrive className="h-5 w-5" />
            Downloads & Files
          </CardTitle>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-auto"
              />
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className=" gap-4">
          {filteredFiles.map((file) => {
            const FileIcon = getFileIcon(file.type);
            
            return (
              <div
                key={file.id}
                className={cn(
                  "p-4 border rounded-lg bg-card hover:bg-accent/50 transition-colors",
                  file.isExpired && "opacity-60 border-red-200"
                )}
              >
                <div className="space-y-3">
                  {/* File Header */}
                  <div className="flex items-start gap-3">
                    <div className={cn("p-2 rounded-lg", getTypeColor(file.type))}>
                      <FileIcon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm truncate">{file.name}</h3>
                      <p className="text-xs text-muted-foreground">{file.size}</p>
                    </div>
                    {file.isExpired && (
                      <Badge variant="destructive" className="text-xs">
                        Expired
                      </Badge>
                    )}
                  </div>

                  {/* File Info */}
                  <div className="space-y-2">
                    {file.description && (
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {file.description}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(file.uploadDate).toLocaleDateString()}
                      </span>
                      <span>{file.downloadCount} downloads</span>
                    </div>
                    
                    <div className="text-xs text-muted-foreground">
                      Order: {file.orderId}
                    </div>
                    
                    {file.isExpired && file.expiryDate && (
                      <div className="text-xs text-red-600">
                        Expired on {new Date(file.expiryDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {canPreview(file.type) && !file.isExpired && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => onPreview?.(file)}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                    )}
                    
                    <Button
                      variant={file.isExpired ? "secondary" : "default"}
                      size="sm"
                      className="flex-1"
                      onClick={() => onDownload?.(file)}
                      disabled={file.isExpired}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {filteredFiles.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <HardDrive className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No files available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DownloadsFiles;

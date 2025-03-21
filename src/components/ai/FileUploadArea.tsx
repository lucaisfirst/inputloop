
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { FileUploadProps } from "./types";

const FileUploadArea: React.FC<FileUploadProps> = ({ uploadedFiles, setUploadedFiles }) => {
  const { toast } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setUploadedFiles((prev) => [...prev, ...newFiles]);

      toast({
        title: "파일 업로드 완료",
        description: `${newFiles.length}개의 파일이 분석 대기 중입니다.`,
      });
    }
  };

  const removeFile = (fileName: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.name !== fileName));
    toast({
      title: "파일 삭제됨",
      description: `${fileName} 파일이 삭제되었습니다.`,
    });
  };

  return (
    <div>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => document.getElementById("file-upload")?.click()}
      >
        <Upload className="h-4 w-4" />
        <input
          id="file-upload"
          type="file"
          multiple
          className="hidden"
          onChange={handleFileUpload}
        />
      </Button>

      {uploadedFiles.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {uploadedFiles.map((file, idx) => (
            <Badge
              key={idx}
              variant="secondary"
              className="flex items-center gap-1 px-2 py-1"
            >
              <span className="text-xs truncate max-w-[120px]">{file.name}</span>
              <button
                onClick={() => removeFile(file.name)}
                className="text-gray-400 hover:text-red-500"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploadArea;

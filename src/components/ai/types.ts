
export interface Message {
  id: number;
  type: "user" | "ai";
  content: string;
  timestamp: string;
}

export interface FileUploadProps {
  uploadedFiles: File[];
  setUploadedFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

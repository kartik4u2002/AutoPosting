import React, { useState, useCallback } from 'react';
import { UploadCloud, X, File, FileVideo, Image as ImageIcon } from 'lucide-react';
import { cn } from './ui/Button';

export function UploadDropzone({ onFileAccept }) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragOut = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
      if (onFileAccept) onFileAccept(droppedFile);
    }
  }, [onFileAccept]);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      if (onFileAccept) onFileAccept(selectedFile);
    }
  };

  const removeFile = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFile(null);
    if (onFileAccept) onFileAccept(null);
  };

  return (
    <div className="w-full">
      {!file ? (
        <label 
          className={cn(
            "relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl cursor-pointer transition-all",
            isDragging 
              ? "border-primary-500 bg-primary-50" 
              : "border-gray-300 bg-gray-50 hover:bg-gray-100"
          )}
          onDragEnter={handleDragIn}
          onDragLeave={handleDragOut}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <UploadCloud className={cn("w-12 h-12 mb-4", isDragging ? "text-primary-500" : "text-gray-400")} />
            <p className="mb-2 text-sm text-gray-500"><span className="font-semibold text-primary-600">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500">PNG, JPG or MP4 (MAX. 50MB)</p>
          </div>
          <input 
            type="file" 
            className="hidden" 
            accept="image/png, image/jpeg, video/mp4" 
            onChange={handleChange}
          />
        </label>
      ) : (
        <div className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-gray-200 rounded-xl bg-gray-50 overflow-hidden">
          {file.type.startsWith('image/') ? (
            <div className="absolute inset-0 w-full h-full opacity-30">
              <ImageIcon className="w-full h-full p-16 text-gray-300" />
            </div>
          ) : (
             <div className="absolute inset-0 w-full h-full opacity-30">
               <FileVideo className="w-full h-full p-16 text-gray-300" />
            </div>
          )}
          
          <div className="z-10 bg-white p-4 rounded-lg shadow-sm w-3/4 max-w-sm flex items-center justify-between">
            <div className="flex items-center space-x-3 truncate">
              <File className="w-8 h-8 text-primary-500 flex-shrink-0" />
              <div className="truncate">
                <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                <p className="text-xs text-gray-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
              </div>
            </div>
            <button 
              onClick={removeFile}
              className="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

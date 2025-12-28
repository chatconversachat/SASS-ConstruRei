import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, File, X } from 'lucide-react';

interface FileUploadProps {
  onFilesAdded: (files: File[]) => void;
  onFileRemove: (fileName: string) => void;
  acceptedFiles: File[];
  accept?: string;
  maxFiles?: number;
}

const FileUpload: React.FC<FileUploadProps> = ({ 
  onFilesAdded, 
  onFileRemove, 
  acceptedFiles,
  accept = 'image/*,application/pdf',
  maxFiles = 10
}) => {
  const onDrop = useCallback((files: File[]) => {
    onFilesAdded(files);
  }, [onFilesAdded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
      'application/pdf': ['.pdf']
    },
    maxFiles
  });

  return (
    <div className="space-y-4">
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <p className="font-medium text-gray-700">
          {isDragActive ? 'Solte os arquivos aqui' : 'Arraste arquivos ou clique para selecionar'}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Suporte para imagens (JPG, PNG) e PDF
        </p>
      </div>

      {acceptedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium">Arquivos selecionados:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {acceptedFiles.map((file, index) => (
              <Card key={index} className="p-3 flex items-center justify-between">
                <div className="flex items-center">
                  <File className="h-5 w-5 text-gray-500 mr-2" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onFileRemove(file.name)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadProps {
  onImageUpload: (url: string) => void;
  currentImage?: string;
  aspectRatio?: string;
  maxWidth?: number;
  maxHeight?: number;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUpload,
  currentImage,
  aspectRatio = "16:9",
  maxWidth = 800,
  maxHeight = 600
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un fichier image valide.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    
    try {
      // Create a preview URL for immediate display
      const previewUrl = URL.createObjectURL(file);
      onImageUpload(previewUrl);
      
      // Here you would typically upload to your storage service
      // For now, we'll just use the preview URL
      
      toast({
        title: "Image uploadée",
        description: "L'image a été uploadée avec succès.",
      });
    } catch (error) {
      toast({
        title: "Erreur d'upload",
        description: "Impossible d'uploader l'image. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const removeImage = () => {
    onImageUpload('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
      />
      
      {currentImage ? (
        <Card className="relative overflow-hidden">
          <img
            src={currentImage}
            alt="Uploaded"
            className="w-full h-48 object-cover"
          />
          <Button
            variant="destructive"
            size="sm"
            onClick={removeImage}
            className="absolute top-2 right-2"
          >
            <X className="w-4 h-4" />
          </Button>
        </Card>
      ) : (
        <Card
          className={`border-2 border-dashed p-8 text-center cursor-pointer transition-colors ${
            dragOver ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 rounded-full bg-muted">
              <ImageIcon className="w-8 h-8 text-muted-foreground" />
            </div>
            
            <div>
              <p className="text-lg font-medium">
                {isUploading ? 'Upload en cours...' : 'Cliquez ou glissez une image'}
              </p>
              <p className="text-sm text-muted-foreground">
                PNG, JPG, WEBP jusqu'à 10MB
              </p>
              {aspectRatio && (
                <p className="text-xs text-muted-foreground mt-1">
                  Ratio recommandé: {aspectRatio}
                </p>
              )}
            </div>
            
            <Button variant="outline" disabled={isUploading}>
              <Upload className="w-4 h-4 mr-2" />
              {isUploading ? 'Upload...' : 'Choisir un fichier'}
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};
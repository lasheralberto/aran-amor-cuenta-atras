
import React from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ImageFrameProps {
  imageUrl: string;
  caption?: string;
}

const ImageFrame: React.FC<ImageFrameProps> = ({ imageUrl, caption = "Alberto & Mariona - Val d'Aran" }) => {
  return (
    <div className="absolute left-6 bottom-24 w-64 md:w-80 z-20">
      <div className="rounded-md overflow-hidden border-4 border-winter-medium bg-white shadow-lg">
        <AspectRatio ratio={4 / 3}>
          <img 
            src={imageUrl} 
            alt="Alberto y Mariona"
            className="w-full h-full object-cover" 
          />
        </AspectRatio>
        <div className="p-2 bg-winter-light">
          <p className="text-xs text-center text-winter-dark font-medium">{caption}</p>
        </div>
      </div>
    </div>
  );
};

export default ImageFrame;

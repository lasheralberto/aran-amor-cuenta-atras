
import React from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface VideoFrameProps {
  videoUrl: string;
}

const VideoFrame: React.FC<VideoFrameProps> = ({ videoUrl }) => {
  return (
    <div className="absolute left-6 bottom-24 w-64 md:w-80 z-20">
      <div className="rounded-md overflow-hidden border-4 border-winter-medium bg-white shadow-lg">
        <AspectRatio ratio={16 / 9}>
          <video 
            className="w-full h-full object-cover" 
            controls 
            loop
            muted
          >
            <source src={videoUrl} type="video/mp4" />
            Tu navegador no soporta videos.
          </video>
        </AspectRatio>
        <div className="p-2 bg-winter-light">
          <p className="text-xs text-center text-winter-dark font-medium">Alberto & Mariona - Val d'Aran</p>
        </div>
      </div>
    </div>
  );
};

export default VideoFrame;

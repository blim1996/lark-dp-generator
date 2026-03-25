"use client";

import { motion } from "framer-motion";
import { toast } from "sonner";
import { format } from "date-fns";
import { scaleIn } from "@/lib/animations";
import Button from "@/components/ui/Button";
import Image from "next/image";

interface ImagePreviewProps {
  imageUrl: string;
  onReset: () => void;
}

export default function ImagePreview({ imageUrl, onReset }: ImagePreviewProps) {
  const handleDownload = async () => {
    try {
      // For data URLs (base64), we can directly use them
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = `lark-dp-${format(new Date(), "yyyy-MM-dd")}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Image downloaded!");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download image");
    }
  };

  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      animate="visible"
      className="space-y-6 max-w-md mx-auto"
    >
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-4">
          <Image
            src={imageUrl}
            alt="Generated display picture"
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        <p className="text-sm text-gray-400 text-center mb-4">
          Your Lark display picture is ready!
        </p>

        <div className="flex gap-3">
          <Button
            variant="primary"
            onClick={handleDownload}
            className="flex-1"
          >
            Download Image
          </Button>

          <Button variant="secondary" onClick={onReset} className="flex-1">
            Generate Another
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

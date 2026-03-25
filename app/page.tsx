"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";
import GeneratorForm from "@/components/form/GeneratorForm";
import ImagePreview from "@/components/results/ImagePreview";

export default function Home() {
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = (imageUrl: string) => {
    setGeneratedImageUrl(imageUrl);
    setIsGenerating(false);
  };

  const handleReset = () => {
    setGeneratedImageUrl(null);
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center p-6">
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="w-full max-w-2xl"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-gradient">
            Lark Display Picture Generator
          </h1>
          <p className="text-lg text-gray-400">
            Create custom leave notices for your profile
          </p>
        </div>

        {/* Main Content */}
        {generatedImageUrl ? (
          <ImagePreview imageUrl={generatedImageUrl} onReset={handleReset} />
        ) : (
          <GeneratorForm
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
            setIsGenerating={setIsGenerating}
          />
        )}

        {/* Footer */}
        <div className="text-center mt-12 text-sm text-gray-500">
          <p>Powered by Canvas API • No costs, instant generation</p>
        </div>
      </motion.div>
    </div>
  );
}

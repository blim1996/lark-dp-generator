"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { formatDate } from "@/lib/utils";
import { stagger, slideUp } from "@/lib/animations";
import { generateDisplayPicture } from "@/lib/canvas-generator";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import DateRangePicker from "@/components/ui/DateRangePicker";

interface GeneratorFormProps {
  onGenerate: (imageUrl: string) => void;
  isGenerating: boolean;
  setIsGenerating: (value: boolean) => void;
}

export default function GeneratorForm({
  onGenerate,
  isGenerating,
  setIsGenerating,
}: GeneratorFormProps) {
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);
  const [coverer, setCoverer] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!dateFrom || !dateTo) {
      setError("Please select a date range");
      return;
    }

    if (dateTo < dateFrom) {
      setError("End date must be after start date");
      return;
    }

    setIsGenerating(true);

    try {
      // Small delay for UX (so user sees the loading state)
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Generate image using Canvas (client-side, no API call)
      const imageUrl = generateDisplayPicture(
        formatDate(dateFrom),
        formatDate(dateTo),
        coverer || undefined
      );

      onGenerate(imageUrl);
      toast.success("Image generated successfully!");
      setIsGenerating(false);
    } catch (err: any) {
      console.error("Generation error:", err);
      toast.error(err.message || "Failed to generate image");
      setIsGenerating(false);
    }
  };

  return (
    <motion.form
      variants={stagger}
      initial="hidden"
      animate="visible"
      onSubmit={handleSubmit}
      className="space-y-6 max-w-md mx-auto"
    >
      <motion.div variants={slideUp}>
        <DateRangePicker
          label="Date of Absence *"
          value={{ from: dateFrom, to: dateTo }}
          onChange={({ from, to }) => {
            setDateFrom(from);
            setDateTo(to);
            setError("");
          }}
          error={error}
        />
      </motion.div>

      <motion.div variants={slideUp}>
        <Input
          label="Coverer (Optional)"
          placeholder="Who will cover for you?"
          value={coverer}
          onChange={(e) => setCoverer(e.target.value)}
        />
      </motion.div>

      <motion.div variants={slideUp}>
        <Button
          type="submit"
          variant="primary"
          isLoading={isGenerating}
          disabled={isGenerating || !dateFrom || !dateTo}
          className="w-full"
        >
          {isGenerating ? "Generating..." : "Generate Display Picture"}
        </Button>
      </motion.div>

      {isGenerating && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-gray-400 text-center"
        >
          Creating your image...
        </motion.p>
      )}

      {/* Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-xs text-gray-500 text-center pt-2 border-t border-gray-800"
      >
        ✨ Generated instantly - 100% free!
      </motion.div>
    </motion.form>
  );
}

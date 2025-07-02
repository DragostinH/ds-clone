import { cn } from "@/lib/utils";
import React from "react";

interface SelectedItemIndicatorProps {
  condition: boolean;
}

const SelectedItemIndicator: React.FC<SelectedItemIndicatorProps> = ({ condition }) => {
  return <div className={cn("absolute left-0 bg-primary rounded-r-full transition-all w-1", `${condition}` && "group-hover:h-5", `${condition}` ? "h-9" : "h-2")} />;
};

export default SelectedItemIndicator;

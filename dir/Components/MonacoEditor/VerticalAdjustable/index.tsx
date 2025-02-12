import { Axis3d } from "lucide-react";
import { useState, ReactNode, useEffect } from "react";

interface VerticalAdjustableProps {
  children: ReactNode;
  contentHeight?: number;
}

export const VerticalAdjustable = ({ children, contentHeight }: VerticalAdjustableProps) => {
  const DEFAULT_HEIGHT = 300;
  const DEFAULT_LOWER_LIMIT = 200;
  const DEFAULT_UPPER_LIMIT = 300;

  const [isResizing, setIsResizing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [height, setHeight] = useState(DEFAULT_HEIGHT);

  const computeLimits = (contentHeight?: number) => {
    if (contentHeight === undefined) {
      return { lowerLimit: DEFAULT_LOWER_LIMIT, upperLimit: DEFAULT_UPPER_LIMIT };
    }

    const adjustedHeight = contentHeight + 40;

    if (adjustedHeight < DEFAULT_LOWER_LIMIT) {
      return { lowerLimit: adjustedHeight, upperLimit: DEFAULT_LOWER_LIMIT };
    } else if (adjustedHeight > DEFAULT_UPPER_LIMIT) {
      return { lowerLimit: DEFAULT_UPPER_LIMIT, upperLimit: adjustedHeight };
    } else {
      return { lowerLimit: DEFAULT_LOWER_LIMIT, upperLimit: DEFAULT_UPPER_LIMIT };
    }
  };

  const { lowerLimit, upperLimit } = computeLimits(contentHeight);

  useEffect(() => {
    if (contentHeight !== undefined) {
      const adjustedHeight = contentHeight + 40;
      setHeight((prevHeight) => (prevHeight < adjustedHeight ? prevHeight : adjustedHeight));
    }
  }, [contentHeight]);

  useEffect(() => {
    const resize = (e: MouseEvent) => {
      if (!isResizing) return;
      setHeight((prevHeight) => Math.min(upperLimit, Math.max(lowerLimit, prevHeight + e.movementY)));
    };

    const stopResizing = () => setIsResizing(false);

    if (isResizing) {
      window.addEventListener("mousemove", resize);
      window.addEventListener("mouseup", stopResizing);
    }

    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [isResizing, lowerLimit, upperLimit]);

  return (
    <div
      className="verical-adjustable relative w-full rounded-lg border shadow-md overflow-hidden"
      style={{ height }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <div
        className={`absolute bottom-1 right-1 p-1 -rotate-90 cursor-ns-resize transition-all 
          ${isResizing || isHovered ? "text-slate-400" : "opacity-0"}
          ${isResizing ? "bg-slate-400/50 rounded-full" : ""}
          hover:bg-slate-400/50 hover:rounded-full
        `}
        onMouseDown={() => setIsResizing(true)}
      >
        <Axis3d size={20} />
      </div>
    </div>
  );
};

// src/components/ui/AuroraBackground.jsx
import React from 'react';
import { cn } from "@/lib/utils"; // Ensure `cn` is correctly imported

const AuroraBackground = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        "relative h-screen w-full flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 text-slate-950 transition-bg",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(`
            [background-image:repeating-linear-gradient(100deg, var(--blue-500)_10%, var(--indigo-300)_15%, var(--blue-300)_20%, var(--violet-200)_25%, var(--blue-400)_30%)]
            [background-size:300%]
            [background-position:50%_50%]
            filter blur-[10px] opacity-50
            pointer-events-none absolute inset-0 will-change-transform
            animate-[aurora_60s_linear_infinite]
          `)}
        ></div>
      </div>
      {children}
    </div>
  );
};

export default AuroraBackground; // Ensure AuroraBackground has a default export

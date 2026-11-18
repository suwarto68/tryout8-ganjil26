import React from 'react';

interface MathTextProps {
  text: string;
  className?: string;
}

/**
 * Merender ekspresi pangkat (baik tag <sup>...</sup> maupun notasi ^(...) / ^angka)
 * menjadi pangkat superskrip asli tanpa menampilkan simbol caret (^).
 */
export const MathText: React.FC<MathTextProps> = ({ text, className }) => {
  const tokenRegex = /(<sup>.*?<\/sup>|\^\([^)]+\)|\^[a-zA-Z0-9\-+/]+)/g;
  const parts = text.split(tokenRegex);

  return (
    <span className={className}>
      {parts.map((part, idx) => {
        if (!part) return null;

        if (part.startsWith('<sup>') && part.endsWith('</sup>')) {
          const inner = part.slice(5, -6);
          return (
            <sup
              key={idx}
              className="text-[0.72em] font-semibold leading-none align-super ml-[0.5px]"
            >
              {inner}
            </sup>
          );
        }

        if (part.startsWith('^(') && part.endsWith(')')) {
          const inner = part.slice(2, -1);
          return (
            <sup
              key={idx}
              className="text-[0.72em] font-semibold leading-none align-super ml-[0.5px]"
            >
              {inner}
            </sup>
          );
        }

        if (part.startsWith('^')) {
          const inner = part.slice(1);
          return (
            <sup
              key={idx}
              className="text-[0.72em] font-semibold leading-none align-super ml-[0.5px]"
            >
              {inner}
            </sup>
          );
        }

        return <React.Fragment key={idx}>{part}</React.Fragment>;
      })}
    </span>
  );
};

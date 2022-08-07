import { useRef, useState, useEffect } from "react";

const flagsPerRowBreakpoints = {
  xs: 2,
  sm: 4,
  md: 6,
  default: 8,
};

const GOLDEN_RATIO = 1.618;

const getFlagWidth = (containerWidth, flagsPerRow) => {
  const calculateWidth = (flagCount) =>
    Math.floor((containerWidth - (flagCount - 1) * 4) / flagCount);

  if (flagsPerRow) {
    return calculateWidth(flagsPerRow);
  }
  if (containerWidth < 400) {
    return calculateWidth(flagsPerRowBreakpoints["xs"]);
  }
  if (containerWidth < 600) {
    return calculateWidth(flagsPerRowBreakpoints["sm"]);
  }
  if (containerWidth < 900) {
    return calculateWidth(flagsPerRowBreakpoints["md"]);
  }
  return calculateWidth(flagsPerRowBreakpoints["default"]);
};

export const useFlagDimensions = (flagsPerRow) => {
  const ref = useRef();
  const [width, changeWidth] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const resizeObserver = new ResizeObserver((entries) => {
      if (!Array.isArray(entries)) return;
      if (!entries.length) return;

      const entry = entries[0];

      const flagWidth = getFlagWidth(entry.contentRect.width, flagsPerRow);

      if (width !== flagWidth) changeWidth(flagWidth);
    });

    resizeObserver.observe(element);

    return () => resizeObserver.unobserve(element);
  }, []);

  const newDimensions = {
    width,
    height: width / GOLDEN_RATIO,
  };

  return [ref, newDimensions];
};

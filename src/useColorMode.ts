import { useEffect, useState } from "react";

export type ColorMode = "light" | "dark";

/** Must match the inline script in index.html. */
export const COLOR_MODE_KEY = "reading-list:color-mode";
const DARK_QUERY = "(prefers-color-scheme: dark)";

function getSystemMode(): ColorMode {
  return window.matchMedia?.(DARK_QUERY).matches ? "dark" : "light";
}

function getStoredMode(): ColorMode | null {
  try {
    const value = localStorage.getItem(COLOR_MODE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

/**
 * Follows the system setting until the reader picks a mode with the toggle.
 * The mode is applied with Bootstrap's `data-bs-theme` on `<html>`.
 */
export function useColorMode() {
  const [stored, setStored] = useState<ColorMode | null>(getStoredMode);
  const [system, setSystem] = useState<ColorMode>(getSystemMode);
  const mode = stored ?? system;

  useEffect(() => {
    const media = window.matchMedia?.(DARK_QUERY);
    if (!media) return;
    const onChange = (event: MediaQueryListEvent) =>
      setSystem(event.matches ? "dark" : "light");
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", mode);
  }, [mode]);

  function toggle() {
    const next: ColorMode = mode === "dark" ? "light" : "dark";
    // Picking the system mode again means "follow the system" again.
    const override = next === system ? null : next;
    setStored(override);
    try {
      if (override) localStorage.setItem(COLOR_MODE_KEY, override);
      else localStorage.removeItem(COLOR_MODE_KEY);
    } catch {
      // Storage blocked: the mode still works until the page reloads.
    }
  }

  return { mode, toggle };
}

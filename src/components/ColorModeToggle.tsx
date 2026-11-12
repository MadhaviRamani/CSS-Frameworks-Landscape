import Button from "react-bootstrap/Button";

import type { ColorMode } from "../useColorMode";

type ColorModeToggleProps = {
  mode: ColorMode;
  onToggle: () => void;
};

export function ColorModeToggle({ mode, onToggle }: ColorModeToggleProps) {
  const isDark = mode === "dark";
  return (
    <Button
      variant="outline-secondary"
      onClick={onToggle}
      aria-pressed={isDark}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span aria-hidden="true">{isDark ? "☾" : "☀"}</span>
      <span className="visually-hidden">Dark mode</span>
    </Button>
  );
}

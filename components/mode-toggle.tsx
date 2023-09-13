"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Switch } from "./ui/switch";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const onSliderToggle = () => {
    if (theme === "dark") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("dark");
    }
  };

  return (
    <div className="flex items-center justify-between gap-2">
      <label htmlFor="dark-mode" className="text-sm font-semibold">
        Toggle Dark Mode:
      </label>
      <Switch
        id="dark-mode"
        checked={theme === "dark"}
        onCheckedChange={onSliderToggle}
      />
    </div>
  );
}

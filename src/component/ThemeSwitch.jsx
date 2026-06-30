"use client";

import { Switch } from "@heroui/react";
import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa6";

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  return (
<Switch onClick={() => setTheme(theme === "dark" ? "light" : "dark")}  size="lg">
          {({isSelected}) => (
            <Switch.Content>
              <Switch.Control className={isSelected ? 'bg-amber-400' : 'bg-gray-400'}>
                <Switch.Thumb>
                  <Switch.Icon>
                    {isSelected ? (
                      <FaSun className="size-3 text-amber-400 opacity-100" />
                    ) : (
                      <FaMoon className="size-3 text-gray-400 opacity-70" />
                    )}
                  </Switch.Icon>
                </Switch.Thumb>
              </Switch.Control>
            </Switch.Content>
          )}
        </Switch>
     
    
  );
}
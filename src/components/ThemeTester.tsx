import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Theme {
  name: string;
  buttons: { list: string; active: string };
  background: { main: string };
}

// All 23 themes from p-stream
const themes: Theme[] = [
  // Primary colors
  { name: "Blue", buttons: { list: "0 0% 60%", active: "210 100% 50%" }, background: { main: "0 0% 8%" } },
  { name: "Red", buttons: { list: "0 0% 60%", active: "0 70% 50%" }, background: { main: "0 0% 8%" } },
  { name: "Green", buttons: { list: "0 0% 60%", active: "150 40% 50%" }, background: { main: "0 0% 8%" } },
  { name: "Orange", buttons: { list: "0 0% 60%", active: "30 100% 50%" }, background: { main: "0 0% 8%" } },
  { name: "Purple", buttons: { list: "0 0% 60%", active: "270 40% 50%" }, background: { main: "0 0% 8%" } },
  { name: "Pink", buttons: { list: "0 0% 60%", active: "330 60% 50%" }, background: { main: "0 0% 8%" } },
  { name: "Cyan", buttons: { list: "0 0% 60%", active: "180 100% 45%" }, background: { main: "0 0% 8%" } },
  { name: "Gold", buttons: { list: "0 0% 60%", active: "45 80% 50%" }, background: { main: "0 0% 8%" } },
  
  // Metallic themes
  { name: "Silver", buttons: { list: "0 0% 60%", active: "210 10% 75%" }, background: { main: "0 0% 8%" } },
  { name: "Iron", buttons: { list: "0 0% 60%", active: "210 5% 50%" }, background: { main: "0 0% 8%" } },
  { name: "Bronze", buttons: { list: "0 0% 60%", active: "30 50% 50%" }, background: { main: "0 0% 8%" } },
  { name: "Copper", buttons: { list: "0 0% 60%", active: "20 70% 50%" }, background: { main: "0 0% 8%" } },
  { name: "Platinum", buttons: { list: "0 0% 60%", active: "240 10% 75%" }, background: { main: "0 0% 8%" } },
  { name: "Titanium", buttons: { list: "0 0% 60%", active: "210 5% 75%" }, background: { main: "0 0% 8%" } },
  { name: "Zinc", buttons: { list: "0 0% 60%", active: "200 20% 75%" }, background: { main: "0 0% 8%" } },
  { name: "Lead", buttons: { list: "0 0% 60%", active: "220 10% 50%" }, background: { main: "0 0% 8%" } },
  { name: "Sulfur", buttons: { list: "0 0% 60%", active: "40 80% 50%" }, background: { main: "0 0% 8%" } },
  
  // Neutral themes
  { name: "Noir", buttons: { list: "0 0% 60%", active: "0 0% 95%" }, background: { main: "0 0% 5%" } },
  { name: "Grey", buttons: { list: "0 0% 60%", active: "220 10% 65%" }, background: { main: "0 0% 8%" } },
  { name: "Dark", buttons: { list: "0 0% 60%", active: "220 10% 50%" }, background: { main: "0 0% 5%" } },
  { name: "Light", buttons: { list: "0 0% 40%", active: "270 40% 50%" }, background: { main: "0 0% 95%" } },
  
  // Special themes
  { name: "Christmas", buttons: { list: "0 0% 60%", active: "0 70% 50%" }, background: { main: "150 40% 8%" } },
  { name: "Spiderman", buttons: { list: "0 0% 60%", active: "0 70% 50%" }, background: { main: "210 100% 8%" } },
];

const ThemeTester = () => {
  const [selectedTheme, setSelectedTheme] = useState("Blue");

  const applyTheme = () => {
    const theme = themes.find((t) => t.name === selectedTheme);
    if (!theme) return;

    const root = document.documentElement;
    root.style.setProperty("--colors-buttons-list", theme.buttons.list);
    root.style.setProperty("--colors-buttons-active", theme.buttons.active);
    root.style.setProperty("--colors-background-main", theme.background.main);
    
    // Force re-render by dispatching a custom event
    window.dispatchEvent(new Event("theme-change"));
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-foreground">Themes Tester:</span>
      <Select value={selectedTheme} onValueChange={setSelectedTheme}>
        <SelectTrigger className="w-36">
          <SelectValue placeholder="Select theme" />
        </SelectTrigger>
        <SelectContent className="bg-popover max-h-60">
          {themes.map((theme) => (
            <SelectItem key={theme.name} value={theme.name}>
              {theme.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button onClick={applyTheme} size="sm">
        Apply
      </Button>
    </div>
  );
};

export default ThemeTester;

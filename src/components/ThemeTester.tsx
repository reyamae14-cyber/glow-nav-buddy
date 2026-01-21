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

const themes: Theme[] = [
  {
    name: "Orange (Default)",
    buttons: { list: "0 0% 60%", active: "25 95% 53%" },
    background: { main: "0 0% 8%" },
  },
  {
    name: "Blue",
    buttons: { list: "0 0% 60%", active: "210 100% 50%" },
    background: { main: "220 20% 10%" },
  },
  {
    name: "Green",
    buttons: { list: "0 0% 60%", active: "142 76% 45%" },
    background: { main: "150 20% 8%" },
  },
  {
    name: "Purple",
    buttons: { list: "0 0% 60%", active: "270 80% 60%" },
    background: { main: "270 20% 10%" },
  },
  {
    name: "Red",
    buttons: { list: "0 0% 60%", active: "0 85% 55%" },
    background: { main: "0 20% 10%" },
  },
  {
    name: "Pink",
    buttons: { list: "0 0% 60%", active: "330 85% 60%" },
    background: { main: "330 20% 10%" },
  },
];

const ThemeTester = () => {
  const applyTheme = (themeName: string) => {
    const theme = themes.find((t) => t.name === themeName);
    if (!theme) return;

    const root = document.documentElement;
    root.style.setProperty("--colors-buttons-list", theme.buttons.list);
    root.style.setProperty("--colors-buttons-active", theme.buttons.active);
    root.style.setProperty("--colors-background-main", theme.background.main);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Themes Tester:</span>
      <Select onValueChange={applyTheme} defaultValue="Orange (Default)">
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Select theme" />
        </SelectTrigger>
        <SelectContent>
          {themes.map((theme) => (
            <SelectItem key={theme.name} value={theme.name}>
              {theme.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ThemeTester;

import MobileNavBar from "@/components/MobileNavBar";

const Menu = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="container mx-auto px-4 pt-8">
        <h1 className="text-2xl font-bold text-foreground">Menu</h1>
        <p className="mt-2 text-muted-foreground">Explore our menu options</p>
      </div>
      <MobileNavBar />
    </div>
  );
};

export default Menu;

import MobileNavBar from "@/components/MobileNavBar";
import ThemeTester from "@/components/ThemeTester";

const Recent = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="container mx-auto px-4 pt-8">
        <h1 className="text-2xl font-bold text-foreground">Recent</h1>
        <p className="mt-2 text-muted-foreground">Your recent activity</p>
        <div className="mt-6">
          <ThemeTester />
        </div>
      </div>
      <MobileNavBar />
    </div>
  );
};

export default Recent;

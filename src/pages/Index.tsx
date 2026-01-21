import MobileNavBar from "@/components/MobileNavBar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="container mx-auto px-4 pt-8">
        <h1 className="text-2xl font-bold text-foreground">Home</h1>
        <p className="mt-2 text-muted-foreground">Welcome to your app!</p>
        
        <div className="mt-8 grid gap-4">
          <div className="rounded-xl bg-card p-4 shadow-sm">
            <h2 className="font-semibold text-card-foreground">Ready for Integration</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              This navbar is ready to integrate with p-stream. It reads theme colors from CSS variables.
            </p>
          </div>
        </div>
      </div>
      <MobileNavBar />
    </div>
  );
};

export default Index;

import MobileNavBar from "@/components/MobileNavBar";

const Search = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="container mx-auto px-4 pt-8">
        <h1 className="text-2xl font-bold text-foreground">Search</h1>
        <p className="mt-2 text-muted-foreground">Find what you're looking for</p>
      </div>
      <MobileNavBar />
    </div>
  );
};

export default Search;

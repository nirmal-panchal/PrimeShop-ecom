import ProductCard from "./components/product-card";
import { SortField, useProductStore } from "./store";
import { Input } from "./components/ui/input";
import { ArrowUpDown, Search, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { Button } from "./components/ui/button";
import { useEffect } from "react";
import { fetchProducts } from "./api/products";

function App() {
  const {
    filteredProducts,
    searchTerm,
    sortBy,
    sortOrder,
    setSearchTerm,
    setSortBy,
    setSortOrder,
    clearFilters,
    setProducts,
  } = useProductStore();

  useEffect(() => {
    const fetchProductsData = async () => {
      const products = await fetchProducts();
      setProducts(products);
    };

    fetchProductsData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <header className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Discover Our Collection
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto mb-6">
            Explore our carefully curated selection of high-quality products.
          </p>

          <div className="max-w-xl mx-auto flex space-x-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search products..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select
              value={sortBy}
              onValueChange={(value: SortField) => setSortBy(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            >
              <ArrowUpDown className="h-4 w-4" />
            </Button>
            {(searchTerm || sortBy !== "name" || sortOrder !== "asc") && (
              <Button variant="destructive" size="icon" onClick={clearFilters}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </header>

        {filteredProducts.length === 0 ? (
          <div className="text-center text-gray-500">No products found</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

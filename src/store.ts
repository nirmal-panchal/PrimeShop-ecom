import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Product } from "./types";

export type SortField = "name" | "price" | "rating";
export type SortOrder = "asc" | "desc";

interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  searchTerm: string;
  sortBy: SortField;
  sortOrder: SortOrder;
  setProducts: (products: Product[]) => void;
  setSearchTerm: (term: string) => void;
  setSortBy: (field: SortField) => void;
  setSortOrder: (order: SortOrder) => void;
  applyFiltersAndSort: () => void;
  clearFilters: () => void;
}

export const useProductStore = create<ProductState>()(
  devtools(
    persist(
      (set, get) => ({
        products: [],
        filteredProducts: [],
        searchTerm: "",
        sortBy: "name",
        sortOrder: "asc",

        setProducts: (products) => {
          set({ products }, false, "setProducts");
          get().applyFiltersAndSort();
        },

        setSearchTerm: (term) => {
          set({ searchTerm: term }, false, "setSearchTerm");
          get().applyFiltersAndSort();
        },

        setSortBy: (field) => {
          set({ sortBy: field }, false, "setSortBy");
          get().applyFiltersAndSort();
        },

        setSortOrder: (order) => {
          set({ sortOrder: order }, false, "setSortOrder");
          get().applyFiltersAndSort();
        },

        applyFiltersAndSort: () => {
          const { products, searchTerm, sortBy, sortOrder } = get();

          // Filter products
          const filtered = products.filter((product) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
          );

          // Sort products
          filtered.sort((a, b) => {
            let comparison = 0;
            if (sortBy === "name") {
              comparison = a.title.localeCompare(b.title);
            } else if (sortBy === "price") {
              comparison = parseFloat(a.price) - parseFloat(b.price);
            } else if (sortBy === "rating") {
              comparison =
                parseFloat(a.rating.rate.toString()) -
                parseFloat(b.rating.rate.toString());
            }
            return sortOrder === "asc" ? comparison : -comparison;
          });

          set({ filteredProducts: filtered }, false, "applyFiltersAndSort");
        },

        clearFilters: () => {
          set(
            {
              searchTerm: "",
              sortBy: "name",
              sortOrder: "asc",
            },
            false,
            "clearFilters"
          );
          get().applyFiltersAndSort();
        },
      }),
      {
        name: "product-storage",
        partialize: (state) => ({
          products: state.products,
          searchTerm: state.searchTerm,
          sortBy: state.sortBy,
          sortOrder: state.sortOrder,
        }),
      }
    )
  )
);

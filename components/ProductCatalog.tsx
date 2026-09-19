"use client";

import { useMemo, useState } from "react";

import { ProductCard } from "./ProductCard";

const products = [
  {
    name: "ApexRelief Plus",
    category: "Prescription Medicines",
    description: "Targeted pain relief with long-lasting support.",
    price: "$24.00",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "PureVital Multivitamin",
    category: "Vitamins & Supplements",
    description: "Essential vitamins to boost daily wellness.",
    price: "$18.50",
    image:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "FlexGuard Support",
    category: "Medical Devices",
    description: "Comfort support for mobility and recovery.",
    price: "$39.00",
    image:
      "https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "GentleCare Hand Wash",
    category: "Personal Care",
    description: "Skin-friendly hygiene care for everyday use.",
    price: "$12.00",
    image:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "HeartCare Capsules",
    category: "Prescription Medicines",
    description: "Comprehensive support for heart wellness.",
    price: "$29.00",
    image:
      "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Daily Balance Gummies",
    category: "Wellness Products",
    description: "Natural wellness support for daily energy.",
    price: "$22.00",
    image:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "CalmCare Syrup",
    category: "Over-the-Counter",
    description: "Trusted relief for seasonal discomfort.",
    price: "$16.00",
    image:
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "CareSense Monitor",
    category: "Medical Devices",
    description: "Accurate monitoring for at-home health routines.",
    price: "$59.00",
    image:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80",
  },
];

const categories = [
  "All",
  "Prescription Medicines",
  "Over-the-Counter",
  "Vitamins & Supplements",
  "Medical Devices",
  "Personal Care",
  "Wellness Products",
];

export function ProductCatalog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = category === "All" || product.category === category;
      const matchesSearch =
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [category, query]);

  return (
    <div className="catalog-shell">
      <div className="catalog-controls">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search products"
          aria-label="Search products"
        />

        <div className="category-filter" aria-label="Choose product category">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={category === item ? "filter-chip active" : "filter-chip"}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.name}
            name={product.name}
            category={product.category}
            description={product.description}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="empty-state">No products match your search.</div>
      ) : null}
    </div>
  );
}

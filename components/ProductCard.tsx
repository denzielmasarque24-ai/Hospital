import Link from "next/link";

type ProductCardProps = {
  name: string;
  category: string;
  description: string;
  price: string;
  image: string;
  href?: string;
};

export function ProductCard({
  name,
  category,
  description,
  price,
  image,
  href = "/products",
}: ProductCardProps) {
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img src={image} alt={name} className="product-image" />
      </div>
      <div className="product-content">
        <span className="product-tag">{category}</span>
        <h3>{name}</h3>
        <p>{description}</p>
        <div className="product-meta">
          <strong>{price}</strong>
          <Link href={href} className="text-link">
            View Product
          </Link>
        </div>
      </div>
    </article>
  );
}

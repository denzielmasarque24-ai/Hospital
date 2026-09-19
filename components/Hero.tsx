import Link from "next/link";

export type HeroFloatingCard = {
  title: string;
  description: string;
};

type HeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  image: string;
  imageAlt: string;
  floatingCards?: HeroFloatingCard[];
  trustValue?: string;
  trustLabel?: string;
};

export function Hero({
  eyebrow,
  title,
  description,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  image,
  imageAlt,
  floatingCards = [],
  trustValue = "100K+",
  trustLabel = "Patients Trust Us",
}: HeroProps) {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-content">
          <span className="eyebrow">{eyebrow}</span>
          <h1 dangerouslySetInnerHTML={{ __html: title }} />
          <p>{description}</p>

          <div className="hero-buttons">
            <Link href={primaryCtaHref} className="btn-primary">
              {primaryCtaLabel} <span>→</span>
            </Link>
            {secondaryCtaLabel && secondaryCtaHref ? (
              <Link href={secondaryCtaHref} className="btn-outline">
                {secondaryCtaLabel}
              </Link>
            ) : null}
          </div>

          <div className="patients">
            <div className="avatars" aria-label="Patient satisfaction">
              <span className="avatar">👩🏻</span>
              <span className="avatar">👨🏻</span>
              <span className="avatar">👩🏼</span>
              <span className="avatar">👨🏽</span>
            </div>
            <div>
              <strong>{trustValue}</strong>
              <span>{trustLabel}</span>
            </div>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <div className="hero-circle" />
          <img className="hero-image" src={image} alt={imageAlt} />

          {floatingCards.map((card, index) => (
            <div key={`${card.title}-${index}`} className={`floating-card card-${index + 1}`}>
              <div className="floating-icon">{index === 0 ? "✚" : index === 1 ? "✓" : "★"}</div>
              <div>
                <strong>{card.title}</strong>
                <span>{card.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

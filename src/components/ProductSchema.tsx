export default function ProductSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Vacation Rental Furniture Packages",
    "brand": {
      "@type": "Brand",
      "name": "Furniture Packages USA"
    },
    "areaServed": ["Kissimmee", "Orlando", "Central Florida", "Davenport", "Champions Gate", "Windsor at Westside"],
    "description": "Turn-key and per-room furniture packages for vacation rentals, including themed kids rooms. Professional design, delivery, installation, and photography services.",
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "lowPrice": "5000",
      "highPrice": "60000",
      "offerCount": "3",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "50",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}



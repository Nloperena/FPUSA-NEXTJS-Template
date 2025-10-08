import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { GradientModeProvider } from "@/contexts/GradientModeContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({ 
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Furniture Packages USA | Vacation Rental Furnishing Experts in Florida",
  description: "Furniture Packages USA has furnished over 1,000 Florida vacation homes since 2001. We offer turnkey furniture packages, property refreshes, and theme designs with fast installation and financing available.",
  keywords: ["vacation rental furniture", "STR furnishing", "Florida rental design", "turnkey furniture", "themed rooms", "furniture packages", "vacation rental furnishing"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/bij2evz.css" />
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="preconnect" href="https://www.google.com" />
        <link rel="preconnect" href="https://i.ytimg.com" crossOrigin="anonymous" />
        <link rel="prefetch" href="https://i.ytimg.com/vi/1_tueZ5zC3w/maxresdefault.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Furniture Packages USA",
              "url": "https://furniturepackagesusa.com",
              "logo": "https://furniturepackagesusa.com/logo.png",
              "telephone": "+1-407-348-8848",
              "email": "info@furniturepackagesusa.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Orlando",
                "addressRegion": "FL",
                "addressCountry": "US"
              },
              "areaServed": [
                {
                  "@type": "City",
                  "name": "Kissimmee"
                },
                {
                  "@type": "City", 
                  "name": "Davenport"
                },
                {
                  "@type": "City",
                  "name": "Orlando"
                }
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Vacation Rental Furnishing Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Turn-Key Packages"
                    }
                  },
                  {
                    "@type": "Offer", 
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Property Refresh"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service", 
                      "name": "Custom Theme Rooms"
                    }
                  }
                ]
              },
              "sameAs": [
                "https://www.google.com/maps/place/Furniture+Packages+USA",
                "https://www.bbb.org/us/fl/orlando/profile/furniture-dealers/furniture-packages-usa-llc-0633-1000000000"
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "VideoObject",
              "name": "Outfitting Your Vacation Rental — Before/After",
              "description": "Turn-key furnishing & staging for short-term rentals.",
              "thumbnailUrl": ["https://i.ytimg.com/vi/1_tueZ5zC3w/hqdefault.jpg"],
              "uploadDate": "2024-01-01",
              "embedUrl": "https://www.youtube.com/embed/1_tueZ5zC3w"
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-poppins antialiased`}>
        <GradientModeProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main>{children}</main>
            <Footer />
          </ThemeProvider>
        </GradientModeProvider>
      </body>
    </html>
  );
}


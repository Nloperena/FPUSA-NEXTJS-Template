// Forza Brand Standards
// Based on the official brand kit for adhesives, tapes, and sealant solutions

export const brandColors = {
  primary: {
    regalBlue: {
      hex: '#115B87',
      rgb: '17, 91, 135',
      hsl: '207, 78%, 30%'
    },
    blazeOrange: {
      hex: '#F16022',
      rgb: '241, 96, 34',
      hsl: '16, 88%, 54%'
    }
  },
  secondary: {
    rustyNail: {
      hex: '#D35127',
      rgb: '211, 81, 39',
      hsl: '12, 69%, 49%'
    },
    blueVelvet: {
      hex: '#115B87',
      rgb: '17, 91, 135',
      hsl: '207, 78%, 30%'
    },
    slateGrey: {
      hex: '#BFBFBF',
      rgb: '191, 191, 191',
      hsl: '0, 0%, 75%'
    },
    ironGrey: {
      hex: '#F16022',
      rgb: '241, 96, 34',
      hsl: '16, 88%, 54%'
    },
    jetBlack: {
      hex: '#000000',
      rgb: '0, 0, 0',
      hsl: '0, 0%, 0%'
    }
  }
};

export const typography = {
  // Headings - Kallisto Heavy
  headings: {
    fontFamily: 'Kallisto, sans-serif',
    fontWeight: '900', // Heavy
    lineHeight: '1.1'
  },
  
  // Body Text - Poppins Regular
  body: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '400', // Regular
    lineHeight: '1.6'
  },
  
  // Subheads - Poppins Bold
  subheads: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '700', // Bold
    lineHeight: '1.3'
  },
  
  // Product Names - Kallisto Heavy
  products: {
    fontFamily: 'Kallisto, sans-serif',
    fontWeight: '900', // Heavy
    lineHeight: '1.1'
  }
};

// Industry-specific color mappings
export const industryColors = {
  industrial: {
    primary: '#f16a26',
    secondary: '#f16a26',
    accent: brandColors.primary.blazeOrange.hex
  },
  marine: {
    primary: '#137875',
    secondary: '#137875',
    accent: brandColors.primary.blazeOrange.hex
  },
  transportation: {
    primary: '#b83d35',
    secondary: '#b83d35',
    accent: brandColors.primary.blazeOrange.hex
  },
  insulation: {
    primary: '#d0157d',
    secondary: '#d0157d',
    accent: brandColors.primary.blazeOrange.hex
  },
  construction: {
    primary: '#fec770',
    secondary: '#fec770',
    accent: brandColors.primary.blazeOrange.hex
  },
  composites: {
    primary: '#c7c8c9',
    secondary: '#c7c8c9',
    accent: brandColors.primary.blazeOrange.hex
  }
};

// Product-specific colors
export const productColors = {
  bond: {
    primary: brandColors.primary.blazeOrange.hex,
    secondary: brandColors.primary.regalBlue.hex
  },
  seal: {
    primary: '#ffd600',
    secondary: brandColors.primary.regalBlue.hex
  },
  tape: {
    primary: '#e53935',
    secondary: brandColors.primary.regalBlue.hex
  },
  clean: {
    primary: brandColors.primary.regalBlue.hex,
    secondary: brandColors.secondary.slateGrey.hex
  },
  coat: {
    primary: brandColors.secondary.blueVelvet.hex,
    secondary: brandColors.primary.blazeOrange.hex
  }
};

// Utility functions
export const getIndustryColors = (industry: string) => {
  const industryLower = industry.toLowerCase();
  return industryColors[industryLower as keyof typeof industryColors] || industryColors.industrial;
};

export const getProductColors = (product: string) => {
  return productColors[product as keyof typeof productColors] || productColors.bond;
};

// Dynamic gradient function for industry backgrounds
export const getIndustryGradient = (industry: string) => {
  const industryColor = getIndustryColors(industry);
  const mainBlue = brandColors.secondary.blueVelvet.hex;
  return `${mainBlue} 0%, ${mainBlue} 70%, ${industryColor.primary} 100%`;
};





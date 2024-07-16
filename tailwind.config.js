/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          10: "#D3EEF9",
          20: "#B6E3F5",
          30: "#91D4F0",
          40: "#6CC6EB",
          50: "#48B8E6",
          60: "#23AAE1",
          70: "#1D8EBB",
          80: "#177196",
          90: "#115570",
          100: "#0C394B",
          110: "#07222D",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          10: "#FDE6D2",
          20: "#FBD5B5",
          30: "#F9BF8F",
          40: "#F7AA6A",
          50: "#F59545",
          60: "#DD6B20",
          70: "#CA6B1B",
          80: "#A25515",
          90: "#7A4010",
          100: "#512B0B",
          110: "#311A06",
        },

        gray: {
          10: "#D6D6D6",
          20: "#BBBBBB",
          30: "#EAEEF5",
          40: "#777777",
          50: "#555555",
          60: "#333333",
          70: "#2A2A2A",
          80: "#222222",
          90: "#1A1A1A",
          100: "#0A0A0A",
        },

        yellow: {
          10: "#FFF8E6",
          20: "#FEEFC3",
          30: "#FCD974",
          40: "#FAC734",
          50: "#ECB52B",
          60: "#D6A12E",
          70: "#B7831F",
          80: "#8E6115",
          90: "#70490F",
          100: "#51350B",
        },

        green: {
          10: "#F2FCF2",
          20: "#BDF5C1",
          30: "#8FEF99",
          40: "#65E673",
          50: "#2BCD3E",
          60: "#25AF36",
          70: "#1F932D",
          80: "#197624",
          90: "#145D1D",
          100: "#104C18",
        },

        transparency: {
          dark25: "rgba(6, 19, 31, 0.25)",
          dark50: "rgba(6, 19, 31, 0.50)",
          dark75: "rgba(6, 19, 31, 0.75)",
          light25: "rgba(255, 255, 255, 0.25)",
          light50: "rgba(255, 255, 255, 0.50)",
          light75: "rgba(255, 255, 255, 0.75)",
        },

        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },

        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },

        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },

        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },

        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      gridTemplateColumns: {
        24: "repeat(24, minmax(0,1fr))",
      },
      gridColumn: {
        "span-13": "span 13 / span 13",
        "span-14": "span 14 / span 14",
        "span-15": "span 15 / span 15",
        "span-16": "span 16 / span 16",
        "span-17": "span 17 / span 17",
        "span-19": "span 19 / span 19",
        "span-20": "span 20 / span 20",
        "span-21": "span 21 / span 21",
        "span-22": "span 22 / span 22",
        "span-23": "span 23 / span 23",
        "span-24": "span 24 / span 24",
      },

      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },

      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },

      boxShadow: {
        form: "0px 4px 8px 0px rgba(233, 233, 233, 0.99)",
        card: "0px 4px 8px 0px rgba(233, 233, 233, 0.99)",
      },

      fontSize: {
        xs: ["14px", { lineHeight: "24px", letterSpacing: "-0.03em" }],
      },

      fontFamily: {
        raleway: "var(--font-raleway)",
        sfpro: "var(--font-sfpro)",
        CenturyGothic: "var(--font-century-gothic)",
        DMSans: "var(--font-DMSans)",
        Poppins: "var(--font-Poppins)",
        PlusJakartaSans: "var(--font-Plus_Jakarta_Sans)",
      },

      backgroundImage: {
        "gradient-yellow": "background: rgba(253, 229, 209, 0.27)",
        "gradient-blue":
          "linear-gradient(126deg, rgba(191, 239, 255, 0.20) 0%, rgba(205, 242, 255, 0.38) 19.27%, #FFF 84.90%, #2682A1 100%)",
        "gradient-body":
          "linear-gradient(126deg, #FFF 0%, #FFF 94.74%, rgba(248, 126, 25, 0.00) 100%)",
      },
      borderWidth: {
        DEFAULT: "1px",
        0: "0",
        2: "2px",
        3: "3px",
        4: "4px",
        6: "6px",
        8: "8px",
      },
      minHeight: {
        ...defaultTheme.height,
      },
      minWidth: {
        ...defaultTheme.width,
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
  future: {
    hoverOnlyWhenSupported: true,
  },
};

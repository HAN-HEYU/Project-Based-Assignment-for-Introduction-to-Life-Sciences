type IconName =
  | "dna"
  | "microscope"
  | "testTube"
  | "leaf"
  | "corn"
  | "cell"
  | "virus"
  | "scissors"
  | "alert"
  | "hospital"
  | "sensor"
  | "map"
  | "check"
  | "scale"
  | "spark";

interface ScienceIconProps {
  name: string;
  className?: string;
  title?: string;
}

export function ScienceIcon({ name, className = "", title }: ScienceIconProps) {
  const common = {
    className: `science-icon ${className}`.trim(),
    viewBox: "0 0 64 64",
    role: title ? "img" : "presentation",
    "aria-label": title,
  };

  switch (name as IconName) {
    case "dna":
      return (
        <svg {...common}>
          <path d="M20 8c20 10 28 18 24 28-3 8-14 11-24 20" />
          <path d="M44 8C24 18 16 26 20 36c3 8 14 11 24 20" />
          <path d="M24 16h16M21 27h22M21 38h22M24 49h16" />
        </svg>
      );
    case "microscope":
      return (
        <svg {...common}>
          <path d="M24 10l12 7-5 9-12-7zM31 25l9 5M40 30c-2 9-9 16-20 17M17 52h33M25 47h16M18 33l8-14" />
          <circle cx="19" cy="34" r="5" />
        </svg>
      );
    case "testTube":
      return (
        <svg {...common}>
          <path d="M24 8h22M30 8v35a11 11 0 1 0 10 0V8" />
          <path d="M28 39h14M29 46c4 3 8 3 12 0" />
        </svg>
      );
    case "leaf":
      return (
        <svg {...common}>
          <path d="M52 12C27 12 12 24 12 48c22 2 37-11 40-36z" />
          <path d="M16 45c10-12 18-18 32-28" />
        </svg>
      );
    case "corn":
      return (
        <svg {...common}>
          <path d="M32 8c10 9 12 28 0 44C20 36 22 17 32 8z" />
          <path d="M24 25h16M24 34h16M27 18c4 3 6 3 10 0M27 43c4 3 6 3 10 0" />
          <path d="M18 40c6 2 10 8 14 14M46 40c-6 2-10 8-14 14" />
        </svg>
      );
    case "cell":
      return (
        <svg {...common}>
          <path d="M32 10c13 0 23 8 23 20S45 54 31 54 9 45 9 32 19 10 32 10z" />
          <circle cx="34" cy="33" r="9" />
          <circle cx="23" cy="25" r="3" />
          <circle cx="45" cy="42" r="2" />
        </svg>
      );
    case "virus":
      return (
        <svg {...common}>
          <circle cx="32" cy="32" r="12" />
          <path d="M32 8v12M32 44v12M8 32h12M44 32h12M15 15l9 9M40 40l9 9M49 15l-9 9M24 40l-9 9" />
          <circle cx="28" cy="30" r="2" />
          <circle cx="37" cy="35" r="2" />
        </svg>
      );
    case "scissors":
      return (
        <svg {...common}>
          <circle cx="18" cy="18" r="7" />
          <circle cx="18" cy="46" r="7" />
          <path d="M24 23l28 25M24 41l28-25M31 32h8" />
        </svg>
      );
    case "alert":
      return (
        <svg {...common}>
          <path d="M32 9l25 45H7z" />
          <path d="M32 24v15M32 46v2" />
        </svg>
      );
    case "hospital":
      return (
        <svg {...common}>
          <path d="M14 54V18h36v36M24 54V40h16v14M27 26h10M32 21v20" />
          <path d="M20 18V10h24v8" />
        </svg>
      );
    case "sensor":
      return (
        <svg {...common}>
          <path d="M18 48V28M32 48V18M46 48V34" />
          <circle cx="18" cy="24" r="5" />
          <circle cx="32" cy="14" r="5" />
          <circle cx="46" cy="30" r="5" />
          <path d="M12 52h40" />
        </svg>
      );
    case "map":
      return (
        <svg {...common}>
          <path d="M10 18l14-6 16 6 14-6v34l-14 6-16-6-14 6zM24 12v34M40 18v34" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <circle cx="32" cy="32" r="23" />
          <path d="M20 33l8 8 17-20" />
        </svg>
      );
    case "scale":
      return (
        <svg {...common}>
          <path d="M32 10v42M20 52h24M18 20h28M18 20l-8 14h16zM46 20l-8 14h16z" />
          <path d="M10 34c2 5 14 5 16 0M38 34c2 5 14 5 16 0" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M32 8l6 17 18 1-14 11 5 18-15-10-15 10 5-18L8 26l18-1z" />
        </svg>
      );
  }
}

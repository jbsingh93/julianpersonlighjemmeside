import Image from "next/image";

interface AvatarProps {
  name: string;
  imagePath?: string;
  size?: "sm" | "md" | "lg";
}

// Generer konsistent farve baseret på navn
function getColorFromName(name: string): string {
  const colors = [
    "bg-blue-600",
    "bg-purple-600",
    "bg-pink-600",
    "bg-red-600",
    "bg-orange-600",
    "bg-yellow-600",
    "bg-green-600",
    "bg-teal-600",
    "bg-cyan-600",
    "bg-indigo-600",
  ];

  // Simple hash function
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  return colors[Math.abs(hash) % colors.length];
}

// Hent initialer fra navn
function getInitials(name: string): string {
  const parts = name
    .split(" ")
    .filter((part) => part.length > 0);

  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }

  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function Avatar({ name, imagePath, size = "md" }: AvatarProps) {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
  };

  const colorClass = getColorFromName(name);
  const initials = getInitials(name);

  if (imagePath) {
    return (
      <div
        className={`${sizeClasses[size]} rounded-full overflow-hidden border-2 border-zinc-700 relative flex-shrink-0`}
      >
        <Image
          src={imagePath}
          alt={`${name} profil billede`}
          fill
          className="object-cover"
          sizes={
            size === "sm" ? "32px" : size === "md" ? "40px" : "48px"
          }
        />
      </div>
    );
  }

  return (
    <div
      className={`${sizeClasses[size]} ${colorClass} rounded-full flex items-center justify-center font-bold text-white flex-shrink-0`}
    >
      {initials}
    </div>
  );
}

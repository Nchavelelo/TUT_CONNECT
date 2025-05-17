
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatNotificationDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return "Today";
  } else if (diffDays === 1) {
    return "Yesterday";
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else {
    return date.toLocaleDateString();
  }
};

export const getCategoryColor = (category: string) => {
  switch (category) {
    case "general":
      return "border-blue-200 bg-blue-50 text-blue-600";
    case "booking":
      return "border-green-200 bg-green-50 text-green-600";
    case "maintenance":
      return "border-orange-200 bg-orange-50 text-orange-600";
    case "academic":
      return "border-purple-200 bg-purple-50 text-purple-600";
    case "urgent":
      return "border-red-200 bg-red-50 text-red-600";
    default:
      return "border-gray-200 bg-gray-50 text-gray-600";
  }
};


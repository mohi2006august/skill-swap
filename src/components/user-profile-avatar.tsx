
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type UserProfileAvatarProps = {
  src?: string;
  name: string;
  className?: string;
};

export function UserProfileAvatar({ src, name, className }: UserProfileAvatarProps) {
  const fallback = name
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <Avatar className={cn("h-10 w-10", className)}>
      <AvatarImage src={src} alt={name} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}

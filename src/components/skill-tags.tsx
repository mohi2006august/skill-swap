
import { Badge, BadgeProps } from '@/components/ui/badge';

type SkillTagsProps = {
  skills: string[];
  limit?: number;
  variant?: BadgeProps['variant'];
  className?: string;
};

export function SkillTags({ skills, limit, variant = "default", className }: SkillTagsProps) {
  const displayedSkills = limit ? skills.slice(0, limit) : skills;
  const remainingCount = limit ? skills.length - limit : 0;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {displayedSkills.map(skill => (
        <Badge key={skill} variant={variant} className="font-normal">
          {skill}
        </Badge>
      ))}
      {remainingCount > 0 && (
        <Badge variant="outline" className="font-normal">
          +{remainingCount} more
        </Badge>
      )}
    </div>
  );
}

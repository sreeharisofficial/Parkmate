
import { cn } from "@/lib/utils";
import { 
  ArrowDownRight, 
  ArrowUpRight, 
  LucideIcon 
} from "lucide-react";
import { ReactNode } from "react";

type StatCardProps = {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  children?: ReactNode;
};

export default function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  className,
  children
}: StatCardProps) {
  return (
    <div 
      className={cn(
        "rounded-lg bg-white p-5 shadow-sm",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="mt-1 text-2xl font-semibold">{value}</h3>
          
          {trend && (
            <div 
              className={
                trend.isPositive ? "stat-trend-up" : "stat-trend-down"
              }
            >
              <span className="text-xs font-medium">
                {trend.isPositive ? "+" : ""}{trend.value}%
              </span>
              {trend.isPositive ? (
                <ArrowUpRight size={14} />
              ) : (
                <ArrowDownRight size={14} />
              )}
            </div>
          )}
        </div>
        
        <div className="rounded-full bg-primary/10 p-2 text-primary">
          <Icon size={20} />
        </div>
      </div>
      
      {children && (
        <div className="mt-4">
          {children}
        </div>
      )}
    </div>
  );
}

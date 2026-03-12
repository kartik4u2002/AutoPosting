import React from 'react';
import { Card, CardContent } from './ui/Card';
import { cn } from './ui/Button';

export function AnalyticsCard({ title, value, change, trend, icon: Icon, color = "primary" }) {
  
  const colors = {
    primary: "text-primary-600 bg-primary-50",
    green: "text-emerald-600 bg-emerald-50",
    blue: "text-blue-600 bg-blue-50",
    yellow: "text-amber-600 bg-amber-50"
  };

  const isPositive = trend === 'up';

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
          </div>
          {Icon && (
            <div className={cn("p-3 rounded-lg", colors[color])}>
              <Icon className="w-5 h-5" />
            </div>
          )}
        </div>
        
        {change && (
          <div className="mt-4 flex items-center text-sm">
            <span className={cn(
              "font-medium",
              isPositive ? "text-emerald-600" : "text-red-600"
            )}>
              {isPositive ? '+' : '-'}{Math.abs(change)}%
            </span>
            <span className="text-gray-500 ml-2">vs last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

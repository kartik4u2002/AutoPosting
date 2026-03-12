import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function StatusBadge({ status, className }) {
  const statusConfig = {
    Draft: "bg-gray-100 text-gray-800",
    Scheduled: "bg-blue-100 text-blue-800",
    Posting: "bg-yellow-100 text-yellow-800",
    Posted: "bg-green-100 text-green-800",
    Failed: "bg-red-100 text-red-800",
  };

  const currentStatus = statusConfig[status] || statusConfig.Draft;

  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", currentStatus, className)}>
      {status}
    </span>
  );
}

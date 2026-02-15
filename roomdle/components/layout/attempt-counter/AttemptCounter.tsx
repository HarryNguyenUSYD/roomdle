"use client";

import { useSessionStatisticsStore } from "@/store/useSessionStatisticsStore";

export default function AttemptCounter() {
  const {
    attempt
  } = useSessionStatisticsStore();

  return (
    <div className="w-auto h-auto">
      <p className="text-md lg:text-2xl">
        {`Attempt ${attempt}`}
      </p>
    </div>
  )
}
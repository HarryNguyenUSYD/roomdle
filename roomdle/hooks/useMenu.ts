import { useState } from "react";

export default function useMenu() {
  const [isActive, setIsActive] = useState(false);

  const handleSetActive = () => setIsActive(true);
  const handleSetInactive = () => setIsActive(false);

  return { isActive, handleSetActive, handleSetInactive };
}
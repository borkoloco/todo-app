"use client";
import { useState } from "react";

export default function useInput(defaultValue: string) {
  const [value, setValue] = useState(defaultValue);
  return {
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setValue(e.target.value),
  };
}

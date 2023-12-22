"use client";

import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const updateSearchParam = useCallback(
    (searchTerm: string) => {
      const params = new URLSearchParams(searchParams);
      params.set("search", searchTerm);
      router.push(`?${params.toString()}`);
    },

    [router, searchParams]
  );

  return (
    <div className="fixed top-14 left-2 w-[10rem]">
      <Input
        type="text"
        onChange={(e) => updateSearchParam(e.target.value)}
        placeholder="Search..."
      />
    </div>
  );
}

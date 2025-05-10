'use client'

import type { Contact } from "@/types"
import { useMemo, useState } from "react";

export function useFilterData(data: Contact[]) {
  const [search, setSearch] = useState('');

  const filteredData = useMemo(() => {
    return data?.filter(d =>
      d.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, data])

  return { filteredData, search, setSearch }
}
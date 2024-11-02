'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchCafeDetail } from '../api/cafeApi';
import { CafeInfoType } from '../store/cafeStore';
import { fetchFilteringCafeData } from '../api/cafeApi';

export const useFetchCafeDetail = (cafeId: number) => {
  return useQuery<CafeInfoType, Error>({
    queryKey: ['cafeDetail', cafeId],
    queryFn: () => fetchCafeDetail(cafeId),
  });
};

export const useCafeFilterQuery = () => {
  return useMutation({
    mutationFn: fetchFilteringCafeData,
  });
};

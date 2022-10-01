import axios from 'axios';
import { useEffect, useState } from 'react';
import { Status } from '../redux/slices/animes';

export interface State<T> {
  items: T | null;
  status: Status;
}

export function useFetch<T>(url: string, dep: any[]): [T | null, Status] {
  const [data, setData] = useState<State<T>>({ items: null, status: Status.PENDING });
  useEffect(() => {
    axios
      .get(url)
      .then(({ data }) => {
        setData({ items: data, status: Status.SUCCESS });
      })
      .catch((error) => {
        setData({ items: null, status: Status.ERROR });
      });
  }, dep);

  return [data.items, data.status];
}

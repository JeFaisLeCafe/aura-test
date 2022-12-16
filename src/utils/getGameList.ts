import { ApiMonetization } from "../models";

export function getGameList(data: ApiMonetization[]): string[] {
  const res: string[] = [];
  for (const entry of data) {
    if (!res.includes(entry.country)) res.push(entry.country);
  }
  return res;
}

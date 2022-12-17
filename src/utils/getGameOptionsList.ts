import { Option } from "react-multi-select-component";
import { ApiMonetization } from "../models";

export default function getGameOptionsList(data: ApiMonetization[]): Option[] {
  const res: any[] = [];
  for (const entry of data) {
    if (!res.map((v) => v.value).includes(entry.game))
      res.push({ label: entry.game, value: entry.game });
  }
  return res;
}

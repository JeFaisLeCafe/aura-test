import { Option } from "react-multi-select-component";
import { ApiMonetization } from "../models";

export default function getGameFormatsList(data: ApiMonetization[]): Option[] {
  const res: any[] = [];
  for (const entry of data) {
    if (!res.map((v) => v.value).includes(entry.format))
      res.push({ label: entry.format, value: entry.format });
  }
  return res;
}

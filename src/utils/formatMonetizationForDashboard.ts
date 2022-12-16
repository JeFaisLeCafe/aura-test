import { Country, ApiMonetization } from "../models";
import * as _ from "lodash";
import { OS } from "../models/index";

export interface FormattedMonetization {
  game: string;
  total: number;
  revenues: {
    country: Country;
    revenue: number;
  }[];
}
export interface Filters {
  // true if we want to include them, false if we want to exclude them
  iOS: boolean;
  android: boolean;
}

export function formatMonetizationForDashboard(
  data: ApiMonetization[],
  filters: Filters
): FormattedMonetization[] {
  // first we need to filter the data
  let filteredData = _.cloneDeep(data);
  if (!filters.iOS) filteredData = filteredData.filter((v) => v.os !== OS.iOS);
  if (!filters.android)
    filteredData = filteredData.filter((v) => v.os !== OS.android);

  // then we need to format the data
  const formattedData: FormattedMonetization[] = [];
  for (const dataPoint of filteredData) {
    const fMonetization = formattedData.find((v) => v.game === dataPoint.game); // is the FormattedMonetization instance of the game
    if (fMonetization) {
      fMonetization.total += dataPoint.revenue;
      const fMontizationCountry = fMonetization.revenues.find(
        (v) => v.country === dataPoint.country
      );
      if (fMontizationCountry) {
        fMontizationCountry.revenue += dataPoint.revenue;
      } else {
        // we need to create the monetization for this game, for this country
        fMonetization.revenues.push({
          country: dataPoint.country,
          revenue: dataPoint.revenue
        });
      }
    } else {
      // we need to create the monetization for this game and for this country
      formattedData.push({
        game: dataPoint.game,
        revenues: [{ country: dataPoint.country, revenue: dataPoint.revenue }],
        total: dataPoint.revenue
      });
    }
  }

  return formattedData;
}

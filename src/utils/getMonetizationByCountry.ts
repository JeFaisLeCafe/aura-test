import { Country } from "../models";
import { FormattedMonetization } from "./formatMonetizationForDashboard";

interface MonetizationByCountry {
  country: Country;
  revenue: number;
}

export function getMonetizationByCountry(
  formattedData: FormattedMonetization[]
): MonetizationByCountry[] {
  let moneyByC: MonetizationByCountry[] = [];
  // suboptimal but sufficient in first approach, because we already have parsed out data with FormattedMonetization
  for (let country of Object.values(Country)) {
    let countryMoney: MonetizationByCountry = { country, revenue: 0 };
    for (const formattedMonetiz of formattedData) {
      countryMoney.revenue += formattedMonetiz.revenues.reduce(
        (acc, v) => (v.country === country ? v.revenue : acc),
        0
      );
    }
    moneyByC.push(countryMoney);
  }
  return moneyByC;
}

import Loader from "./Loader";
import { useEffect, useMemo, useState } from "react";
import useFetchData from "../services/useFetchData";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";
import { Country } from "../models";
import {
  formatMonetizationForDashboard,
  FormattedMonetization
} from "../utils/formatMonetizationForDashboard";
import { getMonetizationByCountry } from "../utils/getMonetizationByCountry";

const dimensions = "date,format,country,os,game,placement";
const aggregates = "views,revenue,conversions";

const countryStrings: string[] = Object.values(Country);

const Dashboard = () => {
  // filters
  const [start, setStart] = useState(dayjs().toDate());
  const [end, setEnd] = useState(dayjs().toDate());
  const [iOS, setIOS] = useState(true);
  const [android, setAndroid] = useState(true);
  const [games, setGames] = useState([]);
  const [filteredData, setFilteredData] = useState<FormattedMonetization[]>([]);

  const onChange = (dates: [Date | null, Date | null]) => {
    const [startDate, endDate] = dates;
    if (startDate) setStart(startDate);
    if (endDate) setEnd(endDate);
  };

  const { error, isLoading, data, refetch } = useFetchData({
    start: dayjs(start).format("YYYY-MM-DD"),
    end: dayjs(end).format("YYYY-MM-DD"),
    dimensions,
    aggregates
  });

  console.log("data", data);

  useEffect(() => {
    setFilteredData(formatMonetizationForDashboard(data, { iOS, android }));
  }, [data, iOS, android]);

  const moneyByCountry = useMemo(() => {
    return getMonetizationByCountry(filteredData);
  }, [filteredData]);

  if (isLoading) {
    return (
      <div className="container flex items-center justify-center min-h-screen mx-auto">
        <Loader />
      </div>
    );
  }

  console.log("filteredData", filteredData);
  console.log("moneyByCountry", moneyByCountry);

  return (
    <div className="flex flex-col w-screen h-screen p-5">
      <form className="flex flex-row mb-3">
        <div>
          <input
            type="checkbox"
            id="iOS"
            name="iOS"
            value={String(iOS)}
            defaultChecked
            onChange={() => setIOS((v) => !v)}
          />
          <label>iOS</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="android"
            name="android"
            value={String(android)}
            defaultChecked
            onChange={() => setAndroid((v) => !v)}
          />
          <label>Android</label>
        </div>
        {/* <DatePicker
          selected={start}
          onChange={onChange}
          startDate={start}
          endDate={end}
          selectsRange
          inline
        /> */}
      </form>

      <table className="border border-separate table-auto bg-slate-200 border-slate-500 border-spacing-2">
        <thead>
          <tr>
            <th className="border border-slate-600">Game</th>
            {countryStrings.map((country) => {
              return (
                <th className="border border-slate-600" key={country}>
                  {country}
                </th>
              );
            })}
            <th className="border border-slate-600">Total</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((game) => {
            return (
              <tr key={game.game}>
                <td className="border border-slate-600">{game.game}</td>
                {countryStrings.map((c) => {
                  const d = game.revenues.find((v) => v.country === c);
                  return <td>{d?.revenue.toFixed(2)}</td>;
                })}
                <td>{game.total.toFixed(2)}</td>
              </tr>
            );
          })}
          <tr className="border border-slate-600">
            <td className="font-bold border border-slate-600 bg-slate-100">
              Total:
            </td>
            {countryStrings.map((country) => {
              const mbc = moneyByCountry.find((v) => v.country === country);
              return <td>{mbc?.revenue.toFixed(2)}</td>;
            })}
            <td className="font-bold rounded bg-slate-100">
              {moneyByCountry
                .map((v) => v.revenue)
                .reduce((acc, v) => acc + v)
                .toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;

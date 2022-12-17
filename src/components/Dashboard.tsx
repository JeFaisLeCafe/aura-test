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
import getGameOptionsList from "../utils/getGameOptionsList";
import { MultiSelect, Option } from "react-multi-select-component";
import getGameFormatsList from "../utils/getGameFormatsList";
import { formatNumber } from "../utils/formatNumber";

const dimensions = "date,format,country,os,game,placement";
const aggregates = "views,revenue,conversions";

const countryStrings: string[] = Object.values(Country);

const Dashboard = () => {
  // filters
  const [start, setStart] = useState<Date | null>(dayjs().toDate());
  const [end, setEnd] = useState<Date | null>(dayjs().toDate());
  const [iOS, setIOS] = useState(true);
  const [android, setAndroid] = useState(true);
  const [selectedGames, setSelectedGames] = useState<Option[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<Option[]>([]);
  const [filteredData, setFilteredData] = useState<FormattedMonetization[]>([]);

  const { error, isLoading, data } = useFetchData({
    start: dayjs(start).format("YYYY-MM-DD"),
    end: dayjs(end).format("YYYY-MM-DD"),
    dimensions,
    aggregates
  });

  const gamesOptions = useMemo(() => {
    return getGameOptionsList(data);
  }, [data]);

  const gamesFormats = useMemo(() => {
    return getGameFormatsList(data);
  }, [data]);

  useEffect(() => {
    setFilteredData(
      formatMonetizationForDashboard(data, {
        iOS,
        android,
        selectedGames,
        selectedFormats
      })
    );
  }, [data, iOS, android, selectedGames, selectedFormats]);

  useEffect(() => {
    setSelectedGames(getGameOptionsList(data));
    setSelectedFormats(getGameFormatsList(data));
  }, [data]);

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

  return (
    <div className="flex flex-col w-screen h-screen p-5">
      <form className="flex flex-row items-center py-2 mb-3 space-x-3">
        <label className="hover:cursor-pointer">
          <input
            className=""
            type="checkbox"
            id="iOS"
            name="iOS"
            value={String(iOS)}
            defaultChecked
            onChange={() => setIOS((v) => !v)}
          />
          iOS
        </label>
        <label className="hover:cursor-pointer">
          <input
            type="checkbox"
            id="android"
            name="android"
            value={String(android)}
            defaultChecked
            onChange={() => setAndroid((v) => !v)}
          />
          Android
        </label>
        <div className="flex">
          <p>From: </p>
          <DatePicker
            className="w-32 text-center border cursor-pointer"
            selected={start}
            onChange={(date) => setStart(date)}
            selectsStart
            startDate={start}
            endDate={end}
            todayButton="Today"
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <div className="flex">
          <p>To: </p>
          <DatePicker
            className="w-32 text-center border cursor-pointer"
            selected={end}
            onChange={(date) => setEnd(date)}
            selectsEnd
            startDate={start}
            endDate={end}
            minDate={start}
            todayButton="Today"
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <div className="flex items-center">
          <p>Games: </p>
          <MultiSelect
            overrideStrings={{
              allItemsAreSelected: "All items"
            }}
            className="max-w-[200px]"
            options={gamesOptions}
            value={selectedGames}
            onChange={(v: Option[]) => setSelectedGames(v)}
            labelledBy={"games-select"}
            disableSearch
          />
        </div>
        <div className="flex items-center">
          <p>Formats: </p>
          <MultiSelect
            overrideStrings={{
              allItemsAreSelected: "All items"
            }}
            className="max-w-[200px]"
            options={gamesFormats}
            value={selectedFormats}
            onChange={(v: Option[]) => setSelectedFormats(v)}
            labelledBy={"games-select"}
            disableSearch
          />
        </div>
      </form>

      {error && (
        <div>
          <p className="text-red-700 text-bold">
            An error has occured ! {error}
          </p>
        </div>
      )}

      <table className="border border-separate table-fixed bg-slate-200 border-slate-500 border-spacing-2">
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
                  if (!d) return null;
                  return (
                    <td key={d.country}>
                      <p>{d.revenue.toFixed(2)}</p>
                      <p className="text-xs text-gray-700">
                        views:
                        {formatNumber(d.views)} - conversions:{" "}
                        {formatNumber(d.conversions)}
                      </p>
                    </td>
                  );
                })}
                <td className="rounded bg-slate-100">
                  {formatNumber(game.total, 2)}
                </td>
              </tr>
            );
          })}
          <tr className="text-lg border border-slate-600">
            <td className="font-bold border border-slate-600 bg-slate-100">
              Total:
            </td>
            {countryStrings.map((country) => {
              const mbc = moneyByCountry.find((v) => v.country === country);
              return (
                <td key={country} className="rounded bg-slate-100">
                  {formatNumber(mbc?.revenue, 2)}
                </td>
              );
            })}
            <td className="font-bold rounded bg-slate-100">
              {formatNumber(
                moneyByCountry
                  .map((v) => v.revenue)
                  .reduce((acc, v) => acc + v),
                2
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;

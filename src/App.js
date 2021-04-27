import "./App.css";
import React, { useEffect, useState } from "react";
import LineGraph from "./components/lineGraph";
import axios from "./axios";
import CovidSummary from "./components/CovidSummary";

function App() {
  const [totalConfirmed, setTotalConfirmed] = useState(0);
  const [totalRecovered, setTotalRecovered] = useState(0);
  const [totalDeaths, setTotalDeaths] = useState(0);

  const [covidSummary, setcovidSummary] = useState({});
  const [days, setDays] = useState(7);
  const [country, setCountry] = useState("");
  const [coronaCountAr, setCoronaCountAr] = useState([]);
  const [label, setLabel] = useState([]);
  //componentDidMount
  useEffect(() => {
    document.title = "Covid19 Tracker";
  }, []);
  useEffect(() => {
    axios
      .get(`/summary`)
      .then((res) => {
        if (res.status === 200) {
          setTotalConfirmed(res.data.Global.TotalConfirmed);
          setTotalRecovered(res.data.Global.NewRecovered);
          setTotalDeaths(res.data.Global.TotalDeaths);
          setcovidSummary(res.data);
        }
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getCoronaReportbyDateRange = (countrySlug, from, to) => {
    axios
      .get(
        `/country/${countrySlug}/status/confirmed?from=${from}T00:00:00Z&to=${to}T00:00:00Z`
      )
      .then((res) => {
        console.log(res);

        const yAxisCoronaCount = res.data.map((d) => d.Cases);
        const xAxisLabel = res.data.map((d) => d.Date);
        const covidDetails = covidSummary.Countries.find(
          (country) => country.Slug === countrySlug
        );
        setCoronaCountAr(yAxisCoronaCount);
        setTotalConfirmed(covidDetails.TotalConfirmed);
        setTotalRecovered(covidDetails.TotalRecovered);
        setTotalDeaths(covidDetails.TotalDeaths);
        setLabel(xAxisLabel);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = `0${d.getMonth() + 1}`;
    const _date = d.getDate();

    return `${year}-${month}-${_date}`;
  };

  const countryHandler = (e) => {
    setCountry(e.target.value);

    const d = new Date();
    const to = formatDate(d);
    const from = formatDate(d.setDate(d.getDate() - days));
    console.log(from, to);
    getCoronaReportbyDateRange(e.target.value, from, to);
  };

  const daysHandler = (e) => {
    setDays(e.target.value);

    const d = new Date();
    const to = formatDate(d);
    const from = formatDate(d.setDate(d.getDate() - e.target.value));
    getCoronaReportbyDateRange(country, from, to);
  };

  return (
    <div className="App">
      <h2 className="covid" style={{ color: "#fd7e99" }}>
        COVID-19 TRACKER
      </h2>
      <CovidSummary
        totalConfirmed={totalConfirmed}
        totalRecovered={totalRecovered}
        totalDeaths={totalDeaths}
        country={country}
      />
      <div>
        <select value={country} onChange={countryHandler}>
          <option value="">Select Country</option>
          {covidSummary.Countries &&
            covidSummary.Countries.map((country) => (
              <option key={country.Slug} value={country.Slug}>
                {country.Country}
              </option>
            ))}
        </select>
        <select value={days} onChange={daysHandler}>
          <option value="7">Last 7 Days</option>
          <option value="30">Last 30 Days</option>
          <option value="90">Last 90 Days</option>
        </select>
      </div>
      <LineGraph yAxis={coronaCountAr} label={label} />
    </div>
  );
}

export default App;

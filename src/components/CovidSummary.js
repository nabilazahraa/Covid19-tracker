import React from "react";

import CountUp from "react-countup";

const CovidSummary = (props) => {
  const { totalConfirmed, totalRecovered, totalDeaths, country } = props;

  return (
    <div>
      <div>
        <div>
          <h1
            className="country"
            style={{ textTransform: "capitalize", color: "Grey" }}
          >
            {country === "" ? "World Wide Corona Report" : country}
          </h1>
        </div>
        <div className="header">
          <div className="confirm">
            <span style={{ color: "white", opacity: "0.85" }}>
              Total Confirmed
            </span>
            <br />
            <br></br>
            <h2 style={{ color: "white" }}>
              {<CountUp separator="," end={totalConfirmed} />}
            </h2>
          </div>
          <div className="recover">
            <span style={{ color: "white", opacity: "0.85" }}>
              Total Recovered
            </span>
            <br />
            <br></br>
            <h2 style={{ color: "white" }}>
              {" "}
              {<CountUp separator="," end={totalRecovered} />}
            </h2>
          </div>
          <div className="death">
            <span style={{ color: "white", opacity: "0.85" }}>
              Total Deaths
            </span>
            <br />
            <br></br>

            <h2 style={{ color: "white" }}>
              {<CountUp separator="," end={totalDeaths} />}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CovidSummary;

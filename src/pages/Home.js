import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import styles from "./Home.module.css";

const contracts = [
  "0x3472A5A71965499acd81997a54BBA8D852C6E53d",
  "0x798d1be841a82a273720ce31c822c61a67a601c3",
];

const Home = () => {
  const [chart, setChart] = useState("");
  const [data, setData] = useState();
  const [data2, setData2] = useState();
  const [data3, setData3] = useState();
  useEffect(() => {
    const query = async () => {
      let response = await fetch(
        `https://api.coingecko.com/api/v3/coins/ethereum/contract/${contracts[0]}/market_chart/?vs_currency=usd&days=300`
      );
      let json = await response.json();
      // transform BADGER data
      let newData = json.prices.map((entry) => {
        let newEntry = {};
        const date = new Date(entry[0]);
        newEntry["date"] =
          date.getUTCDate() +
          "/" +
          (date.getUTCMonth() + 1) +
          "/" +
          date.getUTCFullYear();
        newEntry["price"] = entry[1];
        return newEntry;
      });
      setData(newData);

      response = await fetch(
        `https://api.coingecko.com/api/v3/coins/ethereum/contract/${contracts[1]}/market_chart/?vs_currency=usd&days=300`
      );
      json = await response.json();
      // transform DIGG data
      newData = json.prices.map((entry) => {
        let newEntry = {};
        const date = new Date(entry[0]);
        newEntry["date"] =
          date.getUTCDate() +
          "/" +
          (date.getUTCMonth() + 1) +
          "/" +
          date.getUTCFullYear();
        newEntry["price"] = entry[1];
        return newEntry;
      });
      setData2(newData);
    };
    query();
  }, []);
  const BADGERChart = () => {
    setChart("BADGER");
  };
  const DIGGChart = () => {
    setChart("DIGG");
  };
  const AUMChart = () => {
    setChart("AUM");
  };

  return (
    <div className={styles.content}>
      <div className={styles.column}>
        <div className={[styles.wrapper, styles.row6].join(" ")}>
          <div className={[styles.title].join(" ")}>
            Assets Under Management (AUM)
          </div>
          <div>$500,000,000.00</div>
        </div>
        <div className={[styles.wrapper, styles.row3].join(" ")}>
          <div>Badger DAO Price</div>
          <div>$15.00</div>
        </div>
        <div className={[styles.wrapper, styles.row3].join(" ")}>
          <div>DIGG Price</div>
          <div>$40,000.00</div>
        </div>
      </div>
      <div className={styles.column}>
        <div className={[styles.wrapper, styles.row9].join(" ")}>
          <div>
            <button
              className={[styles.chartButton].join(" ")}
              onClick={BADGERChart}
            >
              BADGER Price
            </button>
            <button
              className={[styles.chartButton].join(" ")}
              onClick={DIGGChart}
            >
              DIGG Price
            </button>
            <button
              className={[styles.chartButton].join(" ")}
              onClick={DIGGChart}
            >
              AUM Price
            </button>
          </div>
          <LineChart
            width={900 - 40}
            height={400}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <Tooltip
              contentStyle={{
                color: "black",
                backgroundColor: "white",
                borderRadius: 10,
              }}
            />
            <Legend />
            <Line
              name="DIGG Price"
              type="monotone"
              stroke="orange"
              data={
                chart == "BADGER"
                  ? data
                  : chart == "DIGG"
                  ? data2
                  : chart == "AUM"
                  ? data3
                  : data
              }
              dataKey="price"
              dot={false}
              activeDot={{ r: 8 }}
              yAxisId="left"
            />
          </LineChart>
        </div>
        <div className={[styles.wrapper, styles.row3].join(" ")}>
          <div>Demographic Breakdown</div>
        </div>
      </div>
      <div className={styles.column}>
        <div className={[styles.wrapper, styles.row6].join(" ")}>
          <div>24 hr Volume (Badger DAO)</div>
          <div>1,000,000 BADGER</div>
        </div>
        <div className={[styles.wrapper, styles.row6].join(" ")}>
          <div>24 hr Volume (DIGG)</div>
          <div>30 DIGG</div>
        </div>
      </div>
    </div>
  );
};

export default Home;

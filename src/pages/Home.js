import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import styles from "./Home.module.css";

const contracts = [
  "0x3472A5A71965499acd81997a54BBA8D852C6E53d",
  "0x798d1be841a82a273720ce31c822c61a67a601c3",
];

const Home = () => {
  const [covalentData, setCovalentData] = useState([]);
  const [chart, setChart] = useState("");
  const [data, setData] = useState();
  const [data2, setData2] = useState();
  const [data3, setData3] = useState();
  useEffect(() => {
    const query = async () => {
      // fetch BADGER
      let response = await fetch(
        `https://api.coingecko.com/api/v3/coins/ethereum/contract/${contracts[0]}/market_chart/?vs_currency=usd&days=300`
      );
      let json = await response.json();
      // transform BADGER data
      let newData = json.prices.map((entry) => {
        let newEntry = {};
        const date = new Date(entry[0]);
        newEntry["date"] =
          date.getUTCMonth() +
          1 +
          "/" +
          date.getUTCDate() +
          "/" +
          date.getUTCFullYear();
        newEntry["price"] = entry[1];
        return newEntry;
      });
      setData(newData);

      // fetch DIGG
      response = await fetch(
        `https://api.coingecko.com/api/v3/coins/ethereum/contract/${contracts[1]}/market_chart/?vs_currency=usd&days=300`
      );
      json = await response.json();
      // transform DIGG data
      newData = json.prices.map((entry) => {
        let newEntry = {};
        const date = new Date(entry[0]);
        newEntry["date"] =
          date.getUTCMonth() +
          1 +
          "/" +
          date.getUTCDate() +
          "/" +
          date.getUTCFullYear();
        newEntry["price"] = entry[1];
        return newEntry;
      });
      setData2(newData);

      // fetch AUM/TVL
      response = await fetch(`https://api.llama.fi/protocol/badger-dao`);
      json = await response.json();
      // transform AUM data
      newData = json.tvl.map((entry) => {
        let newEntry = {};
        const date = new Date(entry.date * 1000); // *1000 for ms instead of secs
        newEntry["date"] =
          date.getUTCMonth() +
          1 +
          "/" +
          date.getUTCDate() +
          "/" +
          date.getUTCFullYear();
        newEntry["price"] = entry.totalLiquidityUSD;
        return newEntry;
      });
      //   console.log(newData);
      setData3(newData);
    };
    query();

    // query covalent json file
    const query_covalent = async () => {
      const covalent_data = require("../misc/download.json");
      const transactions = await covalent_data.data.items.map((block) => {
        const transactions_ = block.log_events.map((txn) => {
          let from, to, amount;
          if (txn.sender_contract_ticker_symbol === "BADGER") {
            txn.decoded.params.map((e) => {
              if (e.name === "from") {
                from = e.value;
              } else if (e.name === "to") {
                to = e.value;
              } else if (e.name === "value") {
                amount = e.value;
              }
            });
          }
          if (from != null && to != null && amount != null) {
            return { from: from, to: to, amount: amount };
          } else {
            return {};
          }
        });
        return transactions_;
      });
      for (const row of transactions) {
        for (const txn of row) {
          let newTxn = covalentData;
          if (Object.keys(txn).length === 0) {
          } else {
            newTxn.push(txn);
            setCovalentData(newTxn);
          }
        }
      }
      console.log(covalentData);

      // total up unique user balances
      let users = {};
      covalentData.map((user) => {
        if (user.from in users) {
          users[user.from] = users[user.from] - user.amount;
        } else {
          users[user.from] = -user.amount;
        }
        if (user.to in users) {
          users[user.to] = users[user.to] + user.amount;
        } else {
          users[user.to] = user.amount;
        }
      });
      console.log(users);

      // whales
      let whales = {};
      let arrUsers = Object.entries(users);
      for (let i = 0; i < arrUsers.length - 1; i++) {
        for (let j = 0; j < arrUsers.length - 1; j++) {
          if (arrUsers[j][1] < arrUsers[j + 1][1]) {
            const temp = arrUsers[j];
            arrUsers[j] = arrUsers[j + 1];
            arrUsers[j + 1] = temp;
          }
        }
      }
      console.log(arrUsers);
      console.log("done");
    };
    query_covalent();
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
              onClick={AUMChart}
            >
              AUM
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
            <XAxis dataKey="date" xAxisId="xAxis" />
            <YAxis />
            <Tooltip
              contentStyle={{
                color: "black",
                backgroundColor: "white",
                borderRadius: 10,
              }}
            />
            <Legend />
            <Line
              name={
                chart == "BADGER"
                  ? "BADGER Price"
                  : chart == "DIGG"
                  ? "DIGG Price"
                  : chart == "AUM"
                  ? "Assets Under Management"
                  : "BADGER Price"
              }
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
              xAxisId="xAxis"
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

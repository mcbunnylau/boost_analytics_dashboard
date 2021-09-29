import React from "react";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
  Text,
} from "recharts";
import styles from "./Home.module.css";

const Home = () => {
  const data = [
    {
      date: "08/05/2021",
      AUM: 4000,
      BADGER: 2400,
      DIGG: 2400,
    },
    {
      date: "08/06/2021",
      AUM: 3000,
      BADGER: 1398,
      DIGG: 2210,
    },
    {
      date: "08/07/2021",
      AUM: 2000,
      BADGER: 9800,
      DIGG: 2290,
    },
    {
      date: "08/08/2021",
      AUM: 2780,
      BADGER: 3908,
      DIGG: 2000,
    },
    {
      date: "08/09/2021",
      AUM: 1890,
      BADGER: 4800,
      DIGG: 2181,
    },
    {
      date: "08/10/2021",
      AUM: 2390,
      BADGER: 3800,
      DIGG: 2500,
    },
    {
      date: "08/11/2021",
      AUM: 3490,
      BADGER: 4300,
      DIGG: 2100,
    },
  ];

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
          <LineChart
            width={900 - 40}
            height={400}
            data={data}
            margin={{
              top: 20,
              right: 40,
              left: 20,
              bottom: 50,
            }}
          >
            <XAxis dataKey="date" angle={-45} textAnchor="end" />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
            <Line type="monotone" dataKey="AUM" stroke="#8884d8" />
            <Line type="monotone" dataKey="BADGER" stroke="#82ca9d" />
            <Line type="monotone" dataKey="DIGG" stroke="red" />
          </LineChart>
        </div>
        <div className={[styles.wrapper, styles.row3].join(" ")}>
          <PieChart width={300 - 40} height={400}>
            <Pie
              data={data}
              dataKey="AUM"
              nameKey="date"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="orange"
              //   label
            />
          </PieChart>
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

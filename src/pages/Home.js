import styles from "./Home.module.css";

const Home = () => {
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
        <div
          className={[styles.wrapper, styles.row9].join(" ")}
          style={{ height: 400 }}
        >
          Multi Chart
        </div>
        <div className={[styles.wrapper, styles.row3].join(" ")}>Pie Chart</div>
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

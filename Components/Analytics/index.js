import styles from "@/src/styles/Analytics.module.css";
import Stats from "./Stats";
import BarChart from "./BarChart";
export default function Analytic() {
  return (
    <div className={styles.analytics}>
      <Stats />
      <BarChart />
    </div>
  );
}

import styles from "@/src/styles/Analytics.module.css";
import { useContext } from "react";
import { TaskContext } from "@/Components/AppContent";
import Loader from "@/Components/Loader";
export default function Stats() {
  const { taskList, tomatoDetails, timerSettings } = useContext(TaskContext);
  if (
    Object.keys(timerSettings).length === 0 ||
    Object.keys(tomatoDetails).length === 0
  )
    return (
      <div className={styles.stats}>
        <div className={styles.statsbox}>
          {" "}
          <Loader />
        </div>
        <div className={styles.statsbox}>
          {" "}
          <Loader />
        </div>
      </div>
    );
  const trainingData = Array(7).fill(0);
  const focusTime = tomatoDetails.weeklyFocusTime;
  let weeklySum = tomatoDetails.weeklyTomato.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  taskList
    .filter((item, i) => item.taskStatus === "Completed")
    .filter((item) => {
      const millisecondsPerDay = 24 * 60 * 60 * 1000;
      const daydiff = Math.floor(
        (new Date().getTime() -
          new Date(
            Number(item.completedOn) - new Date().getTimezoneOffset()
          ).getTime()) /
          millisecondsPerDay
      );
      if (daydiff < 7 && daydiff > -1) {
        ++trainingData[daydiff];
      }
      return daydiff < 7;
    });
  return (
    <div className={styles.stats}>
      <div className={styles.statsbox}>
        <h1>Today</h1>
        <h3>Done: {trainingData[0]}</h3>
        <h3>Tomato: {tomatoDetails.weeklyTomato[0]}</h3>
        <h3>Focus Time: {focusTime[0]}</h3>
      </div>
      <div className={styles.statsbox}>
        <h1>Last 7 days</h1>
        <h3>
          Done:{" "}
          {trainingData.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
          )}
        </h3>
        <h3>Tomato:{weeklySum}</h3>
        <h3>
          Focus Time:{" "}
          {tomatoDetails.weeklyFocusTime.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
          )}
        </h3>
      </div>
    </div>
  );
}

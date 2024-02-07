import { TaskContext } from "@/Components/AppContent";
import { useContext, useRef } from "react";
import styles from "@/src/styles/Settings.module.css";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { UPDATE_TIMERSETTING_MUTATION } from "@/Data/clientQueries";
import { Toaster, toast } from "react-hot-toast";
import Loader from "@/Components/Loader";
export default function TimerSettings() {
  const router = useRouter();
  const [updateTimerSettingMutation] = useMutation(
    UPDATE_TIMERSETTING_MUTATION
  );
  const { timerSettings, action } = useContext(TaskContext);
  const autoStartRef = useRef(timerSettings.autoStart);
  const pomoTechniqueRef = useRef(timerSettings.pomoTechnique);
  const pomodoroRef = useRef(timerSettings.pomodoro / 60);
  const shortBreakRef = useRef(timerSettings.shortBreak / 60);
  const longBreakRef = useRef(timerSettings.longBreak / 60);
  if (Object.keys(timerSettings).length === 0)
    return (
      <div className={styles.timersettings}>
        <Loader />
      </div>
    );
  const handleKeyDown = (e) => {
    if (
      e.key === "." ||
      e.key === "+" ||
      e.key === "-" ||
      (e.key === "0" && e.target.value.length === 0)
    )
      e.preventDefault();
  };
  const onSave = (e) => {
    if (
      pomodoroRef.current.value <= 0 ||
      shortBreakRef.current.value <= 0 ||
      longBreakRef.current.value <= 0
    ) {
      return toast.error("Please specify minutes for all 3 sections!");
    }
    let updatedTimerSettings = JSON.parse(JSON.stringify(timerSettings));
    updatedTimerSettings.pomodoro = pomodoroRef.current.value * 60;
    updatedTimerSettings.shortBreak = shortBreakRef.current.value * 60;
    updatedTimerSettings.longBreak = longBreakRef.current.value * 60;
    updatedTimerSettings.autoStart = autoStartRef.current.checked;
    updatedTimerSettings.pomoTechnique = pomoTechniqueRef.current.checked;
    let id = Number(timerSettings.id);
    action.updateTimerSettings(updatedTimerSettings);
    toast.success("Saved successfully");
    updateTimerSettingMutation({
      variables: {
        id,
        pomodoro: Number(updatedTimerSettings.pomodoro),
        shortBreak: Number(updatedTimerSettings.shortBreak),
        longBreak: Number(updatedTimerSettings.longBreak),
        autoStart: Boolean(updatedTimerSettings.autoStart),
        pomoTechnique: Boolean(updatedTimerSettings.pomoTechnique),
      },
    });
  };
  return (
    <div className={styles.timersettings}>
      <h1>Timer Settings </h1>
      <p>Pomodoro (Minutes): </p>
      <input
        className={styles.numInput}
        ref={pomodoroRef}
        type="number"
        onKeyDown={handleKeyDown}
        placeholder={timerSettings.pomodoro / 60}
      />
      <br />
      <p>Short Break (Minutes): </p>
      <input
        className={styles.numInput}
        ref={shortBreakRef}
        type="number"
        onKeyDown={handleKeyDown}
        placeholder={timerSettings.shortBreak / 60}
      />
      <br />
      <p>Long Break (Minutes): </p>
      <input
        className={styles.numInput}
        ref={longBreakRef}
        type="number"
        onKeyDown={handleKeyDown}
        placeholder={timerSettings.longBreak / 60}
      />
      <br />
      <p>Auto start sessions: </p>
      <input
        ref={autoStartRef}
        defaultChecked={timerSettings.autoStart}
        type="checkbox"
        className={styles.checkInput}
      />
      <br />
      <p>Use Pomodoro Technique: </p>
      <input
        ref={pomoTechniqueRef}
        defaultChecked={timerSettings.pomoTechnique}
        type="checkbox"
        className={styles.checkInput}
      />
      <br />
      <button onClick={onSave}>Save</button>
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 1000,
        }}
      />
      <br />
      <button>
        <a href="/api/auth/logout">Log Out</a>
      </button>
    </div>
  );
}

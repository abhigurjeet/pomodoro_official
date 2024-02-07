import styles from "@/src/styles/Pomo.module.css";
import { HiPlay, HiPause } from "react-icons/hi";
import { AiOutlineReload, AiFillCloseCircle } from "react-icons/ai";
import { useState, useEffect, useRef, useContext } from "react";
import { useMutation } from "@apollo/client";
import {
  UPDATE_ACTIVE_TASK_MUTATION,
  UPDATE_TASK_STATUS_MUTATION,
} from "@/Data/clientQueries";
import { TaskContext } from "@/Components/AppContent";
import Loader from "@/Components/Loader";

export default function Timer({
  activeSession,
  sessionCompleted,
  handleClose,
}) {
  const { timerSettings, action, tomatoDetails } = useContext(TaskContext);
  const [seconds, setSeconds] = useState(timerSettings[activeSession]);
  const [updateTaskStatusMutation] = useMutation(UPDATE_TASK_STATUS_MUTATION);
  const [updateActiveTaskMutation] = useMutation(UPDATE_ACTIVE_TASK_MUTATION);
  const [pause, setPause] = useState(true);

  useEffect(() => {
    setSeconds(timerSettings[activeSession]);
    if (timerSettings.autoStart && tomatoDetails.activeTask !== -1)
      setPause(false);
    else setPause(true);
  }, [activeSession]);
  useEffect(() => {
    setSeconds(timerSettings[activeSession]);
  }, [timerSettings[activeSession]]);
  useEffect(() => {
    let interval;
    if (!pause) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev === 1) {
            setPause(true);
          }
          return prev - 1;
        });
      }, 1000);
    }
    if (seconds === 0) sessionCompleted();
    return () => {
      clearInterval(interval);
    };
  }, [pause]);
  if (
    Object.keys(tomatoDetails).length === 0 ||
    Object.keys(timerSettings).length === 0
  )
    return <Loader />;
  const buttonDisabled = seconds === 0 || tomatoDetails.activeTask === -1;
  const buttonColor =
    seconds === 0 || tomatoDetails.activeTask === -1 ? "#ccc" : "#f5ba13";

  return (
    <>
      <h1>
        {Math.floor(seconds / 60) < 10
          ? `0${Math.floor(seconds / 60)}`
          : Math.floor(seconds / 60)}
        :{seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60}
      </h1>
      <div className={styles.buttonsection}>
        <button
          onClick={() => {
            setPause(true);
            setSeconds(timerSettings[activeSession]);
            updateTaskStatusMutation({
              variables: {
                id: Number(tomatoDetails.activeTask),
                taskStatus: "Not started",
                completedOn: null,
              },
            });
            updateActiveTaskMutation({
              variables: {
                id: Number(tomatoDetails.id),
                activeTask: -1,
              },
            });
            action.updateTaskStatus(tomatoDetails.activeTask, "Not started");
            action.setActiveTask(-1);
            handleClose();
          }}
          disabled={tomatoDetails.activeTask === -1}
          style={{
            color: tomatoDetails.activeTask === -1 ? "#ccc" : "#f5ba13",
          }}
        >
          <AiFillCloseCircle />
        </button>
        <button
          disabled={buttonDisabled}
          onClick={() => setPause((prev) => !prev)}
          style={{ color: buttonColor }}
        >
          {pause ? <HiPlay /> : seconds === 0 ? <HiPlay /> : <HiPause />}
        </button>
        <button
          onClick={() => {
            setSeconds(timerSettings[activeSession]);
            if (timerSettings.autoStart) setPause(false);
            else setPause(true);
          }}
          disabled={tomatoDetails.activeTask === -1}
          style={{
            color: tomatoDetails.activeTask === -1 ? "#ccc" : "#f5ba13",
          }}
        >
          <AiOutlineReload />
        </button>
      </div>
    </>
  );
}

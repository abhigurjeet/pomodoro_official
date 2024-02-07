import { useState, useContext } from "react";
import Link from "next/link";
import { TaskContext } from "@/Components/AppContent";
import { HiCheckCircle } from "react-icons/hi";
import { MdAddCircle } from "react-icons/md";
import styles from "@/src/styles/Pomo.module.css";
import { useMutation } from "@apollo/client";
import {
  UPDATE_ACTIVE_TASK_MUTATION,
  UPDATE_TASK_STATUS_MUTATION,
} from "@/Data/clientQueries";
import Loader from "@/Components/Loader";
export default function ActiveTask() {
  const { tomatoDetails, taskList, action } = useContext(TaskContext);
  const [updateTaskStatusMutation] = useMutation(UPDATE_TASK_STATUS_MUTATION);
  const [updateActiveTaskMutation] = useMutation(UPDATE_ACTIVE_TASK_MUTATION);
  if (
    Object.keys(tomatoDetails).length === 0 ||
    (Number(tomatoDetails.activeTask) !== -1 &&
      Object.keys(taskList).length === 0)
  )
    return (
      <div className={styles.noactivetask}>
        <Loader />
      </div>
    );
  const handleMarkAsComplete = (e) => {
    updateTaskStatusMutation({
      variables: {
        id: Number(tomatoDetails.activeTask),
        taskStatus: "Completed",
        completedOn: new Date().toISOString(),
      },
    });
    updateActiveTaskMutation({
      variables: {
        id: Number(tomatoDetails.id),
        activeTask: Number(-1),
      },
    });
    action.updateTaskStatus(tomatoDetails.activeTask, "Completed");
    action.setActiveTask(-1);
  };
  return (
    <>
      {tomatoDetails.activeTask === -1 ? (
        <div className={styles.noactivetask}>
          <h1>Add a task to start Timer</h1>
          <Link href="/task">
            <button className={styles.addbutton}>Create New Task</button>
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.activetask}>
            <div className={styles.activetaskleft}>
              <strong>
                {
                  taskList[
                    taskList.findIndex(
                      (item) =>
                        Number(item.id) === Number(tomatoDetails.activeTask)
                    )
                  ].title
                }
              </strong>{" "}
              <p>
                {
                  taskList[
                    taskList.findIndex(
                      (item) =>
                        Number(item.id) === Number(tomatoDetails.activeTask)
                    )
                  ].description
                }
              </p>
              <strong>
                Due Date:{" "}
                {new Date(
                  Number(
                    taskList[
                      taskList.findIndex(
                        (item) =>
                          Number(item.id) === Number(tomatoDetails.activeTask)
                      )
                    ].dueDate
                  ) - new Date().getTimezoneOffset()
                ).toLocaleDateString()}
              </strong>
            </div>
            <div className={styles.activetaskright}>
              <span>
                Tomato:{" "}
                {
                  taskList[
                    taskList.findIndex(
                      (item) =>
                        Number(item.id) === Number(tomatoDetails.activeTask)
                    )
                  ].tomato
                }
              </span>
              <Link href="/task">
                <button type="submit" onClick={handleMarkAsComplete}>
                  <HiCheckCircle /> Mark As Completed
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}

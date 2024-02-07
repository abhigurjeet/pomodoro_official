import { HiPlay, HiPause, HiCheckCircle } from "react-icons/hi";
import { AiFillDelete } from "react-icons/ai";
import styles from "@/src/styles/Task.module.css";
import { useState, useContext } from "react";
import { TaskContext } from "@/Components/AppContent";
import Link from "next/link";
import { useMutation } from "@apollo/client";
import {
  DELETE_TASK_MUTATION,
  UPDATE_ACTIVE_TASK_MUTATION,
  UPDATE_TASK_STATUS_MUTATION,
} from "@/Data/clientQueries";
import Loader from "@/Components/Loader";

export default function DisplayTasks({ tasksLoading }) {
  const { taskList, tomatoDetails, action, filters } = useContext(TaskContext);
  const [deleteTaskMutation] = useMutation(DELETE_TASK_MUTATION);
  const [updateTaskStatusMutation] = useMutation(UPDATE_TASK_STATUS_MUTATION);
  const [updateActiveTaskMutation] = useMutation(UPDATE_ACTIVE_TASK_MUTATION);
  if (Object.keys(tomatoDetails).length === 0) return <Loader />;
  //FILTER LOGIC
  const filteredList = taskList
    .filter((item) => {
      //filter for taskStatus
      if (filters.taskStat === "" || filters.taskStat === "all") {
        return true;
      } else if (filters.taskStat === "completed") {
        return item.taskStatus === "Completed";
      } else if (filters.taskStat === "pending") {
        return item.taskStatus !== "Completed";
      }
    })
    .filter((item) => {
      //filter for Day
      const millisecondsPerDay = 24 * 60 * 60 * 1000;
      const daydiff = Math.floor(
        (Number(new Date()) - Number(item.createDate)) / millisecondsPerDay
      );
      if (filters.sortday === "today") {
        return daydiff < 1;
      } else if (filters.sortday === "lastweek") {
        return daydiff < 7;
      } else return true;
    })
    .sort((a, b) => Number(a.createDate) - Number(b.createDate));
  if (filters.sortdate === "" || filters.sortdate === "ascending") {
    filteredList.reverse();
  }

  //EVENT HANDLERS
  const handlePlay = (i, e) => {
    if (
      taskList[taskList.findIndex((item) => Number(item.id) === Number(i))]
        .taskStatus === "Not started"
    ) {
      if (tomatoDetails.activeTask !== -1) {
        updateTaskStatusMutation({
          variables: {
            id: Number(tomatoDetails.activeTask),
            taskStatus: "Not started",
            completedOn: null,
          },
        });
        action.updateTaskStatus(tomatoDetails.activeTask, "Not started");
      }
      updateActiveTaskMutation({
        variables: {
          id: Number(tomatoDetails.id),
          activeTask: Number(i),
        },
      });
      action.setActiveTask(i);
      action.updateTaskStatus(i, "Started");
      updateTaskStatusMutation({
        variables: {
          id: Number(i),
          taskStatus: "Started",
          completedOn: null,
        },
      });
    } else {
      action.updateTaskStatus(i, "Not started");
      updateTaskStatusMutation({
        variables: {
          id: Number(i),
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
      action.setActiveTask(-1);
    }
  };
  const handleDelete = (i) => {
    if (Number(tomatoDetails.activeTask) === Number(i)) {
      action.setActiveTask(-1);
      updateActiveTaskMutation({
        variables: {
          id: Number(tomatoDetails.id),
          activeTask: -1,
        },
      });
    }
    deleteTaskMutation({
      variables: {
        id: Number(i),
      },
    });
    action.deleteTask(i);
  };

  return (
    <div className={styles.displaytask}>
      {tasksLoading ? (
        <Loader />
      ) : (
        <>
          {filteredList.map((item) => {
            return (
              <div key={item.id} className={styles.taskitem}>
                <strong>{item.title}</strong>
                <p>{item.description}</p>
                <span>
                  Due Date:{" "}
                  {new Date(
                    Number(item.dueDate) - new Date().getTimezoneOffset()
                  ).toLocaleDateString()}
                </span>
                <button
                  className={styles.playbutton}
                  disabled={item.taskStatus === "Completed"}
                  onClick={(e) => handlePlay(item.id, e)}
                >
                  {item.taskStatus === "Not started" ? (
                    <Link href="/pomo" className={styles.playA}>
                      <HiPlay />
                    </Link>
                  ) : item.taskStatus === "Started" ? (
                    <HiPause />
                  ) : (
                    <HiCheckCircle />
                  )}
                </button>

                <button
                  className={styles.deletebutton}
                  onClick={() => handleDelete(item.id)}
                >
                  <AiFillDelete />
                </button>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

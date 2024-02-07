import { useRouter } from "next/router";
import React from "react";
import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { ApolloError, gql, useMutation, useQuery } from "@apollo/client";
import * as Query from "@/Data/clientQueries";
export const TaskContext = React.createContext();
export default function AppContent({ Component, pageProps }) {
  const { user } = useUser();
  const [email, setEmail] = useState(null);
  const getTasks = useQuery(Query.ALL_TASKS, {
    variables: { email },
    skip: email === null,
  }).data;
  const getTimerSettings = useQuery(Query.TIMER_SETTINGS, {
    variables: { email },
    skip: email === null,
  }).data;
  const getTomatoDetails = useQuery(Query.TOMATO_DETAILS, {
    variables: { email },
    skip: email === null,
  }).data;
  const tasksLoading = email === null ? true : getTasks?.loading;
  const timerSettingsLoading =
    email === null ? true : getTimerSettings?.loading;
  const tomatoDetailsLoading =
    email === null ? true : getTomatoDetails?.loading;

  const [updateWeeklyTomatoMutation] = useMutation(
    Query.UPDATE_WEEKLY_TOMATO_MUTATION
  );
  const [updateTaskTomatoMutation] = useMutation(
    Query.UPDATE_TAST_TOMATO_MUTATION
  );
  const [taskData, setTaskData] = useState({
    taskList: [],
    tomatoDetails: {},
    filters: {
      taskStat: "",
      sortdate: "",
      sortday: "",
    },
    timerSettings: {},
    action: {
      addtask: (item) => {
        setTaskData((prev) => ({
          ...prev,
          taskList: [...prev.taskList, item],
        }));
      },
      updateTaskStatus: (id, status) => {
        setTaskData((prev) => {
          let i = prev.taskList.findIndex(
            (item) => Number(item.id) === Number(id)
          );
          let temp = [...prev.taskList];
          temp[i] = { ...temp[i], taskStatus: status };
          if (status === "Completed")
            temp[i].completedOn = String(new Date().getTime());
          return { ...prev, taskList: temp };
        });
      },
      deleteTask: (id) => {
        setTaskData((prev) => {
          let i = prev.taskList.findIndex(
            (item) => Number(item.id) === Number(id)
          );
          let temp = [...prev.taskList];
          temp.splice(i, 1);
          return { ...prev, taskList: temp };
        });
      },
      modifyFilter: (filterSettings) => {
        setTaskData((prev) => ({ ...prev, filters: filterSettings }));
      },
      setActiveTask: (id) => {
        setTaskData((prev) => {
          let temp = { ...prev.tomatoDetails };
          temp.activeTask = id;
          return { ...prev, tomatoDetails: temp };
        });
      },
      incrementTomato: () => {
        setTaskData((prev) => {
          let temp = JSON.parse(JSON.stringify(prev.taskList)),
            temp2 = JSON.parse(JSON.stringify(prev.tomatoDetails));
          let diff = Math.floor(
            (new Date() - temp2.currentDate) / (24 * 60 * 60 * 1000)
          );
          let today = new Date();
          today.setHours(0, 0, 0, 0);
          today = today.getTime();
          let i = prev.taskList.findIndex(
            (item) => Number(item.id) === Number(prev.tomatoDetails.activeTask)
          );
          if (diff === 0) {
            temp2.weeklyTomato[0] = temp2.weeklyTomato[0] + 1;
            temp2.weeklyFocusTime[0] += prev.timerSettings.pomodoro;
            temp[i].tomato += 1;
            updateWeeklyTomatoMutation({
              variables: {
                id: Number(temp2.id),
                weeklyTomato: temp2.weeklyTomato,
                weeklyFocusTime: temp2.weeklyFocusTime,
              },
            });
          } else {
            temp2.currentDate = String(today);
            temp2.weeklyTomato.splice(6, 1);
            temp2.weeklyTomato.unshift(1);
            temp2.weeklyFocusTime.splice(6, 1);
            temp2.weeklyFocusTime.unshift(prev.timerSettings.pomodoro);
            temp[i].tomato += 1;
            updateWeeklyTomatoMutation({
              variables: {
                id: Number(temp2.id),
                currentDate: new Date(today).toISOString(),
                weeklyTomato: temp2.weeklyTomato,
                weeklyFocusTime: temp2.weeklyFocusTime,
              },
            });
          }
          updateTaskTomatoMutation({
            variables: {
              id: Number(temp[i].id),
              tomato: Number(temp[i].tomato),
            },
          });
          return {
            ...prev,
            taskList: temp,
            tomatoDetails: temp2,
          };
        });
      },
      updateTimerSettings: (val) => {
        setTaskData((prev) => ({ ...prev, timerSettings: val }));
      },
    },
  });
  useEffect(() => {
    if (user) {
      setEmail(user.email); // Set the email once the user is available
    }
  }, [user]);
  useEffect(() => {
    if (getTasks) {
      setTaskData((prev) => {
        return {
          ...prev,
          taskList: getTasks.tasksByEmail,
        };
      });
    }
  }, [getTasks]);
  useEffect(() => {
    if (getTimerSettings) {
      setTaskData((prev) => {
        return {
          ...prev,
          timerSettings: getTimerSettings.timerSettingsByEmail[0],
        };
      });
    }
  }, [getTimerSettings]);
  useEffect(() => {
    if (getTomatoDetails) {
      setTaskData((prev) => {
        return {
          ...prev,
          tomatoDetails: getTomatoDetails.tomatoDetailsByEmail[0],
        };
      });
    }
  }, [getTomatoDetails]);
  return (
    <TaskContext.Provider value={taskData}>
      <Component
        {...pageProps}
        tasksLoading={tasksLoading}
        timerSettingsLoading={timerSettingsLoading}
        tomatoDetailsLoading={tomatoDetailsLoading}
      />
    </TaskContext.Provider>
  );
}

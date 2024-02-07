import { gql } from "@apollo/client";
export const ALL_TASKS = gql`
  query GetTasks($email: String!) {
    tasksByEmail(email: $email) {
      title
      description
      completedOn
      createDate
      dueDate
      estTomato
      id
      taskStatus
      tomato
    }
  }
`;
export const TIMER_SETTINGS = gql`
  query GetTimerSettings($email: String!) {
    timerSettingsByEmail(email: $email) {
      autoStart
      id
      longBreak
      pomoTechnique
      pomodoro
      shortBreak
    }
  }
`;
export const TOMATO_DETAILS = gql`
  query GetTomatoDetails($email: String!) {
    tomatoDetailsByEmail(email: $email) {
      activeTask
      currentDate
      id
      weeklyFocusTime
      weeklyTomato
    }
  }
`;
export const CREATE_TASK_MUTATION = gql`
  mutation CreateTask(
    $description: String!
    $dueDate: String!
    $email: String!
    $estTomato: Int!
    $title: String!
    $taskStatus: String
    $completedOn: String
  ) {
    createTask(
      description: $description
      dueDate: $dueDate
      email: $email
      estTomato: $estTomato
      title: $title
      taskStatus: $taskStatus
      completedOn: $completedOn
    ) {
      id
    }
  }
`;
export const DELETE_TASK_MUTATION = gql`
  mutation DeleteTask($id: Int!) {
    deleteTask(id: $id) {
      id
    }
  }
`;
export const UPDATE_TIMERSETTING_MUTATION = gql`
  mutation UpdateTimerSetting(
    $id: Int!
    $pomodoro: Int!
    $shortBreak: Int!
    $longBreak: Int!
    $pomoTechnique: Boolean!
    $autoStart: Boolean!
  ) {
    updateTimerSetting(
      id: $id
      pomodoro: $pomodoro
      shortBreak: $shortBreak
      longBreak: $longBreak
      pomoTechnique: $pomoTechnique
      autoStart: $autoStart
    ) {
      id
    }
  }
`;
export const UPDATE_TASK_STATUS_MUTATION = gql`
  mutation UpdateTaskStatus(
    $id: Int!
    $taskStatus: String!
    $completedOn: String
  ) {
    updateTaskStatus(
      id: $id
      taskStatus: $taskStatus
      completedOn: $completedOn
    ) {
      id
    }
  }
`;
export const UPDATE_ACTIVE_TASK_MUTATION = gql`
  mutation UpdateActiveTask($id: Int!, $activeTask: Int!) {
    updateActiveTask(id: $id, activeTask: $activeTask) {
      id
    }
  }
`;
export const UPDATE_WEEKLY_TOMATO_MUTATION = gql`
  mutation UpdateWeeklyTomato(
    $id: Int!
    $currentDate: String
    $weeklyTomato: [Int!]!
    $weeklyFocusTime: [Int!]!
  ) {
    updateWeeklyTomato(
      id: $id
      currentDate: $currentDate
      weeklyTomato: $weeklyTomato
      weeklyFocusTime: $weeklyFocusTime
    ) {
      id
    }
  }
`;
export const UPDATE_TAST_TOMATO_MUTATION = gql`
  mutation UpdateTaskTomato($id: Int!, $tomato: Int!) {
    updateTaskTomato(id: $id, tomato: $tomato) {
      id
    }
  }
`;

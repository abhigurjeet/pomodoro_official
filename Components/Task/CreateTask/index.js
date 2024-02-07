import styles from "@/src/styles/Task.module.css";
import { useState, useContext, useRef } from "react";
import { TaskContext } from "@/Components/AppContent";
import { useUser } from "@auth0/nextjs-auth0/client";
import { CREATE_TASK_MUTATION } from "@/Data/clientQueries";
import { useMutation } from "@apollo/client";
import { Toaster, toast } from "react-hot-toast";
export default function CreateTask() {
  const { user } = useUser();
  const [createTaskMutation] = useMutation(CREATE_TASK_MUTATION);
  const { action } = useContext(TaskContext);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const dueDateRef = useRef(null);
  const estTomatoRef = useRef(0);
  const handleKeyDown = (e) => {
    if (
      e.key === "." ||
      e.key === "+" ||
      e.key === "-" ||
      (e.key === "0" && e.target.value.length === 0)
    )
      e.preventDefault();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let taskDetails = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      dueDate: String(new Date(dueDateRef.current.value).getTime()),
      estTomato: estTomatoRef.current.value,
      tomato: 0,
      createDate: String(new Date().getTime()),
      completedOn: null,
      taskStatus: "Not started",
    };
    if (
      taskDetails.title.trim().length &&
      taskDetails.description.trim().length &&
      Number(taskDetails.estTomato)
    ) {
      if (user) {
        const temp = await toast.promise(
          createTaskMutation({
            variables: {
              description: taskDetails.description,
              email: user.email,
              dueDate: new Date(dueDateRef.current.value).toISOString(),
              estTomato: Number(taskDetails.estTomato),
              title: taskDetails.title,
              taskStatus: taskDetails.taskStatus,
              completedOn: taskDetails.completedOn,
            },
          }),
          {
            loading: <b>Creating task...</b>,
            success: <b>Task created</b>,
            error: <b>Please try again. Slow internet connection.</b>,
          }
        );
        action.addtask({ ...taskDetails, ...temp.data.createTask });
      }
    } else {
      toast.error("Please enter all the details to create task");
    }
    titleRef.current.value = "";
    descriptionRef.current.value = "";
    estTomatoRef.current.value = 1;
  };
  return (
    <div className={styles.createtask}>
      <form>
        <input type="text" ref={titleRef} placeholder="Title" />
        <br />
        <input
          className={styles.description}
          type="text"
          ref={descriptionRef}
          placeholder="Description"
        />
        <br />
        <input
          type="date"
          ref={dueDateRef}
          min={new Date().toISOString().split("T")[0]}
          defaultValue={new Date().toISOString().split("T")[0]}
        />
        <br />
        <input
          type="number"
          ref={estTomatoRef}
          onKeyDown={handleKeyDown}
          placeholder="Est. tomato required"
        />
        <br />
        <button type="submit" onClick={handleSubmit}>
          Create <br />
          task
        </button>
      </form>
      <Toaster />
    </div>
  );
}

import Navbar from "@/Components/NavBar/index";
import TimerSection from "@/Components/Pomo/TimerSection";
import ActiveTask from "@/Components/Pomo/ActiveTask";
import styles from "@/src/styles/Pomo.module.css";
import { useContext, useEffect } from "react";
import { AiFillLock } from "react-icons/ai";
import Loader from "@/Components/Loader";
export default function Pomo() {
  return (
    <div>
      <Navbar />
      <TimerSection />
      <ActiveTask />
    </div>
  );
}

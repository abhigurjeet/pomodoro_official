import styles from "@/src/styles/Navbar.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { BiTimeFive } from "react-icons/bi";
import { FaTasks, FaChartBar } from "react-icons/fa";
import { MdOutlineSettings } from "react-icons/md";

export default function NavBar() {
  const router = useRouter();
  const { pathname } = router;

  return (
    <div className={styles.header}>
      <Link href="/pomo">
        <h1>Pomodoro</h1>
      </Link>
      <div className={styles.navbar}>
        <Link
          href="/pomo"
          className={pathname === "/pomo" ? styles.active : styles.inactive}
        >
          <h3>
            <BiTimeFive />
          </h3>
        </Link>

        <Link
          href="/task"
          className={pathname === "/task" ? styles.active : styles.inactive}
        >
          <h3>
            <FaTasks />
          </h3>
        </Link>

        <Link
          href="/analytics"
          className={pathname === "/analytics" ? styles.active : styles.inactive}
        >
          <h3>
            <FaChartBar />
          </h3>
        </Link>

        <Link
          href="/settings"
          className={pathname === "/settings" ? styles.active : styles.inactive}
        >
          <h3>
            <MdOutlineSettings />
          </h3>
        </Link>
      </div>
    </div>
  );
}

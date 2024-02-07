import styles from "@/src/styles/Home.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import NavBar from "../NavBar";
import Loader from "../Loader";
export default function HomePage() {
  const images = ["pomo", "task", "analytics", "settings"];
  const [imageNum, setimageNum] = useState(0);
  const { isLoading, error, user } = useUser();
  const router = useRouter();
  const [activeButton, setActiveButton] = useState("Login");
  user ? router.push("/task") : <Link href="/api/auth/login">Login</Link>;
  const handleOnClick = () => {
    setimageNum((prev) => (prev + 1) % 4);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setimageNum((prev) => (prev + 1) % 4);
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <>
      {!user && !isLoading ? (
        <div className={styles.homePage}>
          <img
            className={styles.beeImage}
            src="https://uploads.codesandbox.io/uploads/user/541ac0af-b9c9-4abe-9ab4-20452cf618d1/xBU2-bee2.0.png"
            alt="bee"
          ></img>
          <div>
            <div className={styles.heading1}>A New Way To Focus</div>
            <div className={styles.heading2}>THE POMODORO </div>
          </div>
          <div className={styles.middleSection}>
            <div className={styles.carousel}>
              <img
                src={`/images/${images[imageNum]}.png`}
                onClick={handleOnClick}
              />
              <div className={styles.dots}>
                <hr
                  className={
                    Number(imageNum) === Number(0)
                      ? styles.activeDot
                      : styles.inActiveDot
                  }
                />
                <hr
                  className={
                    Number(imageNum) === Number(1)
                      ? styles.activeDot
                      : styles.inActiveDot
                  }
                />
                <hr
                  className={
                    Number(imageNum) === Number(2)
                      ? styles.activeDot
                      : styles.inActiveDot
                  }
                />
                <hr
                  className={
                    Number(imageNum) === Number(3)
                      ? styles.activeDot
                      : styles.inActiveDot
                  }
                />
              </div>
            </div>
            <div className={styles.pomoLinks}>
              <a
                href="https://en.wikipedia.org/wiki/Pomodoro_Technique"
                target="_blank"
              >
                {" "}
                What is POMODORO Technique{" "}
              </a>

              <a href="https://youtu.be/1tSw4z3eA_8" target="_blank">
                {" "}
                How to use POMODORO Technique{" "}
              </a>
              <button>
                <a href="/api/auth/login">Sign in</a>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <NavBar />
          <Loader />
        </>
      )}
    </>
  );
}

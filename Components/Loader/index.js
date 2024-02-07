import ReactLoading from "react-loading";
import styles from "@/src/styles/Home.module.css";
export default function Loader() {
  return (
    <ReactLoading
      className={styles.loader}
      type={"bubbles"}
      color={"#f5ba13"}
    />
  );
}

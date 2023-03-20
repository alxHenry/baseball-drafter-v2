import DraftConfig from "./components/DraftConfig";
import SetupLoadButton from "./components/SetupLoadButton";
import styles from "./Setup.module.css";

export default async function Page() {
  return (
    <>
      <h1 className={styles.header}>Setup your Draft</h1>
      <div>
        <div className={styles.navbar}>
          <div></div>
          <div><SetupLoadButton /></div>
        </div>
        <DraftConfig />
      </div>
    </>
  );
}

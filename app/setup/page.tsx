import DraftConfig from "./components/DraftConfig";
import styles from "./Setup.module.css";

export default async function Page() {
  return (
    <>
      <h1 className={styles.header}>Setup your Draft</h1>
      <div>
        <DraftConfig />
      </div>
    </>
  );
}

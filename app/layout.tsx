import React from "react";
import styles from "./App.module.css";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={styles.body}>
        <main className={styles.main}>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;

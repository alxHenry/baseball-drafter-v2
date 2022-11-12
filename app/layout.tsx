import React from "react";
import styles from "./App.module.css";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={styles.body}>
        <nav className={styles.nav}>Nav</nav>
        <main className={styles.main}>{children}</main>
        <footer className={styles.footer}>Footer</footer>
      </body>
    </html>
  );
};

export default RootLayout;

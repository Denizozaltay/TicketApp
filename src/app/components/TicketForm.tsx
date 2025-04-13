"use client";

import React from "react";
import styles from "./TicketForm.module.css";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export default function TicketForm() {
  return (
    <>
      <div className={`${styles.container} ${roboto.className}`}>
        <div className={styles.allDone}>
          <p className={styles.finishTitle}>All Done!</p>
          <p>We got your message.</p>
          <p>Our agents will reach you soon.</p>
        </div>
        <div className={styles.content}>
          <div className={styles.title}>
            <p className={styles.texttitle}>Share your thoughts with us!</p>
          </div>
          <div className={styles.inputcard}>
            <div className={styles.card}>
              <p className={styles.personal}>Personal Info</p>
              <div className={styles.namebox}>
                <label htmlFor="name">Your full name</label>
                <textarea
                  id="name"
                  className={styles.name}
                  rows={1}
                  placeholder="John Doe"
                />
              </div>
              <div className={styles.messagebox}>
                <label htmlFor="description">Your message</label>
                <textarea
                  id="description"
                  className={styles.message}
                  cols={30}
                  rows={8}
                  placeholder="I want the feature about..."
                />
              </div>
              <div className={styles.button}>
                <button id="send">Send</button>
              </div>
            </div>
          </div>
          <footer className={styles.footer}></footer>
        </div>
      </div>
    </>
  );
}

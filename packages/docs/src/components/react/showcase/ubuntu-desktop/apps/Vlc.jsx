import React from "react";
import styles from "./vlc.module.css";

export default function Vlc() {
  return (
    <div style={{ zIndex: "999" }}>
      <iframe
        className={styles.youtubeVideo}
        src="https://www.youtube.com/embed/b7TBfHsE8zo?autoplay=1&showinfo=0&controls=0&mute=1"
        title="Chris Chann: Amazing Flatground Skateboarding"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
      <div className={styles.overlay}></div>
    </div>
  );
}

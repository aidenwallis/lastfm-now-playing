import { useState } from "react";
import styles from "./index.module.css";
import step1 from "./images/step1.png";
import step2 from "./images/step2.png";

export function Welcome() {
  const [username, setUsername] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    !!username && setSubmitted(true);
  };

  const renderForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className={styles.introText}>
          <p className={styles.formIntro}>
            We use{" "}
            <a href="https://last.fm" target="_blank" rel="noopener noreferrer">
              last.fm
            </a>{" "}
            to find playing tracks.
          </p>
          <p className={styles.introSubtext}>
            Click{" "}
            <a href="https://www.last.fm/about/trackmymusic" target="_blank" rel="noopener noreferrer">
              here
            </a>{" "}
            to connect your music platform.
          </p>
        </div>
        <div className={styles.formRow}>
          <input
            type="text"
            value={username}
            className={styles.input}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your last.fm username"
            autoFocus
            required
          />
        </div>

        <button type="submit" className={[styles.submit, styles.button].join(" ")}>
          Generate
        </button>
      </form>
    );
  };

  const renderInstructions = () => {
    const overlayURL = window.location.origin + "/" + encodeURIComponent(username);

    return (
      <div>
        <a
          href="#"
          className={styles.back}
          onClick={(event) => {
            event.preventDefault();
            setSubmitted(false);
          }}
        >
          &lsaquo; Back
        </a>
        <div className={styles.url}>
          <div className={styles.formRow}>
            <p className={styles.formIntro}>Please add the following URL as a Browser Source on OBS:</p>
          </div>
          <div className={styles.urlContainer}>
            <code className={styles.urlText}>{overlayURL}</code>
            <button
              className={[styles.button, styles.copyButton].join(" ")}
              onClick={() => {
                navigator?.clipboard?.writeText?.(overlayURL);
                alert("Copied to Clipboard!");
              }}
            >
              Copy
            </button>
          </div>
        </div>
        <div className={styles.divider} />
        <div className={styles.stepByStep}>
          <ol>
            <li>
              <p>Open OBS, click the "+" in the Sources panel:</p>
              <a href={step1} target="_blank" rel="noopener noreferrer">
                <img src={step1} alt="Example of opening OBS' sources panel, and selecting Browser." />
              </a>
            </li>
            <li>
              <p>
                Set your <code>URL</code>, width to <code>350</code>, and height to <code>70</code>. Click{" "}
                <code>OK</code>:
              </p>
              <a href={step2} target="_blank" rel="noopener noreferrer">
                <img src={step2} height={180} alt="Example of correct browser source confgiuration" />
              </a>
            </li>
            <li>
              <p>Done!</p>
            </li>
          </ol>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={[styles.center, submitted ? styles.instructions : ""].filter(Boolean).join(" ")}>
        <div className={styles.content}>{submitted ? renderInstructions() : renderForm()}</div>
        <p className={styles.disclaimer}>Not affiliated with last.fm.</p>
      </div>
    </div>
  );
}

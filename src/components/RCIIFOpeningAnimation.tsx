import { useState, useEffect, useRef, useCallback } from "react";

interface Props {
  onComplete: () => void;
}

export default function RCIIFOpeningAnimation({ onComplete }: Props) {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<"loading" | "pause" | "exit" | "done">("loading");
  const frameRefs = useRef<number[]>([]);

  // Reduced motion — skip immediately
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onComplete?.();
    }
  }, [onComplete]);

  // Counter logic: 0→85 in 600ms, 85→100 in 200ms
  useEffect(() => {
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      let val: number;
      if (elapsed < 600) {
        val = Math.floor((elapsed / 600) * 85);
      } else {
        val = Math.min(100, 85 + Math.floor(((elapsed - 600) / 200) * 15));
      }
      setCount(val);
      if (val < 100) {
        frameRefs.current.push(requestAnimationFrame(tick));
      } else {
        setCount(100);
        setTimeout(() => setPhase("exit"), 200); // 200ms pause
      }
    };
    frameRefs.current.push(requestAnimationFrame(tick));
    return () => frameRefs.current.forEach(cancelAnimationFrame);
  }, []);

  // Exit complete → unmount
  useEffect(() => {
    if (phase === "exit") {
      const id = setTimeout(() => {
        setPhase("done");
        onComplete?.();
      }, 900);
      return () => clearTimeout(id);
    }
  }, [phase, onComplete]);

  if (phase === "done") return null;

  const isExiting = phase === "exit";
  const progress = count / 100;

  return (
    <>
      <style>{`
        .rl-wrap {
          position: fixed;
          inset: 0;
          z-index: 99999;
          overflow: hidden;
          pointer-events: all;
        }

        .rl-panel {
          position: absolute;
          left: 0; right: 0;
          background: #0F0E0C;
          transition: transform 900ms cubic-bezier(0.76, 0, 0.24, 1);
        }
        .rl-panel-top    { top: 0;    height: 50%; transform: translateY(0); }
        .rl-panel-bottom { bottom: 0; height: 50%; transform: translateY(0); }
        .rl-panel-top.exit    { transform: translateY(-100%); }
        .rl-panel-bottom.exit { transform: translateY(100%); }

        .rl-content {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 10;
          opacity: 1;
          transition: opacity 400ms ease;
          gap: 6px;
          padding: 0 24px;
          text-align: center;
        }
        .rl-content.exit { opacity: 0; }

        .rl-eyebrow {
          font-family: 'JetBrains Mono', monospace;
          font-size: clamp(7px, 1.1vw, 9px);
          font-weight: 300;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(196,154,44,0.55);
          clip-path: inset(0 0 100% 0);
          animation: rlWipeUp 500ms cubic-bezier(0.76,0,0.24,1) 300ms forwards;
          margin-bottom: 16px;
        }

        .rl-wordmark {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(4rem, 12vw, 9rem);
          letter-spacing: 0.18em;
          color: #F0EBD8;
          line-height: 1;
          clip-path: inset(0 0 100% 0);
          animation: rlWipeUp 700ms cubic-bezier(0.76,0,0.24,1) 450ms forwards;
        }

        .rl-descriptor {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 300;
          font-size: clamp(0.85rem, 2vw, 1.15rem);
          color: rgba(240,235,216,0.45);
          clip-path: inset(0 0 100% 0);
          animation: rlWipeUp 500ms cubic-bezier(0.76,0,0.24,1) 650ms forwards;
          margin-top: 8px;
        }

        @keyframes rlWipeUp {
          from { clip-path: inset(0 0 100% 0); }
          to   { clip-path: inset(0 0 0% 0); }
        }

        .rl-bottom {
          position: absolute;
          bottom: 28px;
          left: 36px;
          right: 36px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          z-index: 10;
          opacity: 1;
          transition: opacity 400ms ease;
        }
        .rl-bottom.exit { opacity: 0; }

        .rl-dpiit {
          font-family: 'JetBrains Mono', monospace;
          font-weight: 300;
          font-size: 8px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(196,154,44,0.6);
          opacity: 0;
          animation: rlFadeIn 400ms ease 700ms forwards;
        }

        .rl-counter {
          font-family: 'JetBrains Mono', monospace;
          font-weight: 300;
          font-size: clamp(11px, 1.4vw, 14px);
          color: rgba(196,154,44,0.5);
          letter-spacing: 0.04em;
          min-width: 32px;
          text-align: right;
        }

        .rl-progress-track {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: rgba(240,235,216,0.06);
          z-index: 10;
          overflow: hidden;
        }
        .rl-progress-fill {
          height: 100%;
          background: rgba(196,154,44,0.35);
          transition: width 60ms linear;
        }

        @keyframes rlFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        @media (max-width: 480px) {
          .rl-bottom { left: 20px; right: 20px; bottom: 20px; }
        }
      `}</style>

      <div className="rl-wrap">
        <div className={`rl-panel rl-panel-top ${isExiting ? "exit" : ""}`} />
        <div className={`rl-panel rl-panel-bottom ${isExiting ? "exit" : ""}`} />

        <div className={`rl-content ${isExiting ? "exit" : ""}`}>
          <div className="rl-eyebrow">Kharghar · Navi Mumbai · Est. 2022</div>
          <div className="rl-wordmark">RCIIF</div>
          <div className="rl-descriptor">Innovation &amp; Incubation Foundation</div>
        </div>

        <div className={`rl-bottom ${isExiting ? "exit" : ""}`}>
          <div className="rl-dpiit">DPIIT Recognised</div>
          <div className="rl-counter">{String(count).padStart(2, "0")}</div>
        </div>

        <div className="rl-progress-track">
          <div className="rl-progress-fill" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>
    </>
  );
}

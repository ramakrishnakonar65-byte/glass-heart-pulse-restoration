import { useState, useEffect, useRef } from "react";

interface Props {
  onComplete: () => void;
}

type Phase = "loading" | "freeze" | "exit" | "done";

export default function RCIIFOpeningAnimation({ onComplete }: Props) {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<Phase>("loading");
  const frameRefs = useRef<number[]>([]);

  // Skip for reduced motion
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onComplete?.();
    }
  }, [onComplete]);

  // Counter: 0→100, then freeze, then exit
  useEffect(() => {
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      let val: number;
      if (elapsed < 650) {
        val = Math.floor((elapsed / 650) * 85);
      } else {
        val = Math.min(100, 85 + Math.floor(((elapsed - 650) / 200) * 15));
      }
      setCount(val);
      if (val < 100) {
        frameRefs.current.push(requestAnimationFrame(tick));
      } else {
        setCount(100);
        // Freeze phase: 300ms pause, then exit
        setTimeout(() => setPhase("freeze"), 50);
        setTimeout(() => setPhase("exit"), 350);
      }
    };
    frameRefs.current.push(requestAnimationFrame(tick));
    return () => frameRefs.current.forEach(cancelAnimationFrame);
  }, []);

  // Exit → done
  useEffect(() => {
    if (phase === "exit") {
      const id = setTimeout(() => {
        setPhase("done");
        onComplete?.();
      }, 1000);
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
          transition: transform 950ms cubic-bezier(0.76, 0, 0.24, 1);
          will-change: transform;
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
          gap: 6px;
          padding: 0 24px;
          text-align: center;
          pointer-events: none;
        }

        .rl-eyebrow {
          font-family: 'JetBrains Mono', monospace;
          font-size: clamp(7px, 1.1vw, 9px);
          font-weight: 300;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(196,154,44,0.6);
          clip-path: inset(0 0 100% 0);
          animation: rlWipeUp 500ms cubic-bezier(0.76,0,0.24,1) 400ms forwards;
          margin-bottom: 20px;
          transition: opacity 200ms ease;
        }
        .rl-eyebrow.exit { opacity: 0; }

        .rl-wordmark {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(5rem, 14vw, 11rem);
          letter-spacing: 0.2em;
          color: #F0EBD8;
          line-height: 1;
          clip-path: inset(0 0 100% 0);
          animation: rlWipeUp 750ms cubic-bezier(0.76,0,0.24,1) 550ms forwards;
          transform-origin: center center;
          transition:
            transform 950ms cubic-bezier(0.76, 0, 0.24, 1),
            opacity 600ms cubic-bezier(0.76, 0, 0.24, 1);
          will-change: transform, opacity;
        }
        .rl-wordmark.exit {
          transform: scale(7) translateY(-2%);
          opacity: 0;
          clip-path: none;
        }

        .rl-descriptor {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 300;
          font-size: clamp(0.85rem, 2vw, 1.15rem);
          color: rgba(240,235,216,0.45);
          clip-path: inset(0 0 100% 0);
          animation: rlWipeUp 500ms cubic-bezier(0.76,0,0.24,1) 750ms forwards;
          margin-top: 10px;
          transition: opacity 200ms ease;
        }
        .rl-descriptor.exit { opacity: 0; }

        .rl-bottom {
          position: absolute;
          bottom: 28px;
          left: 36px;
          right: 36px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          z-index: 10;
          transition: opacity 200ms ease;
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
          animation: rlFadeIn 400ms ease 600ms forwards;
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
          transition: opacity 200ms ease;
        }
        .rl-progress-track.exit { opacity: 0; }

        .rl-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, rgba(196,154,44,0.2), rgba(196,154,44,0.5));
          transition: width 60ms linear;
        }

        @keyframes rlWipeUp {
          from { clip-path: inset(0 0 100% 0); }
          to   { clip-path: inset(0 0 0% 0); }
        }
        @keyframes rlFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        @media (max-width: 480px) {
          .rl-bottom { left: 20px; right: 20px; bottom: 20px; }
          .rl-wordmark.exit { transform: scale(4); }
        }
      `}</style>

      <div className="rl-wrap">
        {/* Split curtain panels */}
        <div className={`rl-panel rl-panel-top ${isExiting ? "exit" : ""}`} />
        <div className={`rl-panel rl-panel-bottom ${isExiting ? "exit" : ""}`} />

        {/* Centre: eyebrow + wordmark + descriptor */}
        <div className="rl-content">
          <div className={`rl-eyebrow ${isExiting ? "exit" : ""}`}>
            Kharghar · Navi Mumbai · Est. 2022
          </div>
          <div className={`rl-wordmark ${isExiting ? "exit" : ""}`}>
            RCIIF
          </div>
          <div className={`rl-descriptor ${isExiting ? "exit" : ""}`}>
            Innovation &amp; Incubation Foundation
          </div>
        </div>

        {/* Bottom bar */}
        <div className={`rl-bottom ${isExiting ? "exit" : ""}`}>
          <div className="rl-dpiit">DPIIT Recognised</div>
          <div className="rl-counter">{String(count).padStart(2, "0")}</div>
        </div>

        {/* Progress line */}
        <div className={`rl-progress-track ${isExiting ? "exit" : ""}`}>
          <div className="rl-progress-fill" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>
    </>
  );
}

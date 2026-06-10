// web/frontend/components/shared/loading-spinner.tsx

export function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center gap-8 ${className}`}>
      {/* Inject custom CSS keyframes */}
      <style>{`
        @keyframes morph {
          0%, 100% {
            border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
            transform: rotate(0deg);
          }
          50% {
            border-radius: 70% 30% 52% 48% / 60% 40% 60% 40%;
            transform: rotate(180deg);
          }
        }
        @keyframes morph-reverse {
          0%, 100% {
            border-radius: 70% 30% 52% 48% / 60% 40% 60% 40%;
            transform: rotate(360deg);
          }
          50% {
            border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
            transform: rotate(180deg);
          }
        }
        @keyframes glitch {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 0.4; }
        }
        @keyframes loading-bar {
          0% { left: -40%; }
          50% { width: 60%; }
          100% { left: 100%; }
        }
      `}</style>

      <div className="relative w-20 h-20 flex items-center justify-center">
        {/* Outer glowing morphing ring */}
        <div 
          className="absolute inset-0 border-2 border-[var(--accent-primary)] opacity-80"
          style={{
            animation: "morph 4s ease-in-out infinite",
            filter: "drop-shadow(0 0 8px rgba(var(--accent-primary-rgb), 0.4))",
          }}
        />

        {/* Inner morphing ring rotating opposite */}
        <div 
          className="absolute w-12 h-12 border border-blue-400 opacity-60"
          style={{
            animation: "morph-reverse 3s ease-in-out infinite",
            filter: "drop-shadow(0 0 6px rgba(96, 165, 250, 0.3))",
          }}
        />

        {/* Center pulsing core container */}
        <div className="w-4 h-4 rounded-full bg-[var(--accent-primary)] animate-pulse shadow-[0_0_15px_rgba(var(--accent-primary-rgb),0.6)]" />
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="text-[10px] font-black tracking-[0.3em] uppercase flex items-center gap-1">
          <span style={{ color: "var(--accent-primary)", animation: "glitch 2s infinite" }}>
            Loading
          </span>
          <span className="text-foreground opacity-80">Environment</span>
        </div>
        <div className="w-16 h-1 rounded-full bg-muted border border-border overflow-hidden relative">
          <div 
            className="absolute top-0 bottom-0 rounded-full"
            style={{
              backgroundColor: "var(--accent-primary)",
              width: "40%",
              left: "-40%",
              animation: "loading-bar 1.5s infinite ease-in-out",
            }}
          />
        </div>
      </div>
    </div>
  );
}
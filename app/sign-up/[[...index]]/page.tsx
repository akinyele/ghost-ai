import { SignUp } from "@clerk/nextjs";
import { Cpu, Users, FileCode } from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex" style={{ fontFamily: "var(--font-geist-sans)" }}>
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12" style={{ backgroundColor: "var(--bg-subtle)" }}>
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: "var(--accent-primary)" }}
          >
            <span style={{ color: "var(--bg-base)", fontSize: "14px", fontWeight: 700 }}>G</span>
          </div>
          <span style={{ color: "var(--text-primary)", fontWeight: 600, fontSize: "15px" }}>Ghost AI</span>
        </div>

        {/* Headline + subtext */}
        <div className="space-y-5">
          <h1
            style={{
              color: "var(--text-primary)",
              fontSize: "2.5rem",
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            Design systems at the speed of thought.
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9375rem", lineHeight: 1.65, maxWidth: "38ch" }}>
            Describe your architecture in plain English. Ghost AI maps it to a shared canvas your whole team can refine in real time.
          </p>

          {/* Feature list */}
          <div className="space-y-5 pt-2">
            <FeatureRow
              icon={<Cpu className="h-4 w-4" />}
              iconColor="#00c8d4"
              title="AI Architecture Generation"
              description="Describe your system, AI maps it to nodes and edges on a live canvas."
            />
            <FeatureRow
              icon={<Users className="h-4 w-4" />}
              iconColor="#6457f9"
              title="Real-time Collaboration"
              description="Live cursors, presence indicators, and shared node editing across your team."
            />
            <FeatureRow
              icon={<FileCode className="h-4 w-4" />}
              iconColor="#34d399"
              title="Instant Spec Generation"
              description="Export a complete Markdown technical spec directly from the canvas graph."
            />
          </div>
        </div>

        <p style={{ color: "var(--text-faint)", fontSize: "0.75rem" }}>
          © 2026 Ghost AI. All rights reserved.
        </p>
      </div>

      {/* Right panel */}
      <div
        className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12"
        style={{ backgroundColor: "var(--bg-base)" }}
      >
        <div className="w-full max-w-md">
          <SignUp />
        </div>
      </div>
    </div>
  );
}

function FeatureRow({
  icon,
  iconColor,
  title,
  description,
}: {
  icon: React.ReactNode;
  iconColor: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-3.5">
      <div
        className="mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${iconColor}1a`, color: iconColor }}
      >
        {icon}
      </div>
      <div>
        <p style={{ color: "var(--text-primary)", fontWeight: 500, fontSize: "0.875rem" }}>{title}</p>
        <p style={{ color: "var(--text-muted)", fontSize: "0.8125rem", marginTop: "2px", lineHeight: 1.5 }}>
          {description}
        </p>
      </div>
    </div>
  );
}

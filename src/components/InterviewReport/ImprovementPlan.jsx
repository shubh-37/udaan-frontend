import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Stepper, Step, StepLabel } from "@mui/material";
import { motion, AnimatePresence } from 'framer-motion';
import { Lock } from 'lucide-react';

const improvementPhases = [
  {
    title: "Foundational Enhancements (1-2 Weeks)",
    steps: [
      {
        label: "Strengthen Technical Depth",
        description: [
          "Study real-world system architectures (e.g., Netflix scalability)",
          "Explain trade-offs in database & API decisions",
          "Break down two technical problems daily using a whiteboard approach",
        ],
        resources: [
          "Book: 'Designing Data-Intensive Applications' - Martin Kleppmann",
          "YouTube: System Design by Gaurav Sen",
        ],
      },
      {
        label: "Improve Resume Storytelling",
        description: [
          "Add 3 quantifiable achievements",
          "Bridge Resume & Interview by preparing story-based responses",
          "Use Challenge-Action-Result format for impact-driven answers",
        ],
        resources: ["Tool: ResyMatch.io - Resume ATS check"],
      },
    ],
  },
  {
    title: "Mid-Term Refinement (2-4 Weeks)",
    steps: [
      {
        label: "Mastering On-the-Spot Thinking",
        description: [
          "Use structured frameworks (ABCD - Answer, Breakdown, Conclusion, Details)",
          "Answer 5 random behavioral questions daily in under 60 seconds",
          "Conduct mock Q&A sessions with AI-generated tricky questions",
        ],
        resources: ["Tool: Google Interview Warmup - AI-driven question practice"],
      },
      {
        label: "Enhancing Communication & Confidence",
        description: [
          "Record & analyze 3-minute mock answers daily",
          "Use speech-to-text analysis to check filler words & pauses",
          "Mirror speaking styles of industry leaders (e.g., Sundar Pichai)",
        ],
        resources: ["Exercise: Power Posing - 2 minutes posture training"],
      },
    ],
  },
  {
    title: "Final Optimization & Mock Interviews (Week 4-6)",
    steps: [
      {
        label: "Realistic Interview Simulation",
        description: [
          "Take 2 full-length mock interviews per week",
          "Analyze weak points from past interview attempts",
          "Ensure final resume optimization with ATS compatibility",
        ],
        resources: [
          "Mock Platforms: Pramp (peer-to-peer) & Interviewing.io (professional)",
        ],
      },
    ],
  },
];

export default function PersonalizedImprovementPlan({isPremium}) {
  const [activePhase, setActivePhase] = useState(0);

  return (
    <Card className="relative overflow-hidden">
      <CardContent className="space-y-6">
        <AnimatePresence>
          {!isPremium && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 backdrop-blur-sm bg-card z-10"
            >
              <div className="flex flex-col items-center justify-center h-full space-y-4">
                <Lock className="w-12 h-12 text-muted-foreground" />
                <h3 className="text-xl font-semibold">Pay to unlock this detailed review</h3>
                <p className="text-sm text-muted-foreground text-center max-w-md">
                  Unlock interview transcripts, correct solutions, and tips on how to answer each question.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
    <div className="p-6 max-w-4xl mx-auto text-foreground">
      {/* <h2 className="text-3xl font-semibold text-center mb-6">
        Personalized Improvement Plan
      </h2> */}
      <Stepper activeStep={activePhase} alternativeLabel>
        {improvementPhases.map((phase, index) => (
          <Step key={index} onClick={() => setActivePhase(index)}>
            <StepLabel>{phase.title}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Card className="bg-card p-6 rounded-2xl shadow-lg mt-6">
        <CardContent>
          <h3 className="text-xl font-bold mb-3">
            {improvementPhases[activePhase].title}
          </h3>
          {improvementPhases[activePhase].steps.map((step, index) => (
            <div key={index} className="mb-4">
              <h4 className="text-lg font-semibold mb-2">{step.label}</h4>
              <ul className="text-sm list-disc ml-5">
                {step.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
              <p className="text-sm font-medium mt-2">Recommended Resources:</p>
              <ul className="text-sm list-disc ml-5">
                {step.resources.map((res, i) => (
                  <li key={i}>{res}</li>
                ))}
              </ul>
            </div>
          ))}
          
        </CardContent>
      </Card>
    </div>
    </CardContent>
    </Card>
  );
}

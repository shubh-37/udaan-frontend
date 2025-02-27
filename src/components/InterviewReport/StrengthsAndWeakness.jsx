import { Card, CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock } from 'lucide-react';

const feedback = {
  strengths: [
    {
      title: 'Clear & Structured Responses',
      description:
        'Your ability to articulate answers in a well-structured manner (especially when explaining technical concepts) is a standout strength. You effectively used the STAR method (Situation, Task, Action, Result) to explain past experiences, making your responses engaging and to the point.'
    },
    {
      title: 'Confidence & Professionalism',
      description:
        'Your tonality and engagement level indicate a strong presence in interviews. You maintained steady eye contact and avoided excessive filler words (uh, um), which is a key indicator of confidence.'
    },
    {
      title: 'Relevant Industry Experience',
      description:
        'Your past projects and internship experience aligned well with the job role. You effectively related real-world examples from your work to interview questions, making your answers authentic and practical rather than theoretical.'
    }
  ],
  weaknesses: [
    {
      title: 'Limited Depth in Technical Explanations',
      description:
        'While your communication is strong, certain answers lacked deep technical insights. For instance, in system design questions, your explanation focused more on high-level concepts rather than in-depth trade-offs (e.g., database choices, scaling strategies).'
    },
    {
      title: 'Missed Resume Optimization Opportunity',
      description:
        'Your resume mentions strong problem-solving skills, but there was no concrete example showcasing it in the interview. You also did not highlight key achievements that could differentiate you from other candidates.'
    },
    {
      title: 'Hesitation in Handling Unexpected Questions',
      description:
        'When faced with an unexpected situational question, there was a noticeable pause and hesitation before responding. This indicates a need to improve thinking on your feet.'
    }
  ]
};

export default function StrengthAndWeakness({isPremium}) {
  return (
    <Card className="relative overflow-hidden">
      <CardContent className="space-y-6">
        <AnimatePresence>
          {!isPremium && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 backdrop-blur-sm bg-card/80 z-10"
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
        <div>
          <h3 className="text-xl font-bold mb-4 text-green-600">Strengths</h3>
          {feedback.strengths.map((strength, index) => (
            <Card key={index} className="bg-green-200 p-6 dark:bg-green-800 rounded-2xl shadow-lg mb-4">
              <h4 className="text-lg font-bold mb-2">{strength.title}</h4>
              <p className="text-sm text-card-foreground">{strength.description}</p>
            </Card>
          ))}
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4 text-red-600">Weaknesses</h3>
          {feedback.weaknesses.map((weakness, index) => (
            <Card key={index} className="bg-red-300 dark:bg-red-800 p-6 rounded-2xl shadow-lg mb-4">
              <h4 className="text-lg font-bold mb-2">{weakness.title}</h4>
              <p className="text-sm text-card-foreground">{weakness.description}</p>
            </Card>
          ))}
        </div>
      </div>
      </CardContent>
    </Card>
  );
}

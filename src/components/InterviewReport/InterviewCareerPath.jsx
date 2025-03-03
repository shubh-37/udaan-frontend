import { Card, CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock } from 'lucide-react';
import { Meteors } from '../ui/meteors';
import { Grid } from '../GridCardPattern';


const careerPaths = [
  {
    title: 'Senior Software Architect',
    skillMatch: 92,
    color: 'orange',
    bestMatch: true,
    skills: ['Strong system design skills', 'Technical leadership potential', 'Excellent problem solving']
  },
  {
    title: 'Lead Backend Developer',
    skillMatch: 88,
    color: 'blue',
    bestMatch: false,
    skills: ['Strong backend expertise', 'Database optimization skills', 'Team collaboration']
  },
  {
    title: 'Technical Team Lead',
    skillMatch: 85,
    color: 'green',
    bestMatch: false,
    skills: ['Leadership qualities', 'Communication skills', 'Project management']
  }
];

export default function CareerPathRecommendations({ isPremium }) {
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

        <div className="p-6 max-w-6xl mx-auto text-foreground">
        <Meteors number={40} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {careerPaths.map((path, index) => (
              <Card key={`path-${index}`} className="relative bg-card p-6 rounded-2xl shadow-lg overflow-hidden">
                {path.bestMatch && (
                    <div className="absolute top-0 right-0 bg-orange-500 text-foreground text-xs px-2 py-1 rounded-bl rounded-tr">
                    Best Match
                  </div>
                )}
                <Grid size={20} />
                <h3 className="text-xl font-bold mb-3">{path.title}</h3>
                <div className="mb-4">
                  <p className="text-sm font-medium">Skill Match</p>
                  <div className="relative w-full bg-card h-2 rounded-full mt-1">
                    <div
                      className={`absolute top-0 left-0 h-full bg-${path.color}-500 rounded-full`}
                      style={{ width: `${path.skillMatch}%` }}
                    ></div>
                  </div>
                  <p className="text-sm mt-1">{path.skillMatch}%</p>
                </div>
                
                <ul className="text-sm space-y-1">
                  {path.skills.map((skill, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <span className="text-green-400">✔</span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
                
              </Card>
            ))}
          </div>
        </div>
       
      </CardContent>
    </Card>
  );
}

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { SparklesText } from '../magicui/sparkles-text';

const SkillAnalysis = ({ parameters }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="text-foreground">
      <SparklesText text='Skill Analysis' className='text-4xl font-bold pb-8'/>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {parameters.map((category, index) => (
          <div
            key={category.title}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="relative group p-2 rounded-xl"
          >
            <AnimatePresence>
              {hoveredIndex === index && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] rounded-xl"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.15 } }}
                  exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
                />
              )}
            </AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative z-10 bg-card p-6 rounded-xl shadow-lg border border-transparent overflow-hidden"
            >
              <h3
                className={`text-lg font-semibold mb-4 ${category.color ? `text-[${category.color}]` : 'text-gray-400'}`}
              >
                {category.title}
              </h3>
              {category.skills.map((skill) => (
                <div key={`skill-${skill.name}`} className="mb-2 bg-gray-100 rounded-lg p-4 dark:bg-gray-900">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{skill.name}</span>
                    <span className="text-sm font-semibold">{skill.score}</span>{' '}
                  </div>

                  {skill.showBar !== false && (
                    <div className="h-2 w-full bg-gray-100 rounded-md overflow-hidden mt-1">
                      <motion.div
                        className="h-full rounded-md"
                        style={{ background: category.color || 'white' }}
                        initial={{ width: '0%' }}
                        animate={{ width: `${skill.score}%` }}
                        transition={{ duration: 1.2, ease: 'easeInOut' }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillAnalysis;

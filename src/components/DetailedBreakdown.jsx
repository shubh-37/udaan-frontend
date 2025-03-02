"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DetailedBreakdown({ parameter }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{parameter.name} - Detailed Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div>
          <h3 className="font-semibold mb-2 text-green-600 dark:text-green-400">Key Strengths</h3>
          <ul className="list-disc list-inside space-y-1">
            {parameter.strengths.map((strength, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {strength}
              </motion.li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2 text-red-600 dark:text-red-400">Areas for Improvement</h3>
          <ul className="list-disc list-inside space-y-1">
            {parameter.weaknesses.map((weakness, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {weakness}
              </motion.li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2 text-blue-600 dark:text-blue-400">Recommendations</h3>
          <ul className="list-disc list-inside space-y-1">
            {parameter.improvements.map((improvement, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {improvement}
              </motion.li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

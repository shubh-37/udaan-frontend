"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ParameterScore({ parameter }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{parameter.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className={`absolute h-full ${parameter.color}`}
            initial={{ width: "0%" }}
            animate={{ width: `${parameter.score}%` }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        </div>
        <motion.p
          className="text-right mt-2 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {parameter.score}%
        </motion.p>
      </CardContent>
    </Card>
  );
}

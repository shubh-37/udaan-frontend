import { useState } from 'react';
import { motion } from 'framer-motion';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export default function ConfigModal({ onSubmit }) {
  const [subjects, setSubjects] = useState({
    verbal: false,
    quant: false,
    logical: false
  });
  const [acknowledged, setAcknowledged] = useState(false);

  const handleSubmit = () => {
    if (!Object.values(subjects).some(Boolean) || !acknowledged) {
      return;
    }
    onSubmit({ subjects });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 min-h-screen">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-lg">
        <Card className="w-full backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 border-t border-gray-200 dark:border-gray-800">
          <CardHeader>
            <CardTitle>Configure Your Aptitude Test</CardTitle>
            <CardDescription>Please select your subjects</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label>Select Subjects</Label>
              <div className="grid gap-4">
                {Object.entries({
                  verbal: 'Verbal & Reading Comprehension',
                  quant: 'Numerical Reasoning',
                  logical: 'Logical Reasoning'
                }).map(([key, label]) => (
                  <div key={key} className="flex items-center space-x-2 rounded-md border p-4">
                    <Checkbox
                      id={key}
                      checked={subjects[key]}
                      onCheckedChange={(checked) => setSubjects((prev) => ({ ...prev, [key]: checked }))}
                      className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                    <Label htmlFor={key}>{label}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2 rounded-md border p-4 bg-muted">
              <Checkbox
                id="acknowledge"
                checked={acknowledged}
                onCheckedChange={setAcknowledged}
                className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
              />
              <Label htmlFor="acknowledge" className="text-sm">
                I understand that once the test begins, I cannot pause or restart it. I will ensure I have a stable
                internet connection and will not refresh the page during the test.
              </Label>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleSubmit}
              className="w-full bg-blue-600"
              disabled={!Object.values(subjects).some(Boolean) || !acknowledged}
            >
              Continue to Test Selection
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}

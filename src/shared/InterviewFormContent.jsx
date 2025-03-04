import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { memo } from 'react';
import { Input } from '../components/ui/input';

function handleReviewResume(resume) {
  window.open(resume, '_blank');
}

const InterviewFormContent = memo(({ formData, readOnly }) => (
  <form className="space-y-6 p-6 rounded-lg bg-white dark:bg-gray-900">
    <div className="space-y-2">
      <Label htmlFor="field" className="text-sm font-medium dark:text-gray-200">
        Field
      </Label>
      <Input
        id="field"
        name="field"
        type="string"
        value={formData.field}
        readOnly={readOnly}
        className={`w-full border border-gray-200 dark:border-gray-600 bg-background dark:bg-gray-800 text-black dark:text-gray-200`}
      />
    </div>

    <div className="space-y-2">
      <Label htmlFor="job_role" className="text-sm font-medium dark:text-gray-200">
        Job Role
      </Label>
      <Input
        id="job_role"
        name="job_role"
        type="string"
        value={formData.job_role}
        readOnly={readOnly}
        className={`w-full border border-gray-200 dark:border-gray-600 bg-background dark:bg-gray-800 text-black dark:text-gray-200`}
      />
    </div>

    <div className="space-y-2">
      <Label htmlFor="yrs_of_exp" className="text-sm font-medium dark:text-gray-200">
        Overall Experience
      </Label>
      <Input
        id="yrs_of_exp"
        name="yrs_of_exp"
        type="number"
        value={formData.years_of_experience}
        readOnly={readOnly}
        className={`w-full border border-gray-200 dark:border-gray-600 bg-background dark:bg-gray-800 text-black dark:text-gray-200`}
      />
    </div>

    <div className="space-y-2">
      <Label htmlFor="organization" className="text-sm font-medium dark:text-gray-200">
        Organization
      </Label>
      <Input
        id="organization"
        name="organization"
        type="string"
        value={formData.organization}
        readOnly={readOnly}
        className={`w-full border border-gray-200 dark:border-gray-600 bg-background dark:bg-gray-800 text-black dark:text-gray-200`}
      />
    </div>

    <div className="space-y-2">
      <Label htmlFor="resume" className="text-sm font-medium dark:text-gray-200">
        Resume
      </Label>
      {formData.resume_url ? (
        <Button onClick={() => handleReviewResume(formData.resume_url)} className="block">
          Review Resume
        </Button>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">No resume available.</p>
      )}
    </div>

    {!readOnly && (
      <Button type="submit" className="w-full bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-400 text-white">
        Start Interview
      </Button>
    )}
  </form>
));

export default InterviewFormContent;

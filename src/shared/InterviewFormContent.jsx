import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { memo } from 'react';
import { Input } from '../components/ui/input';

// eslint-disable-next-line react/display-name
const InterviewFormContent = memo(({ formData, handleSubmit, handleInputChange }) => (
  <form onSubmit={handleSubmit} className="space-y-6 p-6 rounded-lg">
    <div className="space-y-2">
      <Label htmlFor="job_role" className="text-sm font-medium">
        Job Role
      </Label>
      <Input
        id="job_role"
        name="job_role"
        type="string"
        value={formData.job_role}
        required
        onChange={(e) => handleInputChange(e)}
        className="w-full bg-white border border-gray-200"
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="industry" className="text-sm font-medium">
        Industry
      </Label>
      <Input
        id="industry"
        name="industry"
        type="string"
        required
        value={formData.industry}
        onChange={(e) => handleInputChange(e)}
        className="w-full bg-white border border-gray-200"
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="overall_experience_yrs" className="text-sm font-medium">
        Overall Experience
      </Label>
      <Input
        id="overall_experience_yrs"
        name="overall_experience_yrs"
        type="number"
        required
        value={formData.overall_experience_yrs}
        onChange={(e) => handleInputChange(e)}
        className="w-full bg-white border border-gray-200"
      />
    </div>

    <Button type="submit" className="w-full">
      Start Interview
    </Button>
  </form>
));

export default InterviewFormContent;

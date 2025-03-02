import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { memo } from 'react';
import { Input } from '../components/ui/input';

// eslint-disable-next-line react/display-name
const InterviewFormContent = memo(({ formData, readOnly }) => (
  <form className="space-y-6 p-6 rounded-lg">
    <div className="space-y-2">
      <Label htmlFor="job_role" className="text-sm font-medium">
        Job Role
      </Label>
      <Input
        id="job_role"
        name="job_role"
        type="string"
        value={formData.job_role}
        readOnly={readOnly}
        className={`w-full ${readOnly ? 'bg-background' : 'bg-background'} border border-gray-200`}
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="institute" className="text-sm font-medium">
        Industry
      </Label>
      <Input
        id="institute"
        name="institute"
        type="string"
        value={formData.institute}
        readOnly={readOnly}
        className={`w-full ${readOnly ? 'bg-background' : 'bg-background'} border border-gray-200`}
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="yrs_of_exp" className="text-sm font-medium">
        Overall Experience
      </Label>
      <Input
        id="yrs_of_exp"
        name="yrs_of_exp"
        type="number"
        value={formData.yrs_of_exp}
        readOnly={readOnly}
        className={`w-full ${readOnly ? 'bg-background' : 'bg-background'} border border-gray-200`}
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="company" className="text-sm font-medium">
        Institute
      </Label>
      <Input
        id="company"
        name="company"
        type="string"
        value={formData.company}
        readOnly={readOnly}
        className={`w-full ${readOnly ? 'bg-background' : 'bg-background'} border border-gray-200`}
      />
    </div>

    {!readOnly && (
      <Button type="submit" className="w-full">
        Start Interview
      </Button>
    )}
  </form>
));

export default InterviewFormContent;

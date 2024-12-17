import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { memo } from 'react';

// eslint-disable-next-line react/display-name
const FormContent = memo(({ formData, handleSliderChange, handleSwitchChange, handleSubmit, handleInputChange }) => (
  <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-6 rounded-lg">
    {/* Overall Experience */}
    <div className="space-y-2">
      <Label htmlFor="overall_experince" className="text-sm font-medium">
        Overall Experience
      </Label>
      <Slider
        id="overall_experince"
        min={1}
        max={10}
        step={1}
        value={[formData.overall_experince]}
        onValueChange={(value) => handleSliderChange('overall_experince', value[0])}
        className="w-full"
      />
      <p className="text-sm text-gray-500">Rate your overall experience from 1 to 10</p>
    </div>

    {/* Recommend Score */}
    <div className="space-y-2">
      <Label htmlFor="recommend_score" className="text-sm font-medium">
        Recommend Score
      </Label>
      <Slider
        id="recommend_score"
        min={1}
        max={10}
        step={1}
        value={[formData.recommend_score]}
        onValueChange={(value) => handleSliderChange('recommend_score', value[0])}
        className="w-full"
      />
      <p className="text-sm text-gray-500">How likely are you to recommend us? (1-10)</p>
    </div>

    {/* Pay for Report */}
    <div className="flex items-center justify-between space-x-2">
      <div>
        <Label htmlFor="pay_for_report" className="text-sm font-medium">
          Pay for Report
        </Label>
        <p className="text-sm text-gray-500">Would you be willing to pay for a detailed report?</p>
      </div>
      <Switch
        id="pay_for_report"
        checked={formData.pay_for_report}
        onCheckedChange={(checked) => handleSwitchChange(checked)}
      />
    </div>

    {/* Price You Would Pay */}
    <div className="space-y-2">
      <Label htmlFor="pay_price" className="text-sm font-medium">
        Price You Would Pay
      </Label>
      <Input
        id="pay_price"
        name="pay_price"
        type="number"
        value={formData.pay_price}
        onChange={(e) => handleInputChange(e)}
        className="w-full bg-white border border-gray-200"
      />
      <p className="text-sm text-gray-500">How much would you be willing to pay for the report? (in INR)</p>
    </div>

    {/* Suggestions */}
    <div className="space-y-2">
      <Label htmlFor="suggestions" className="text-sm font-medium">
        Suggestions
      </Label>
      <Textarea
        id="suggestions"
        name="suggestions"
        value={formData.suggestions}
        onChange={(e) => handleInputChange(e)}
        className="w-full min-h-[100px] bg-white border border-gray-200"
      />
      <p className="text-sm text-gray-500">Any suggestions for improvement?</p>
    </div>

    {/* Submit Button */}
    <Button type="submit" className="w-full">
      Submit Feedback
    </Button>
  </form>
));

export default FormContent;

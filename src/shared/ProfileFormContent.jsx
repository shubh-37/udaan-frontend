/* eslint-disable react/prop-types */
export const FormContent = ({ formData, handleFileChange, handleInputChange, handleSubmit }) => (
  <form onSubmit={handleSubmit} className="space-y-4">
    <div>
      <label className="block text-sm font-medium">Full Name</label>
      <input
        type="text"
        name="full_name"
        value={formData.full_name}
        onChange={handleInputChange}
        className="w-full border rounded p-2"
      />
    </div>
    <div>
      <label className="block text-sm font-medium">Email</label>
      <input type="email" name="email" value={formData.email} className="w-full border rounded p-2" disabled />
    </div>
    <div>
      <label className="block text-sm font-medium">Mobile Number</label>
      <input
        type="text"
        name="mobile_number"
        value={formData.mobile_number}
        onChange={handleInputChange}
        className="w-full border rounded p-2"
      />
    </div>
    <div>
      <label className="block text-sm font-medium">Institute</label>
      <input
        type="text"
        name="institute"
        value={formData.institute}
        onChange={handleInputChange}
        className="w-full border rounded p-2"
      />
    </div>
    <div>
      <label className="block text-sm font-medium">Years of Experience</label>
      <input
        type="number"
        name="yrs_of_exp"
        value={formData.yrs_of_exp}
        onChange={handleInputChange}
        className="w-full border rounded p-2"
        required
      />
    </div>
    <div>
      <label className="block text-sm font-medium">Job Role</label>
      <input
        type="text"
        name="job_role"
        value={formData.job_role}
        onChange={handleInputChange}
        className="w-full border rounded p-2"
        required
      />
    </div>
    <div>
      <label className="block text-sm font-medium">Company</label>
      <input
        type="text"
        name="company"
        value={formData.company}
        onChange={handleInputChange}
        className="w-full border rounded p-2"
      />
    </div>
    <div>
      <label className="block text-sm font-medium">Resume (Max size: 200KB) </label>
      <input
        type="file"
        name="resume"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        className="w-full border rounded p-2"
        required
      />
      {formData.resume && <p className="mt-1 text-sm text-gray-500">{formData.resume.name}</p>}
    </div>
    <div>
      <label className="block text-sm font-medium">Password</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        className="w-full border rounded p-2"
        placeholder="***"
      />
    </div>
    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
      Update Profile
    </button>
  </form>
);

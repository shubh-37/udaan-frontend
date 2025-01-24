import { useEffect, useState } from 'react';
import axios from 'axios';
export const FormContent = ({ formData, handleFileChange, handleInputChange, handleSubmit, isResume }) => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { VITE_API_URL } = import.meta.env;

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(`${VITE_API_URL}/companies`, {
          headers: {}
        });
        setCompanies([...response.data, 'Others']);
      } catch (error) {
        alert('An error occurred while fetching companies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  return (
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
        {loading ? (
          <p>Loading companies...</p>
        ) : (
          <select
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            className="w-full border rounded p-2"
            required
          >
            <option value="">Select a company</option>
            {companies.map((company, index) => (
              <option key={index} value={company.name || company}>
                {company.name || company}
              </option>
            ))}
          </select>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium">Resume (Max size: 200KB)</label>
        <input
          type="file"
          name="resume"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="w-full border rounded p-2"
          required={!isResume}
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
};

import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../context/AuthContextProvider';
import Loader from '../shared/Loader';

const SignupForm = () => {
  const { signUpUser } = useContext(authContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    institute: '',
    mobile_number: '',
    job_role: '',
    industry: '',
    resume: null,
    overall_experience_yrs: 0
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const submissionData = new FormData();
    submissionData.append('username', formData.username);
    submissionData.append('email', formData.email);
    submissionData.append('password', formData.password);
    submissionData.append('institute', formData.institute);
    submissionData.append('mobile_number', formData.mobile_number);
    submissionData.append('job_role', formData.job_role);
    submissionData.append('industry', formData.industry);
    submissionData.append('resume', formData.resume); // File
    submissionData.append('overall_experience_yrs', formData.overall_experience_yrs);
    const response = await signUpUser(submissionData);
    if (response === 'success') {
      setIsLoading(false);
      navigate('/');
    } else if (response === 'failure') {
      setIsLoading(false);
      alert('Error signing up, please try again.');
    } else {
      setIsLoading(false);
      alert('Username/EmailId/Phone number exists, please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {isLoading && <Loader text={'Signing Up...'} />}
      <header className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-bold">PrepSOM</h1>
        <Link className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-gray-200" to="/login">
          Login
        </Link>
      </header>
      <div className="flex items-center justify-center mt-8">
        <form className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Sign Up</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Username *</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Institute *</label>
            <input
              type="text"
              name="institute"
              value={formData.institute}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Mobile Number *</label>
            <input
              type="text"
              name="mobile_number"
              value={formData.mobile_number}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Job Role *</label>
            <input
              type="text"
              name="job_role"
              value={formData.job_role}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Industry *</label>
            <input
              type="text"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Resume *</label>
            <input
              type="file"
              name="resume"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Overall Experience (years) *</label>
            <input
              type="number"
              name="overall_experience_yrs"
              min={0}
              value={formData.overall_experience_yrs}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;

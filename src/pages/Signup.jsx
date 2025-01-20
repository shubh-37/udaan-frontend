import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../context/AuthContextProvider';
import Loader from '../shared/Loader';
import { Video } from 'lucide-react';

const SignupForm = () => {
  const { signUpUser, setUpdateProfile } = useContext(authContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: ''
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
    try {
      setIsLoading(true);
      e.preventDefault();
      const submissionData = new FormData();
      submissionData.append('full_name', formData.full_name);
      submissionData.append('email', formData.email);
      submissionData.append('password', formData.password);
      const response = await signUpUser(submissionData);
      if (response === 'success') {
        navigate('/');
        setUpdateProfile(true);
      } else if (response === 'failure') {
        alert('Error signing up, please try again.');
      } else {
        alert('EmailId/Phone number exists, please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred, please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {isLoading && <Loader text={'Signing Up...'} />}
      <header className="px-4 lg:px-6 h-14 flex items-center border-b justify-between bg-white">
        <Link className="flex items-center justify-center" to="/">
          <Video className="h-6 w-6 text-blue-600" />
          <span className="ml-2 text-2xl font-bold bg-gradient-to-br from-blue-600 via-green-600 to-purple-600 text-transparent bg-clip-text">
            PrepSOM
          </span>
        </Link>
        <Link to="/login" className="bg-gray-100 text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-gray-200">
          Login
        </Link>
      </header>
      <div className="flex items-center justify-center mt-8">
        <form className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Sign Up</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Name *</label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
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
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
            Sign Up
          </button>
          <h5 className="text-center mt-4">
            Already have an account ?{' '}
            <Link className="text-blue-500" to="/login">
              Login
            </Link>
          </h5>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;

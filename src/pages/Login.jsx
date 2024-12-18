import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../context/AuthContextProvider';
import Loader from '../shared/Loader';
import { Video } from 'lucide-react';

const LoginForm = () => {
  const { loginUser } = useContext(authContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const response = await loginUser(formData);
    console.log(response);
    if (response === 'success') {
      setIsLoading(false);
      navigate('/');
    } else if (response === 'failure') {
      setIsLoading(false);
      alert('Error signing up, please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {isLoading && <Loader text={'Signing Up...'} />}

      <header className="px-4 lg:px-6 h-14 flex items-center border-b justify-between bg-white">
        <Link className="flex items-center justify-center" to="/">
          <Video className="h-6 w-6 text-blue-600" />
          <span className="ml-2 text-2xl font-bold bg-gradient-to-br from-blue-600 via-green-600 to-purple-600 text-transparent bg-clip-text">
            PrepSOM
          </span>
        </Link>
        <Link to="/sign-up" className="bg-gray-100 text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-gray-200">
          Sign Up
        </Link>
      </header>

      <div className="flex-grow flex items-center justify-center m-4">
        <form className="bg-white shadow-md rounded-lg p-8 w-full max-w-md" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>
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
            Login
          </button>
          <h5 className="text-center mt-4">
            Don't have an account ?{' '}
            <Link className="text-blue-500" to="/sign-up">
              Sign Up
            </Link>
          </h5>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

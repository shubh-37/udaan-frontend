import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../context/AuthContextProvider';
import Loader from '../shared/Loader';

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
      <header className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-bold">PrepSOM</h1>
        <Link to="/sign-up" className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-gray-200">
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
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

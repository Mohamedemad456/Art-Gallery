import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import SnackbarAlert from '../SnackbarAlert/snackbarAlert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPalette, faShoppingCart, faUser, faEnvelope, faLock, faSignature } from '@fortawesome/free-solid-svg-icons';

function AuthForm() {
  const [isRightExist, setisRightExist] = React.useState(true);
  const [displayName, setDisplayName] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [bio, setBio] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [role, setRole] = React.useState('Artist');
  const [snackbar, setSnackbar] = React.useState({ open: false, message: '', type: 'success' });

  const navigate = useNavigate();

  const showAlert = (message, type = 'success') => {
    setSnackbar({ open: true, message, type });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!displayName || !userName || !email || !password) {
      showAlert('Please fill in all required fields', 'error');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('DisplayName', displayName);
      formData.append('UserName', userName);
      formData.append('Email', email);
      formData.append('Password', password);
      formData.append('Role', role);
      formData.append('Bio', bio || '');

      const response = await fetch('https://localhost:7043/api/Auth/register', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const data = await response.json();

      if (data.token) {
        sessionStorage.setItem('accessToken', data.token);
      }

      showAlert('Registration successful! Welcome to our art community!', 'success');

      setDisplayName('');
      setUserName('');
      setEmail('');
      setPassword('');
      setBio('');
      setRole('Artist');

      setTimeout(() => {
        setisRightExist(false);
      }, 1500);

    } catch (error) {
      showAlert(error.message || 'Registration failed', 'error');
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://localhost:7043/api/Auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Invalid credentials');
      }

      const data = await response.json();
      if (data.accessToken) {
        sessionStorage.setItem('accessToken', data.accessToken);
      }
      showAlert('Login successful!', 'success');
      setTimeout(() => {
        navigate('/');
      }, 500);
    } catch (error) {
      showAlert(error.message || 'Invalid credentials', 'error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {snackbar.open && (
        <SnackbarAlert
          open={snackbar.open}
          message={snackbar.message}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          alertType={snackbar.type}
          position="top"
        />
      )}

      <div className="max-w-4xl w-full space-y-8 bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Mobile Toggle Buttons - Only visible on small screens */}
        <div className="lg:hidden flex justify-center space-x-4 p-4 border-b">
          <button
            onClick={() => setisRightExist(true)}
            className={`px-6 py-2 rounded-full transition-all ${
              isRightExist
                ? 'bg-[#3D2B1F] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Sign Up
          </button>
          <button
            onClick={() => setisRightExist(false)}
            className={`px-6 py-2 rounded-full transition-all ${
              !isRightExist
                ? 'bg-[#3D2B1F] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Sign In
          </button>
        </div>

        <div className="flex flex-col lg:flex-row min-h-[600px]">
          {/* Sign Up Form */}
          <div className={`w-full lg:w-1/2 p-4 sm:p-8 transition-all duration-500 ${
            isRightExist ? 'block' : 'hidden lg:block lg:translate-x-0'
          }`}>
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#3D2B1F]">Create Account</h2>
              <p className="text-gray-600 mt-2">Join our art community today</p>
            </div>

            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="relative">
                <FontAwesomeIcon icon={faSignature} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  value={displayName}
                  placeholder="Display Name"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3D2B1F] focus:border-transparent"
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                />
              </div>

              <div className="relative">
                <FontAwesomeIcon icon={faUser} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  value={userName}
                  placeholder="Username"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3D2B1F] focus:border-transparent"
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>

              <div className="relative">
                <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  placeholder="Email"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3D2B1F] focus:border-transparent"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="relative">
                <textarea
                  value={bio}
                  placeholder="Bio"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3D2B1F] focus:border-transparent"
                  onChange={(e) => setBio(e.target.value)}
                  required
                  rows="3"
                />
              </div>

              <div className="relative">
                <FontAwesomeIcon icon={faLock} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  placeholder="Password"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3D2B1F] focus:border-transparent"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                />
              </div>

              <div className="flex flex-wrap justify-center gap-4 my-6">
                <button
                  type="button"
                  className={`flex items-center gap-2 px-4 sm:px-6 py-2 rounded-full transition-all ${
                    role === 'Artist'
                      ? 'bg-[#3D2B1F] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  onClick={() => setRole('Artist')}
                >
                  <FontAwesomeIcon icon={faPalette} />
                  <span className="whitespace-nowrap">Artist</span>
                </button>
                <button
                  type="button"
                  className={`flex items-center gap-2 px-4 sm:px-6 py-2 rounded-full transition-all ${
                    role === 'Buyer'
                      ? 'bg-[#3D2B1F] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  onClick={() => setRole('Buyer')}
                >
                  <FontAwesomeIcon icon={faShoppingCart} />
                  <span className="whitespace-nowrap">Buyer</span>
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-[#3D2B1F] text-white py-3 rounded-lg font-semibold hover:bg-[#2d1f17] transition-colors"
              >
                Create Account
              </button>
            </form>
          </div>

          {/* Sign In Form */}
          <div className={`w-full lg:w-1/2 p-4 sm:p-8 transition-all duration-500 ${
            !isRightExist ? 'block' : 'hidden lg:block lg:translate-x-0'
          }`}>
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#3D2B1F]">Welcome Back</h2>
              <p className="text-gray-600 mt-2">Sign in to your account</p>
            </div>

            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="relative">
                <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3D2B1F] focus:border-transparent"
                  required
                />
              </div>

              <div className="relative">
                <FontAwesomeIcon icon={faLock} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3D2B1F] focus:border-transparent"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <a href="/" className="text-[#3D2B1F] hover:text-[#2d1f17] text-sm">
                  Forgot your password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-[#3D2B1F] text-white py-3 rounded-lg font-semibold hover:bg-[#2d1f17] transition-colors"
              >
                Sign In
              </button>
            </form>
          </div>

          {/* Overlay - Only visible on large screens */}
          <div className="hidden lg:block absolute top-0 right-0 w-1/2 h-full bg-[#3D2B1F] transform transition-transform duration-500"
               style={{ transform: isRightExist ? 'translateX(0)' : 'translateX(-100%)' }}>
            <div className="flex flex-col items-center justify-center h-full text-white p-8">
              <h2 className="text-3xl font-bold mb-4">
                {isRightExist ? 'Welcome Back!' : 'New Here?'}
              </h2>
              <p className="text-center mb-8">
                {isRightExist
                  ? 'Sign in to access your account and explore our art collection'
                  : 'Join our community of artists and art enthusiasts'}
              </p>
              <button
                onClick={() => setisRightExist(!isRightExist)}
                className="border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[#3D2B1F] transition-colors"
              >
                {isRightExist ? 'Sign In' : 'Sign Up'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;

import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Background image/graphic */}
      <div className="hidden md:flex bg-primary items-center justify-center w-1/2 p-8">
        <div className="max-w-lg text-white">
          <div className="mb-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-white text-primary h-8 w-8 rounded-lg flex items-center justify-center">
                P
              </div>
              <span className="font-semibold text-lg">PlanPulse</span>
            </Link>
          </div>
          <h2 className="text-3xl font-bold mb-4">Welcome to PlanPulse</h2>
          <p className="text-white/80 mb-8">
            Streamline your business planning process with our intuitive platform. 
            Create better business plans, track progress, and collaborate with your team.
          </p>
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <div className="bg-white/10 rounded-full p-2 mt-1">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-white">Real-time Collaboration</h3>
                <p className="text-white/70 text-sm">Work together with your team in real-time</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-white/10 rounded-full p-2 mt-1">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-white">Advanced Analytics</h3>
                <p className="text-white/70 text-sm">Track progress and visualize business metrics</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-white/10 rounded-full p-2 mt-1">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-white">AI Assistance</h3>
                <p className="text-white/70 text-sm">Get intelligent suggestions for your business plans</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex-1 flex flex-col">
        {/* Mobile nav */}
        <div className="md:hidden p-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary text-white h-8 w-8 rounded-lg flex items-center justify-center">
              P
            </div>
            <span className="font-semibold text-lg">PlanPulse</span>
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-bold text-center mb-6">Log in to your account</h2>
            <p className="text-center text-gray-500 mb-8">
              Enter your email and password to access your account
            </p>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter your password"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                
                <a href="#" className="text-sm text-primary hover:text-primary/80">
                  Forgot password?
                </a>
              </div>
              
              <button className="w-full bg-primary text-white py-2 rounded-md">
                Sign in
              </button>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link to="/login?signup=true" className="text-primary hover:text-primary/80 font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} PlanPulse. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useContext, useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import SinInIcon from '../../assets/Sign in-bro.png'



 
import auth from "../../Firebase/Firebase.Config";
import { AuthContext } from "../../Provider/AuthProvider";
import Button from "../../shared/Button";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signIn, setLoading, resetPassword } = useContext(AuthContext);
  const googleProvider = new GoogleAuthProvider();

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (user && user.email) {
      navigate(from, { replace: true }); // Sending to the previous page
    }
  }, [user, navigate, from]);

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        console.log(result);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Google Login Successful",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigate(from, { replace: true });  
        });
      })
      .catch((error) => {
        Swal.fire("Google Login Failed", error.message, "error");
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      Swal.fire("Missing Input", "Please enter email and password.", "warning");
      return;
    }

    signIn(email, password)
      .then(() => {
        Swal.fire("Login Success", "", "success").then(() => {
          setLoading(false);
          navigate(from, { replace: true }); // Sending to the previous page
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Login Failed",
          text: error.message,
          icon: "error",
          confirmButtonText: "Go to Register",
        }).then(() => {
          navigate("/auth/register");
        });
      });
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    
    Swal.fire({
      title: "Reset Password",
      html: `
        <input id="reset-email" class="swal2-input" placeholder="Enter your email address" type="email" style="width: 100%; padding: 0.625rem; margin-top: 0.5rem;">
      `,
      showCancelButton: true,
      confirmButtonText: "Send Reset Link",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#27548A",
      preConfirm: () => {
        const emailInput = document.getElementById('reset-email');
        const email = emailInput?.value?.trim();
        if (!email) {
          Swal.showValidationMessage("Please enter your email address");
          return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          Swal.showValidationMessage("Please enter a valid email address");
          return false;
        }
        return email;
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const email = result.value;
        resetPassword(email)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Reset Link Sent!",
              html: `
                <p>Password reset link has been sent to <strong>${email}</strong></p>
                <p style="margin-top: 1rem; font-size: 0.875rem; color: #666;">
                  Please check your email and follow the instructions to reset your password.
                </p>
              `,
              confirmButtonColor: "#27548A",
            });
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: error.message || "Failed to send reset link. Please try again.",
              confirmButtonColor: "#27548A",
            });
          });
      }
    });
  };

  return (
    <div className="w-full flex items-center justify-center px-4 py-8">
      <div className="max-w-5xl w-full grid md:grid-cols-2 items-center gap-8 rounded-lg p-8">
        {/* Left Illustration */}
        <div className="hidden md:block">
          <img src={SinInIcon} alt="Login Illustration" className="w-full" />
        </div>

        {/* Right Form */}
        <div className="w-full max-w-md mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-[#27548A]">
              Login to your Account
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mt-1">
              Don't have an account?
              <Link
                to="/auth/register"
                className="ml-1 text-[#27548A] underline font-semibold"
              >
                Sign Up
              </Link>
            </p>
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full bg-white text-gray-800 border-2 border-gray-300 rounded-lg flex items-center justify-center gap-3 mb-4 py-3 font-semibold shadow-sm hover:shadow-lg hover:border-gray-400 transition-all duration-200 active:scale-95"
          >
            <FcGoogle size={24} /> Login with Google
          </button>

          <div className="divider">OR</div>

          {/* Email/Password Login */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="label text-sm text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="input input-bordered w-full"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="label text-sm text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="input input-bordered w-full"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="text-right">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-[#27548A] dark:text-blue-400 hover:underline cursor-pointer font-medium"
              >
                Forgot password?
              </button>
            </div>

            <Button type="submit" className="w-full py-3 text-base">
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import SignUpIcon from '../../assets/Sign up-rafiki.png'
import Button from "../../shared/Button";
 

const Register = () => {
  const navigate = useNavigate();
  const { createUser } = useContext(AuthContext);

  const handlerRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photoURL = form.photoURL.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    // Validation
    if (!name || !email || !password) {
      alert("Please fill in all required fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      alert("Password must contain at least one uppercase letter.");
      return;
    }

    if (!/[0-9]/.test(password)) {
      alert("Password must contain at least one number.");
      return;
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      alert("Password must contain at least one special character.");
      return;
    }

    // Firebase signup via context
    createUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name,
          photoURL: photoURL,
        })
          .then(() => {
            // alert("User registered successfully!");
            // Swal.fire("register Or success");
            Swal.fire({
              position: "center",
              icon: "success",
              title: "User registered successfully!",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/auth/login");
          })
          .catch((error) => {
            console.log("Profile update error:", error.message);
          });
      })
      .catch((error) => {
        console.log("Signup error:", error.message);
        alert(error.message);
      });
  };

  return (
    <div className="  flex items-center justify-center    px-4">
      <div className="max-w-5xl w-full grid md:grid-cols-2 items-center gap-8 rounded-lg     ">
        {/* Left Illustration */}
        <div className="hidden md:block">
          <img src={SignUpIcon} alt="Sign Up Illustration" className="w-full" />
        </div>

        {/* Right Form */}
        <div className="w-full max-w-md mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-[#27548A]">
              Create a New Account
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Already have an account?
              <Link
                to="/auth/login"
                className="ml-1 text-[#27548A] underline font-semibold"
              >
                Log In
              </Link>
            </p>
          </div>

          <form onSubmit={handlerRegister} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                className="input input-bordered w-full"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                className="input input-bordered w-full"
                placeholder="example@gmail.com"
              />
            </div>

            <div>
              <label htmlFor="photoURL" className="block text-sm">
                Photo URL
              </label>
              <input
                type="text"
                name="photoURL"
                className="input input-bordered w-full"
                placeholder="https://..."
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                className="input input-bordered w-full"
                placeholder="Password"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                required
                className="input input-bordered w-full"
                placeholder="Confirm Password"
              />
            </div>

            <Button type="submit" className="btn btn-primary w-full mt-2">
              Sign Up
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

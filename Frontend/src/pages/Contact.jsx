
import React from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // submit form
  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:4001/api/contact", data);
      toast.success("Message sent successfully");
      reset(); // clear form after submit
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8 bg-white p-10 rounded-lg shadow-lg">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Contact Us</h2>
          
        </div>

        <div className="flex flex-col md:flex-row justify-between">
          {/* Contact Form */}
          <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-4">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Send us a message
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <span className="text-sm text-red-500 font-semibold">
                    Name is required
                  </span>
                )}
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-sm text-red-500 font-semibold">
                    Email is required
                  </span>
                )}
              </div>
              <div>
                <textarea
                  placeholder="Your Message"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows={4}
                  {...register("message", { required: true })}
                />
                {errors.message && (
                  <span className="text-sm text-red-500 font-semibold">
                    Message is required
                  </span>
                )}
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-yellow-600 duration-300"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

          {/* Contact Info */}
          <div className="w-full md:w-1/2 md:pl-4">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Contact Information
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-2">
                <FaPhone className="text-red-500" />
                <span>+91 6006749709</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaEnvelope className="text-pink-500" />
                <span>help@mehraj.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaMapMarkerAlt className="text-green-500" />
                <span>Baramulla, J&amp;K, India</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;

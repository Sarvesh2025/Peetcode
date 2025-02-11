import React from "react";
import { ChevronRight, Code, Users, Award, Activity } from "lucide-react";

const Landing = () => {
    
const stats = [
  { label: "Active Problems", value: "2000+", icon: Code },
  { label: "Active Users", value: "500K+", icon: Users },
  { label: "Daily Submissions", value: "10M+", icon: Activity },
  { label: "Success Rate", value: "60%", icon: Award },
];
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              A New Way to Learn Programming
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Master your coding skills with thousands of programming
              challenges. Practice, learn, and prepare for technical interviews.
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors duration-200 flex items-center gap-2">
              Start Coding
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <stat.icon className="w-8 h-8 text-blue-600 mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">
              Rich Problem Set
            </h3>
            <p className="text-gray-600">
              Access thousands of coding challenges across different difficulty
              levels and topics.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">
              Interactive Learning
            </h3>
            <p className="text-gray-600">
              Code, compile, and run your solutions directly in the browser with
              our online IDE.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">
              Progress Tracking
            </h3>
            <p className="text-gray-600">
              Monitor your progress, track completion rates, and earn
              achievements as you learn.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 text-white">
        <div className="container mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Start Your Coding Journey?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Join thousands of developers who are improving their skills every
            day.
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors duration-200">
            Create Free Account
          </button>
        </div>
      </div>
    </div>
  );
};
export default Landing;

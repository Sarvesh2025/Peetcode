import React from "react";
import { Check, X, Clock } from "lucide-react";

const SubmissionsPage = () => {
  // Sample submissions data
  const submissions = [
    {
      id: "12345",
      problemName: "Two Sum",
      status: "Accepted",
      language: "Python3",
      runtime: "56 ms",
      memory: "16.5 MB",
    },
    {
      id: "12344",
      problemName: "Valid Parentheses",
      status: "Wrong Answer",
      language: "JavaScript",
      runtime: "62 ms",
      memory: "42.1 MB",
    },
    {
      id: "12343",
      problemName: "Merge Two Sorted Lists",
      status: "Time Limit Exceeded",
      language: "Java",
      runtime: "N/A",
      memory: "N/A",
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "Accepted":
        return <Check className="w-5 h-5 text-green-500" />;
      case "Wrong Answer":
        return <X className="w-5 h-5 text-red-500" />;
      case "Time Limit Exceeded":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "Accepted":
        return "bg-green-50 text-green-700";
      case "Wrong Answer":
        return "bg-red-50 text-red-700";
      case "Time Limit Exceeded":
        return "bg-yellow-50 text-yellow-700";
      default:
        return "";
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Submissions</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submission ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Problem
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Language
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Runtime
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Memory
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {submissions.map((submission) => (
                <tr key={submission.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-gray-500">
                    {submission.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-blue-600 hover:text-blue-800 cursor-pointer hover:underline">
                      {submission.problemName}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      className={`flex items-center gap-2 px-3 py-1 rounded-full w-fit ${getStatusStyles(
                        submission.status
                      )}`}
                    >
                      {getStatusIcon(submission.status)}
                      <span className="text-sm font-medium">
                        {submission.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {submission.language}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {submission.runtime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {submission.memory}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubmissionsPage;

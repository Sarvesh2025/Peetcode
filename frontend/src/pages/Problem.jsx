import React, { useState } from "react";

const DifficultyBadge = ({ difficulty }) => {
  const colors = {
    Easy: "text-green-600",
    Medium: "text-yellow-600",
    Hard: "text-red-600",
  };

  return (
    <span className={`font-medium ${colors[difficulty]}`}>{difficulty}</span>
  );
};

const CodeEditor = ({ defaultLanguage, codeTemplates }) => {
  const [language, setLanguage] = useState(defaultLanguage);

  return (
    <div className="bg-gray-900 h-full">
      <div className="border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-gray-800 text-gray-300 px-3 py-1.5 rounded text-sm border border-gray-700"
          >
            {Object.keys(codeTemplates).map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded text-sm font-medium">
            Run Code
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="font-mono text-sm text-gray-300 bg-gray-800 p-4 rounded-lg h-[calc(100vh-14rem)] overflow-y-auto">
          {codeTemplates[language]}
        </div>
      </div>
    </div>
  );
};

const Problem = ({ problem }) => {
  const [activeTab, setActiveTab] = useState("description");

  const tabs = [
    { id: "description", label: "Description" },
    { id: "solutions", label: "Solutions" },
    { id: "submissions", label: "Submissions" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
     
      <div className="h-14 bg-white border-b border-gray-200 px-6 flex items-center">
        <div className="flex items-center gap-4">
          <DifficultyBadge difficulty={problem.difficulty} />
          <h1 className="text-xl font-semibold">
            {problem.id}. {problem.title}
          </h1>
        </div>
      </div>

      
      <div className="grid grid-cols-2 h-[calc(100vh-3.5rem)]">

        <div className="border-r border-gray-200 bg-white overflow-y-auto">
        
          <div className="border-b border-gray-200">
            <div className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`px-6 py-3 text-sm font-medium ${
                    activeTab === tab.id
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 space-y-8">
            {activeTab === "description" && (
              <>
               
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <h2 className="text-lg font-semibold">
                      Problem Description
                    </h2>
                    <div className="flex gap-2">
                      {problem.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  {problem.description.map((paragraph, idx) => (
                    <p key={idx} className="text-gray-600 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

      
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">Examples</h2>
                  <div className="space-y-4">
                    {problem.examples.map((example, idx) => (
                      <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                        <p className="font-medium mb-2">Example {idx + 1}:</p>
                        <div className="space-y-2">
                          <p className="text-sm">
                            <span className="font-medium">Input: </span>
                            <code className="text-sm">{example.input}</code>
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">Output: </span>
                            <code className="text-sm">{example.output}</code>
                          </p>
                          {example.explanation && (
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Explanation: </span>
                              {example.explanation}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">Constraints</h2>
                  <ul className="space-y-2 text-gray-600">
                    {problem.constraints.map((constraint, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-gray-400">•</span>
                        <code className="text-sm">{constraint}</code>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {activeTab === "solutions" && (
              <div className="text-gray-600">
                Solutions content would go here...
              </div>
            )}

            {activeTab === "submissions" && (
              <div className="text-gray-600">
                Submissions content would go here...
              </div>
            )}
          </div>
        </div>


        <CodeEditor
          defaultLanguage={problem.defaultLanguage}
          codeTemplates={problem.codeTemplates}
        />
      </div>
    </div>
  );
};


const exampleProblem = {
  id: 1,
  title: "Two Sum",
  difficulty: "Easy",
  tags: ["Array", "Hash Table"],
  description: [
    "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    "You may assume that each input would have exactly one solution, and you may not use the same element twice.",
  ],
  examples: [
    {
      input: "nums = [2,7,11,15], target = 9",
      output: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
    },
    {
      input: "nums = [3,2,4], target = 6",
      output: "[1,2]",
    },
  ],
  constraints: [
    "2 ≤ nums.length ≤ 10⁴",
    "-10⁹ ≤ nums[i] ≤ 10⁹",
    "-10⁹ ≤ target ≤ 10⁹",
    "Only one valid answer exists.",
  ],
  defaultLanguage: "Python3",
  codeTemplates: {
    Python3: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # Write your solution here
        pass

# Time Complexity: O(n)
# Space Complexity: O(n)`,
    JavaScript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // Write your solution here
};`,
    Java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
    }
}`,
  },
};

export default () => <Problem problem={exampleProblem} />;

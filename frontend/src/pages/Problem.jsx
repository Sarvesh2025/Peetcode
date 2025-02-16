import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from "lucide-react";

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

const ResizeHandle = ({ onToggle, isCollapsed }) => (
  <div className="absolute top-1/2 -translate-y-1/2 -right-3 z-10">
    <button
      onClick={onToggle}
      className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 shadow-sm"
    >
      {isCollapsed ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
    </button>
  </div>
);

const SectionHeader = ({ title, isCollapsed, onToggle, children }) => (
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center gap-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
    </div>
    <button
      onClick={onToggle}
      className="p-1 rounded hover:bg-gray-100"
    >
      {isCollapsed ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
    </button>
  </div>
);

const CodeEditor = ({ defaultLanguage, codeTemplates, onRunTests }) => {
  const [language, setLanguage] = useState(defaultLanguage);
  const [code, setCode] = useState(codeTemplates[defaultLanguage]);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [activeOutputTab, setActiveOutputTab] = useState("testcases");
  const [isOutputCollapsed, setIsOutputCollapsed] = useState(false);

  useEffect(() => {
    setCode(codeTemplates[language]);
  }, [language, codeTemplates]);

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput("Running...");
    setActiveOutputTab("output");
    setIsOutputCollapsed(false);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const outputs = {
        Python3: "[0, 1]\nTime: 36ms | Memory: 14.2MB",
        JavaScript: "[0, 1]\nTime: 52ms | Memory: 42.1MB",
        Java: "[0, 1]\nTime: 1ms | Memory: 38.9MB",
      };
      setOutput(outputs[language] || "Execution completed");
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const runTests = async () => {
    setIsRunning(true);
    setActiveOutputTab("testcases");
    setIsOutputCollapsed(false);
    await onRunTests();
    setIsRunning(false);
  };

  return (
    <div className="bg-gray-900 h-full flex flex-col">
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
          <div className="flex gap-2">
            <button
              onClick={runTests}
              disabled={isRunning}
              className={`${
                isRunning
                  ? "bg-orange-700 cursor-not-allowed"
                  : "bg-orange-600 hover:bg-orange-700"
              } text-white px-4 py-1.5 rounded text-sm font-medium transition-colors`}
            >
              Run Tests
            </button>
            <button
              onClick={runCode}
              disabled={isRunning}
              className={`${
                isRunning
                  ? "bg-green-700 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              } text-white px-4 py-1.5 rounded text-sm font-medium transition-colors`}
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 grid grid-rows-[1fr,auto]">
        <div className="relative h-full">
          <textarea
            value={code}
            onChange={handleCodeChange}
            className="w-full h-full bg-gray-900 text-gray-100 font-mono text-sm p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700"
            spellCheck="false"
            style={{ tabSize: 4 }}
          />
        </div>

        <div className={`bg-gray-800 border-t border-gray-700 transition-all duration-300 ${isOutputCollapsed ? 'h-10' : ''}`}>
          <div className="flex border-b border-gray-700">
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeOutputTab === "testcases"
                  ? "text-white border-b-2 border-orange-500"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveOutputTab("testcases")}
            >
              Testcases
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeOutputTab === "output"
                  ? "text-white border-b-2 border-green-500"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveOutputTab("output")}
            >
              Output
            </button>
            <button
              onClick={() => setIsOutputCollapsed(!isOutputCollapsed)}
              className="ml-auto px-4 py-2 text-gray-400 hover:text-white"
            >
              {isOutputCollapsed ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
            </button>
          </div>
          
          {!isOutputCollapsed && (
            <div className="p-4">
              {activeOutputTab === "testcases" ? (
                <div className="space-y-4">
                  <TestCase
                    input="nums = [2,7,11,15], target = 9"
                    expectedOutput="[0,1]"
                    status="success"
                  />
                  <TestCase
                    input="nums = [3,2,4], target = 6"
                    expectedOutput="[1,2]"
                    status="pending"
                  />
                  <TestCase
                    input="nums = [3,3], target = 6"
                    expectedOutput="[0,1]"
                    status="pending"
                  />
                </div>
              ) : (
                <div className="font-mono text-sm text-gray-300 whitespace-pre-wrap">
                  {output}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const TestCase = ({ input, expectedOutput, status }) => {
  const statusColors = {
    success: "text-green-500",
    error: "text-red-500",
    pending: "text-gray-400",
  };

  return (
    <div className="bg-gray-900 rounded p-3 border border-gray-700">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-400">Test Case</span>
        <span className={`text-sm font-medium ${statusColors[status]}`}>
          {status === "success" && "Accepted"}
          {status === "error" && "Wrong Answer"}
          {status === "pending" && "Pending"}
        </span>
      </div>
      <div className="space-y-2">
        <div>
          <span className="text-sm text-gray-400">Input:</span>
          <code className="ml-2 text-sm text-gray-300">{input}</code>
        </div>
        <div>
          <span className="text-sm text-gray-400">Expected Output:</span>
          <code className="ml-2 text-sm text-gray-300">{expectedOutput}</code>
        </div>
      </div>
    </div>
  );
};

const Problem = ({ problem }) => {
  const [activeTab, setActiveTab] = useState("description");
  const [isDescriptionPanelCollapsed, setIsDescriptionPanelCollapsed] =
    useState(false);
  const [isSectionCollapsed, setIsSectionCollapsed] = useState({
    description: false,
    examples: false,
    constraints: false,
  });

  const tabs = [
    { id: "description", label: "Description" },
    { id: "solutions", label: "Solutions" },
    { id: "submissions", label: "Submissions" },
  ];

  const handleRunTests = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
  };

  const toggleSection = (section) => {
    setIsSectionCollapsed((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

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

      <div
        className="grid h-[calc(100vh-3.5rem)]"
        style={{
          gridTemplateColumns: isDescriptionPanelCollapsed
            ? "50px 1fr"
            : "1fr 1fr",
        }}
      >
        <div
          className={`relative border-r border-gray-200 bg-white overflow-y-auto transition-all duration-300 ${
            isDescriptionPanelCollapsed ? "w-[50px]" : ""
          }`}
        >
          <ResizeHandle
            onToggle={() =>
              setIsDescriptionPanelCollapsed(!isDescriptionPanelCollapsed)
            }
            isCollapsed={isDescriptionPanelCollapsed}
          />

          {!isDescriptionPanelCollapsed && (
            <>
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
                      <SectionHeader
                        title="Problem Description"
                        isCollapsed={isSectionCollapsed.description}
                        onToggle={() => toggleSection("description")}
                      >
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
                      </SectionHeader>
                      {!isSectionCollapsed.description &&
                        problem.description.map((paragraph, idx) => (
                          <p
                            key={idx}
                            className="text-gray-600 leading-relaxed"
                          >
                            {paragraph}
                          </p>
                        ))}
                    </div>

                    <div className="space-y-4">
                      <SectionHeader
                        title="Examples"
                        isCollapsed={isSectionCollapsed.examples}
                        onToggle={() => toggleSection("examples")}
                      />
                      {!isSectionCollapsed.examples && (
                        <div className="space-y-4">
                          {problem.examples.map((example, idx) => (
                            <div
                              key={idx}
                              className="bg-gray-50 p-4 rounded-lg"
                            >
                              <p className="font-medium mb-2">
                                Example {idx + 1}:
                              </p>
                              <div className="space-y-2">
                                <p className="text-sm">
                                  <span className="font-medium">Input: </span>
                                  <code className="text-sm">
                                    {example.input}
                                  </code>
                                </p>
                                <p className="text-sm">
                                  <span className="font-medium">Output: </span>
                                  <code className="text-sm">
                                    {example.output}
                                  </code>
                                </p>
                                {example.explanation && (
                                  <p className="text-sm text-gray-600">
                                    <span className="font-medium">
                                      Explanation:{" "}
                                    </span>
                                    {example.explanation}
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <SectionHeader
                        title="Constraints"
                        isCollapsed={isSectionCollapsed.constraints}
                        onToggle={() => toggleSection("constraints")}
                      />
                      {!isSectionCollapsed.constraints && (
                        <ul className="space-y-2 text-gray-600">
                          {problem.constraints.map((constraint, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <span className="text-gray-400">•</span>
                              <code className="text-sm">{constraint}</code>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </>
                )}

                {activeTab === "solutions" && (
                  <div className="text-gray-600">
                    Solutions content would go here...
                  </div>
                )}

                {/* Previous code remains the same until activeTab === "submissions" && */}

                {activeTab === "submissions" && (
                  <div className="space-y-4">
                    <SectionHeader
                      title="Submissions History"
                      isCollapsed={isSectionCollapsed.submissions}
                      onToggle={() => toggleSection("submissions")}
                    />
                    {!isSectionCollapsed.submissions && (
                      <div className="space-y-4">
                        <div className="bg-white rounded-lg border border-gray-200">
                          <div className="grid grid-cols-5 text-sm font-medium text-gray-500 border-b border-gray-200">
                            <div className="p-3">Status</div>
                            <div className="p-3">Runtime</div>
                            <div className="p-3">Memory</div>
                            <div className="p-3">Language</div>
                            <div className="p-3">Time</div>
                          </div>
                          <div className="divide-y divide-gray-200">
                            {[
                              {
                                status: "Accepted",
                                runtime: "36 ms",
                                memory: "14.2 MB",
                                language: "Python3",
                                time: "2 minutes ago",
                                statusColor: "text-green-600",
                              },
                              {
                                status: "Wrong Answer",
                                runtime: "N/A",
                                memory: "N/A",
                                language: "Python3",
                                time: "5 minutes ago",
                                statusColor: "text-red-600",
                              },
                              {
                                status: "Time Limit Exceeded",
                                runtime: "N/A",
                                memory: "14.3 MB",
                                language: "JavaScript",
                                time: "10 minutes ago",
                                statusColor: "text-orange-600",
                              },
                            ].map((submission, idx) => (
                              <div
                                key={idx}
                                className="grid grid-cols-5 text-sm hover:bg-gray-50"
                              >
                                <div
                                  className={`p-3 ${submission.statusColor}`}
                                >
                                  {submission.status}
                                </div>
                                <div className="p-3">{submission.runtime}</div>
                                <div className="p-3">{submission.memory}</div>
                                <div className="p-3">{submission.language}</div>
                                <div className="p-3 text-gray-500">
                                  {submission.time}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <CodeEditor
          defaultLanguage={problem.defaultLanguage}
          codeTemplates={problem.codeTemplates}
          onRunTests={handleRunTests}
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
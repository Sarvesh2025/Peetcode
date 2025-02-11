import React, { useState } from "react";
import { Star, ChevronUp, ChevronDown, Search } from "lucide-react";

// Sample problems data
const problemsData = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    acceptanceRate: 78.5,
    categories: ["Arrays", "Hash Table"],
    premium: false,
    likes: 1250,
    dislikes: 120,
  },
  {
    id: 2,
    title: "Merge K Sorted Lists",
    difficulty: "Hard",
    acceptanceRate: 45.2,
    categories: ["Linked List", "Divide and Conquer", "Heap"],
    premium: true,
    likes: 850,
    dislikes: 95,
  },
  {
    id: 3,
    title: "Valid Parentheses",
    difficulty: "Easy",
    acceptanceRate: 68.9,
    categories: ["Stack", "String"],
    premium: false,
    likes: 980,
    dislikes: 75,
  },
  {
    id: 4,
    title: "LRU Cache",
    difficulty: "Medium",
    acceptanceRate: 55.7,
    categories: ["Hash Table", "Linked List", "Design"],
    premium: true,
    likes: 760,
    dislikes: 85,
  },
];

const Problems = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [statusFilter, setStatusFilter] = useState("All");

  // Filter and sort problems
  const filteredAndSortedProblems = problemsData
    .filter((problem) => {
      const matchesSearch =
        problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        problem.categories.some((cat) =>
          cat.toLowerCase().includes(searchQuery.toLowerCase())
        );
      const matchesDifficulty =
        selectedDifficulty === "All" ||
        problem.difficulty === selectedDifficulty;
      return matchesSearch && matchesDifficulty;
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "acceptance":
          comparison = a.acceptanceRate - b.acceptanceRate;
          break;
        case "difficulty":
          const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 };
          comparison =
            difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
          break;
        case "likes":
          comparison = a.likes - b.dislikes - (b.likes - b.dislikes);
          break;
        default:
          comparison = a.id - b.id;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const SortIcon = ({ column }) => {
    if (sortBy !== column) return <div className="w-4 h-4" />;
    return sortOrder === "asc" ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    );
  };

  return (
    <div className="p-4 max-w-8xl mx-auto bg-gray-900 min-h-screen">
      {/* Filters Section */}
      <div className="mb-6 space-y-4 bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-700 border-gray-600 rounded-lg pl-10 pr-4 py-2 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="bg-gray-700 border-gray-600 text-gray-200 rounded-lg px-4 py-2 w-[150px] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-gray-700 border-gray-600 text-gray-200 rounded-lg px-4 py-2 w-[150px] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="All">All Status</option>
            <option value="Todo">Todo</option>
            <option value="Solved">Solved</option>
            <option value="Attempted">Attempted</option>
          </select>
        </div>
      </div>

      {/* Problems Table */}
      <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-750">
            <tr>
              <th
                className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-blue-400 transition-colors"
                onClick={() => handleSort("id")}
              >
                <div className="flex items-center gap-2">
                  Status
                  <SortIcon column="id" />
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Title
              </th>
              <th
                className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-blue-400 transition-colors"
                onClick={() => handleSort("acceptance")}
              >
                <div className="flex items-center gap-2">
                  Acceptance
                  <SortIcon column="acceptance" />
                </div>
              </th>
              <th
                className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-blue-400 transition-colors"
                onClick={() => handleSort("difficulty")}
              >
                <div className="flex items-center gap-2">
                  Difficulty
                  <SortIcon column="difficulty" />
                </div>
              </th>
              <th
                className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-blue-400 transition-colors"
                onClick={() => handleSort("likes")}
              >
                <div className="flex items-center gap-2">
                  Likes
                  <SortIcon column="likes" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredAndSortedProblems.map((problem) => (
              <tr
                key={problem.id}
                className="hover:bg-gray-750 cursor-pointer transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  {problem.premium && (
                    <Star className="w-4 h-4 text-yellow-500" />
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
                      {problem.title}
                    </span>
                    <div className="flex gap-2 mt-1">
                      {problem.categories.map((category) => (
                        <span
                          key={category}
                          className="px-2 py-0.5 text-xs rounded-full bg-gray-700 text-gray-300 border border-gray-600"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {problem.acceptanceRate.toFixed(1)}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${
                      problem.difficulty === "Easy"
                        ? "bg-green-900 text-green-300 border border-green-700"
                        : problem.difficulty === "Medium"
                        ? "bg-yellow-900 text-yellow-300 border border-yellow-700"
                        : "bg-red-900 text-red-300 border border-red-700"
                    }`}
                  >
                    {problem.difficulty}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-green-400">{problem.likes}</span>
                    <span className="text-red-400">{problem.dislikes}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Problems;

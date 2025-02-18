import React, { useState, useEffect } from "react";
import {
  Trophy,
  Target,
  Star,
  Award,
  Calendar,
  ChevronUp,
  Zap,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Initial progress data structure
const initialProgress = {
  totalSolved: 0,
  difficulty: {
    easy: { solved: 0, total: 500 },
    medium: { solved: 0, total: 1000 },
    hard: { solved: 0, total: 500 },
  },
  streak: {
    current: 0,
    longest: 0,
    lastSolveDate: null,
  },
  achievements: [],
  dailyProgress: [],
  level: 1,
  experience: 0,
};

// Available achievements
const achievements = [
  {
    id: "first_solve",
    name: "First Blood",
    description: "Solve your first problem",
    icon: "🎯",
  },
  {
    id: "streak_7",
    name: "Consistency",
    description: "Maintain a 7-day streak",
    icon: "🔥",
  },
  {
    id: "easy_10",
    name: "Easy Rider",
    description: "Solve 10 easy problems",
    icon: "⭐",
  },
  {
    id: "medium_10",
    name: "Medium Rare",
    description: "Solve 10 medium problems",
    icon: "💪",
  },
  {
    id: "hard_5",
    name: "Hard Core",
    description: "Solve 5 hard problems",
    icon: "🏆",
  },
  {
    id: "daily_5",
    name: "Daily Hero",
    description: "Solve 5 problems in one day",
    icon: "⚡",
  },
];

const ProgressTracking = () => {
  const [progress, setProgress] = useState(initialProgress);

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem("leetcodeProgress");
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("leetcodeProgress", JSON.stringify(progress));
  }, [progress]);

  // Simulate solving a problem (for demo purposes)
  const simulateSolve = (difficulty) => {
    setProgress((prev) => {
      const now = new Date();
      const today = now.toDateString();
      const isNewDay = prev.streak.lastSolveDate !== today;

      // Update daily progress
      const newDailyProgress = [...prev.dailyProgress];
      const todayIndex = newDailyProgress.findIndex((d) => d.date === today);
      if (todayIndex === -1) {
        newDailyProgress.push({ date: today, count: 1 });
      } else {
        newDailyProgress[todayIndex].count++;
      }
      if (newDailyProgress.length > 30) newDailyProgress.shift();

      // Calculate streak
      let newStreak = prev.streak.current;
      if (isNewDay) {
        const lastDate = new Date(prev.streak.lastSolveDate);
        const daysDiff = Math.floor((now - lastDate) / (1000 * 60 * 60 * 24));
        newStreak = daysDiff === 1 ? prev.streak.current + 1 : 1;
      }

      // Update experience and level
      const expGain =
        difficulty === "easy" ? 10 : difficulty === "medium" ? 20 : 30;
      const newExp = prev.experience + expGain;
      const newLevel = Math.floor(newExp / 100) + 1;

      return {
        ...prev,
        totalSolved: prev.totalSolved + 1,
        difficulty: {
          ...prev.difficulty,
          [difficulty]: {
            ...prev.difficulty[difficulty],
            solved: prev.difficulty[difficulty].solved + 1,
          },
        },
        streak: {
          current: newStreak,
          longest: Math.max(newStreak, prev.streak.longest),
          lastSolveDate: today,
        },
        dailyProgress: newDailyProgress,
        level: newLevel,
        experience: newExp,
      };
    });
  };

  // Calculate completion percentage for each difficulty
  const getCompletionPercentage = (difficulty) => {
    const { solved, total } = progress.difficulty[difficulty];
    return Math.round((solved / total) * 100);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Level and Experience Bar */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xl font-bold">Level {progress.level}</span>
          <span className="text-sm text-gray-600">
            {progress.experience % 100}/100 XP to next level
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 rounded-full h-2"
            style={{ width: `${progress.experience % 100}%` }}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Solved */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center space-x-2">
            <Trophy className="text-yellow-500" />
            <h2 className="text-lg font-semibold">Problems Solved</h2>
          </div>
          <p className="text-3xl font-bold mt-2">{progress.totalSolved}</p>
          <div className="mt-2 text-sm text-gray-600">
            Total Available:{" "}
            {progress.difficulty.easy.total +
              progress.difficulty.medium.total +
              progress.difficulty.hard.total}
          </div>
        </div>

        {/* Current Streak */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center space-x-2">
            <Target className="text-red-500" />
            <h2 className="text-lg font-semibold">Current Streak</h2>
          </div>
          <p className="text-3xl font-bold mt-2">
            {progress.streak.current} days
          </p>
          <div className="mt-2 text-sm text-gray-600">
            Longest: {progress.streak.longest} days
          </div>
        </div>

        {/* Rating/Level */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center space-x-2">
            <Star className="text-purple-500" />
            <h2 className="text-lg font-semibold">Experience</h2>
          </div>
          <p className="text-3xl font-bold mt-2">{progress.experience}</p>
          <div className="mt-2 text-sm text-gray-600">Total XP Earned</div>
        </div>
      </div>

      {/* Difficulty Progress */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Progress by Difficulty</h2>
        <div className="space-y-4">
          {/* Easy Progress */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-green-600 font-medium">Easy</span>
              <span className="text-sm text-gray-600">
                {progress.difficulty.easy.solved}/
                {progress.difficulty.easy.total}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 rounded-full h-2"
                style={{ width: `${getCompletionPercentage("easy")}%` }}
              />
            </div>
          </div>

          {/* Medium Progress */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-yellow-600 font-medium">Medium</span>
              <span className="text-sm text-gray-600">
                {progress.difficulty.medium.solved}/
                {progress.difficulty.medium.total}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-yellow-500 rounded-full h-2"
                style={{ width: `${getCompletionPercentage("medium")}%` }}
              />
            </div>
          </div>

          {/* Hard Progress */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-red-600 font-medium">Hard</span>
              <span className="text-sm text-gray-600">
                {progress.difficulty.hard.solved}/
                {progress.difficulty.hard.total}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-red-500 rounded-full h-2"
                style={{ width: `${getCompletionPercentage("hard")}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Daily Progress Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Daily Progress</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={progress.dailyProgress}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#3b82f6" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-4 rounded-lg border ${
                progress.achievements.includes(achievement.id)
                  ? "border-green-200 bg-green-50"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{achievement.icon}</span>
                <div>
                  <h3 className="font-medium">{achievement.name}</h3>
                  <p className="text-sm text-gray-600">
                    {achievement.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Demo Controls (for testing) */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Demo Controls</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => simulateSolve("easy")}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Solve Easy
          </button>
          <button
            onClick={() => simulateSolve("medium")}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Solve Medium
          </button>
          <button
            onClick={() => simulateSolve("hard")}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Solve Hard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracking;

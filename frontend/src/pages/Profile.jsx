import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { Calendar, Code, Trophy, Target, Award } from 'lucide-react';

// Sample data
const successRateData = [
  { month: 'Jan', rate: 65, submissions: 45 },
  { month: 'Feb', rate: 70, submissions: 52 },
  { month: 'Mar', rate: 68, submissions: 38 },
  { month: 'Apr', rate: 75, submissions: 60 },
  { month: 'May', rate: 80, submissions: 55 },
  { month: 'Jun', rate: 85, submissions: 48 },
];

const problemTypes = [
  { name: 'Array', count: 85 },
  { name: 'String', count: 65 },
  { name: 'DP', count: 45 },
  { name: 'Tree', count: 40 },
  { name: 'Graph', count: 35 },
];

const difficultyData = [
  { name: 'Easy', value: 145, color: '#4ade80' },
  { name: 'Medium', value: 132, color: '#fbbf24' },
  { name: 'Hard', value: 47, color: '#ef4444' },
];

const recentSubmissions = [
  { id: 1, problem: 'Two Sum', status: 'Accepted', time: '2 hours ago', difficulty: 'Easy' },
  { id: 2, problem: 'Add Two Numbers', status: 'Wrong Answer', time: '5 hours ago', difficulty: 'Medium' },
  { id: 3, problem: 'Longest Substring', status: 'Accepted', time: '1 day ago', difficulty: 'Medium' },
  { id: 4, problem: 'Median of Arrays', status: 'Time Limit', time: '2 days ago', difficulty: 'Hard' },
];

// Generate realistic activity data for a year
const generateActivityData = () => {
  const days = 365;
  const data = [];
  let date = new Date();
  date.setDate(date.getDate() - days);

  for (let i = 0; i < days; i++) {
    const contributions = Math.random() > 0.5 ? Math.floor(Math.random() * 8) : 0;
    data.push({
      date: new Date(date),
      contributions,
      level: contributions === 0 ? 0 : 
             contributions <= 2 ? 1 :
             contributions <= 4 ? 2 :
             contributions <= 6 ? 3 : 4
    });
    date.setDate(date.getDate() + 1);
  }
  return data;
};

const activityData = generateActivityData();

const Profile = () => {
  const getMonthLabel = (date) => {
    return date.toLocaleString('default', { month: 'short' });
  };

  const getDayLabel = (date) => {
    return date.toLocaleString('default', { weekday: 'short' });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Profile Header */}
      <div className="flex items-center space-x-4 bg-white p-6 rounded-lg shadow">
        <img
          src="/api/placeholder/80/80"
          alt="User avatar"
          className="w-20 h-20 rounded-full"
        />
        <div>
          <h1 className="text-2xl font-bold">CodeMaster2024</h1>
          <p className="text-gray-600">Rank: 15,234</p>
          <div className="flex items-center space-x-4 mt-2">
            <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
              Premium User
            </span>
            <span className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded">
              Contest Rating: 1756
            </span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center space-x-2">
            <Code className="text-blue-500" />
            <h2 className="text-lg font-semibold">Problems Solved</h2>
          </div>
          <p className="text-3xl font-bold mt-2">324</p>
          <div className="mt-2 text-sm text-gray-600">
            Easy: 145 | Medium: 132 | Hard: 47
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center space-x-2">
            <Trophy className="text-yellow-500" />
            <h2 className="text-lg font-semibold">Success Rate</h2>
          </div>
          <p className="text-3xl font-bold mt-2">75.8%</p>
          <div className="mt-2 text-sm text-gray-600">
            Last 6 months average
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center space-x-2">
            <Target className="text-green-500" />
            <h2 className="text-lg font-semibold">Daily Streak</h2>
          </div>
          <p className="text-3xl font-bold mt-2">15</p>
          <div className="mt-2 text-sm text-gray-600">
            Best: 45 days
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center space-x-2">
            <Award className="text-purple-500" />
            <h2 className="text-lg font-semibold">Contest Rating</h2>
          </div>
          <p className="text-3xl font-bold mt-2">1756</p>
          <div className="mt-2 text-sm text-gray-600">
            Top 15%
          </div>
        </div>
      </div>

      {/* Activity Calendar */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Calendar className="text-gray-500" />
            <h2 className="text-lg font-semibold">Contribution Calendar</h2>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <span>Less</span>
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`w-4 h-4 rounded ${
                  level === 0 ? 'bg-gray-100' :
                  level === 1 ? 'bg-green-200' :
                  level === 2 ? 'bg-green-300' :
                  level === 3 ? 'bg-green-400' :
                  'bg-green-500'
                }`}
              />
            ))}
            <span>More</span>
          </div>
        </div>
        
        <div className="flex">
          {/* Day labels */}
          <div className="mr-2 space-y-2 text-sm text-gray-400">
            {['Mon', 'Wed', 'Fri'].map(day => (
              <div key={day} className="h-8 flex items-center">{day}</div>
            ))}
          </div>
          
          {/* Calendar grid */}
          <div className="flex-1 overflow-x-auto">
            <div className="inline-flex">
              {Array.from({ length: 52 }, (_, weekIndex) => (
                <div key={weekIndex} className="space-y-2">
                  {Array.from({ length: 7 }, (_, dayIndex) => {
                    const dataIndex = weekIndex * 7 + dayIndex;
                    const data = activityData[dataIndex];
                    return (
                      <div
                        key={dayIndex}
                        className={`w-8 h-8 rounded-sm m-0.5 ${
                          data?.level === 0 ? 'bg-gray-100' :
                          data?.level === 1 ? 'bg-green-200' :
                          data?.level === 2 ? 'bg-green-300' :
                          data?.level === 3 ? 'bg-green-400' :
                          'bg-green-500'
                        }`}
                        title={data ? `${data.contributions} contributions on ${data.date.toDateString()}` : 'No contributions'}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Visualization Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Success Rate Trend */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Success Rate Trend</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={successRateData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="rate" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Problem Types Distribution */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Problem Types</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={problemTypes}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Difficulty Distribution */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Problems by Difficulty</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={difficultyData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {difficultyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Submissions Timeline */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Submissions Timeline</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={successRateData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="submissions" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={{ fill: '#10b981' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Submissions */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Recent Submissions</h2>
        <div className="space-y-4">
          {recentSubmissions.map((submission) => (
            <div 
              key={submission.id}
              className="flex items-center justify-between border-b pb-4"
            >
              <div>
                <h3 className="font-medium">{submission.problem}</h3>
                <p className="text-sm text-gray-600">{submission.time}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`text-sm px-2 py-1 rounded ${
                  submission.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                  submission.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {submission.difficulty}
                </span>
                <span className={`text-sm font-medium ${
                  submission.status === 'Accepted' ? 'text-green-600' :
                  submission.status === 'Wrong Answer' ? 'text-red-600' :
                  'text-yellow-600'
                }`}>
                  {submission.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
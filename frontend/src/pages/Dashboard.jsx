import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import ProgressRing from '../components/ProgressRing'
import { FiDroplet, FiActivity, FiTrendingUp } from 'react-icons/fi'
import { GiMeal } from 'react-icons/gi'

const Dashboard = () => {
  const { user } = useAuth()
  const [dashboard, setDashboard] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboard()
  }, [])

  const fetchDashboard = async () => {
    try {
      const response = await axios.get('/api/user/dashboard')
      setDashboard(response.data.dashboard)
    } catch (error) {
      console.error('Error fetching dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  const calorieProgress = dashboard?.today?.meals?.calories || 0
  const calorieGoal = user?.goals?.dailyCalories || 2000
  const caloriePercentage = Math.min((calorieProgress / calorieGoal) * 100, 100)

  const waterProgress = dashboard?.today?.waterIntake || 0
  const waterGoal = user?.goals?.dailyWater || 8
  const waterPercentage = Math.min((waterProgress / waterGoal) * 100, 100)

  const stepsProgress = dashboard?.today?.steps || 0
  const stepsGoal = user?.goals?.dailySteps || 10000
  const stepsPercentage = Math.min((stepsProgress / stepsGoal) * 100, 100)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Here's your fitness overview for today
          </p>
        </motion.div>

        {/* Progress Rings */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="card text-center"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Calories
            </h3>
            <ProgressRing
              progress={caloriePercentage}
              size={180}
              color="#3b82f6"
              label="Consumed"
              value={calorieProgress}
              goal={calorieGoal}
            />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
              {calorieGoal - calorieProgress > 0 
                ? `${calorieGoal - calorieProgress} cal remaining`
                : 'Goal reached! 🎉'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="card text-center"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Water Intake
            </h3>
            <ProgressRing
              progress={waterPercentage}
              size={180}
              color="#10b981"
              label="Glasses"
              value={waterProgress}
              goal={waterGoal}
            />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
              {waterGoal - waterProgress > 0 
                ? `${waterGoal - waterProgress} glasses to go`
                : 'Well hydrated! 💧'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="card text-center"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Steps
            </h3>
            <ProgressRing
              progress={stepsPercentage}
              size={180}
              color="#8b5cf6"
              label="Steps"
              value={stepsProgress}
              goal={stepsGoal}
            />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
              {stepsGoal - stepsProgress > 0 
                ? `${stepsGoal - stepsProgress} steps to go`
                : 'Goal crushed! 🚀'}
            </p>
          </motion.div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Meals Today</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {dashboard?.today?.meals?.count || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <GiMeal className="text-2xl text-blue-500" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="card"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Workouts</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {dashboard?.today?.workouts?.count || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <FiActivity className="text-2xl text-green-500" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="card"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Calories Burned</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {dashboard?.today?.workouts?.caloriesBurned || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                <FiTrendingUp className="text-2xl text-orange-500" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="card"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">BMI</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {dashboard?.user?.bmi || '--'}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <FiActivity className="text-2xl text-purple-500" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

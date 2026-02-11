// Workouts page - Add workout tracking functionality here
// Features: Log workouts, view workout history, track calories burned
import { motion } from 'framer-motion'

const Workouts = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900 dark:text-white mb-8"
        >
          Workouts Tracker
        </motion.h1>
        <div className="card">
          <p className="text-gray-600 dark:text-gray-400">
            Workout tracking functionality coming soon...
          </p>
        </div>
      </div>
    </div>
  )
}

export default Workouts

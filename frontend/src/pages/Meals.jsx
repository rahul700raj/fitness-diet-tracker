// Meals page - Add meal tracking functionality here
// Features: Add meals, view meal history, nutrition breakdown
import { motion } from 'framer-motion'

const Meals = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900 dark:text-white mb-8"
        >
          Meals Tracker
        </motion.h1>
        <div className="card">
          <p className="text-gray-600 dark:text-gray-400">
            Meal tracking functionality coming soon...
          </p>
        </div>
      </div>
    </div>
  )
}

export default Meals

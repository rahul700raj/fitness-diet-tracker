// Premium page - Add subscription features here
// Features: Premium plans, payment integration, feature comparison
import { motion } from 'framer-motion'
import { FiCheck, FiStar } from 'react-icons/fi'

const Premium = () => {
  const features = [
    'Unlimited meal logging',
    'Advanced analytics & insights',
    'Custom diet plans',
    'Workout recommendations',
    'Priority support',
    'Ad-free experience'
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Upgrade to Premium
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Unlock all features and take your fitness journey to the next level
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-md mx-auto"
        >
          <div className="card bg-gradient-to-br from-blue-500 to-green-500 text-white">
            <div className="text-center mb-6">
              <FiStar className="text-5xl mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-2">Premium Plan</h2>
              <div className="text-5xl font-bold mb-2">₹299<span className="text-xl">/month</span></div>
              <p className="opacity-90">or ₹2,999/year (save 17%)</p>
            </div>

            <div className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <FiCheck className="text-2xl flex-shrink-0" />
                  <span className="text-lg">{feature}</span>
                </div>
              ))}
            </div>

            <button className="w-full bg-white text-blue-600 font-bold py-4 rounded-lg text-lg hover:bg-gray-100 transition-all">
              Upgrade Now
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Premium

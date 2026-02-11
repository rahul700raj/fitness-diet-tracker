// Profile page - Add user profile management here
// Features: Update personal info, view stats, manage account
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

const Profile = () => {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900 dark:text-white mb-8"
        >
          Profile
        </motion.h1>
        <div className="card">
          <div className="text-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mx-auto flex items-center justify-center text-white text-4xl font-bold mb-4">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{user?.name}</h2>
            <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-center">
            Profile management functionality coming soon...
          </p>
        </div>
      </div>
    </div>
  )
}

export default Profile

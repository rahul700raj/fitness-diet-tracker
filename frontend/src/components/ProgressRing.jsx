import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const ProgressRing = ({ 
  progress, 
  size = 200, 
  strokeWidth = 15, 
  color = '#3b82f6',
  label = '',
  value = 0,
  goal = 0
}) => {
  const [animatedProgress, setAnimatedProgress] = useState(0)
  
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (animatedProgress / 100) * circumference

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progress)
    }, 100)
    return () => clearTimeout(timer)
  }, [progress])

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-gray-200 dark:text-gray-700"
        />
        
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="progress-ring-circle"
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="text-center"
        >
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {Math.round(animatedProgress)}%
          </div>
          {label && (
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {label}
            </div>
          )}
          {goal > 0 && (
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              {value} / {goal}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default ProgressRing

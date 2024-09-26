import React, { useState} from "react"
import { motion } from 'framer-motion'
import '../css/feedback.css'


export default function Feedback() {
    const [feedback, setFeedback] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)
  
    const handleSubmit = (e) => {
      e.preventDefault()
      // Here you would typically send the feedback to your server
      console.log('Feedback submitted:', feedback)
      setIsSubmitted(true)
    }
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md"
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl font-bold text-center text-gray-800 mb-6"
          >
            Payment Successful!
          </motion.h1>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5, type: 'spring' }}
            className="text-green-500 text-6xl mb-6 flex justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </motion.div>
          {!isSubmitted ? (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <h2 className="text-xl font-semibold text-gray-700 text-center">We'd love your feedback!</h2>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Please share your experience with our platform..."
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Submit Feedback
              </button>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center text-xl text-green-600 font-semibold"
            >
              Thank you for your feedback!
            </motion.div>
          )}
        </motion.div>
      </div>
    )
  }
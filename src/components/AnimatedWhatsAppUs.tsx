'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import WhatsAppUs from '@/components/WhatsAppUs'

const AnimatedWhatsAppUs = () => {
  const [clicked, setClicked] = useState(false)

  return (
    <div className="fixed bottom-5 right-5">
      <motion.div
        onTap={() => setClicked(true)}
        whileHover={{ rotate: 0, transition: { duration: 0 } }} // Stops animation immediately on hover
        animate={clicked ? { rotate: 0 } : { rotate: [0, 10, -10, 10, 0, 0] }}
        transition={{
          repeat: clicked ? 0 : Infinity,
          repeatType: 'loop',
          duration: 2,
          times: [0, 0.05, 0.1, 0.15, 0.2, 1], // Defines shake and pause timing
          ease: ['easeInOut', 'easeInOut', 'easeInOut', 'easeInOut', 'linear'], // Smooth transitions
          delay: 1, // Delay before starting the animation
        }}
      >
        <WhatsAppUs link="https://wa.me/85293098317" />
      </motion.div>
    </div>
  )
}

export default AnimatedWhatsAppUs


// Import  hooks and utilities from React and framer-motion
import React, { useEffect, useRef, useState } from 'react'
import {
  motion,
  useAnimation,
  AnimatePresence,
} from 'framer-motion/dist/framer-motion'

function useOnScreen(ref, rootMargin = '0px') {
  const [isIntersecting, setIntersecting] = useState(false)

    // Effect hook to observe changes in intersection status with the viewport
  useEffect(() => {
    let currentRef = null
    const observer = new IntersectionObserver(
      ([entry]) => {

                // Updates state based on whether the observed element is intersecting
        setIntersecting(entry.isIntersecting)
      },
      {
        rootMargin,
      }
    )
    if (ref.current) {
      currentRef = ref.current
      observer.observe(currentRef)
    }
    return () => {
      observer.unobserve(currentRef)
    }
  }, [ref, rootMargin])

  return isIntersecting
}
// Functional component that animates its children when they scroll into view
const LazyShow = (props) => {
  const controls = useAnimation()
  const rootRef = useRef()
  const onScreen = useOnScreen(rootRef)
  useEffect(() => {
    if (onScreen) {
      controls.start({
        x: 0,
        opacity: 1,
        transition: {
          duration: 1,
          ease: 'easeOut',
        },
      })
    }
  }, [onScreen, controls])
  return (
    <AnimatePresence>
      <motion.div
        className="lazy-div"
        ref={rootRef}
        initial={{ opacity: 0, x: -10 }}
        animate={controls}
      >
        {props.children}
      </motion.div>
    </AnimatePresence>
  )
}
// Export the LazyShow component for use in other parts of the application
export default LazyShow

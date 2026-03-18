'use client'

import { useRouter } from 'next/navigation'
import { HiOutlineArrowLeft } from 'react-icons/hi'

const BackButton = () => {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <button
      onClick={handleBack}
      className="p-3 cursor-pointer rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
      aria-label="Go back"
    >
      <HiOutlineArrowLeft className="w-5 h-5 text-accent group-hover:text-primary transition-colors duration-300" />
    </button>
  )
}

export default BackButton
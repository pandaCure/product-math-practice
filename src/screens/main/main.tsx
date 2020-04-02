import React from 'react'
import NewMathPractice from '@/components/NewMathPractice'
import NewMathPracticeByClassName from '@/components/NewMathPracticeByClassName/NewMathPracticeByClassName'
const MainScreen = () => {
  return (
    <div>
      <NewMathPractice types="divStateLevel2" />
      {/* <NewMathPracticeByClassName /> */}
    </div>
  )
}
export default MainScreen

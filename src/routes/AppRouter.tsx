import { Route, Routes } from 'react-router-dom'
import { MainScreen } from '../components/screens/MainScreen/MainScreen'
import { Backlog } from '../components/screens/Backlog/Backlog'
import { Sprints } from '../components/screens/Sprints/Sprints'


export const AppRoutes = () => {
  return (
    <>
    <MainScreen/>
    <Routes>
      <Route path='/' element={<Backlog/>}/>
      <Route path='/sprint' element={<Sprints/>}/>
      <Route path='/backlog' element={<Backlog/>}/>
    </Routes>
    </>
  )
}

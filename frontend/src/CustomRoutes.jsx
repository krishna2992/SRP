import React from 'react'
import { Routes, Route } from 'react-router-dom'
import StudentHome from './Student/Home/StudentHome'
import Login from './pages/Login/Login'
import ElectiveMain from './Student/StudentCourse/Electives'
import Course from './Student/CourseContent/Course'
import AcadPage from './Student/StudentAcad/Acad';
import LeaveApplication from './Student/StudentAcad/LeaveApplication'
import PaymentList from './Student/Finance/PaymentList'
import NewPayment from './Student/Finance/NewPayment'
import PrintToPDF from './Test3'
import Result_Main from './Student/Results/Result_main'
import BonafideSubmitPage from './Student/StudentAcad/Bonafide'
import ChangePassword from './components/Password/ChangePassword'
const CustomRoutes = () => {
    return (
      <div>
            <Routes>
              <Route  path="/student/home" element={<StudentHome/>}></Route>
              <Route exact path='/' element={<Login/>}></Route>
              <Route path='change/password' element={<ChangePassword/>}></Route>
              <Route  path='/student/electives' element={<ElectiveMain/>}></Route>
              <Route  path='/student/course/:code' element={<Course/>}></Route>
              <Route  path='/student/acad' element={<AcadPage/>}></Route>
              <Route  path='/student/acad/leave' element={<LeaveApplication/>}></Route>
              <Route path='/student/finance' element={<PaymentList/>}></Route>
              <Route path='/student/payment/new' element={<NewPayment/>}></Route>
              <Route path='/student/result' element={<Result_Main/>}></Route>
              <Route path='/test' element={<PrintToPDF/>}></Route>
              <Route path='/student/bonafide' element={<BonafideSubmitPage/>}></Route>
              {/* <Route path='/student/elective/initialchoice' element={<ChoiceList/>}></Route> */}
              {/* <Route path='/test/choice' element={<ElectiveSelection/>}></Route> */}
              {/* <Route index element={<div>Default Page Content</div>}></Route> */}
            </Routes>
      </div>
    )
}

export default CustomRoutes;
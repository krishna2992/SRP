import React from 'react';
import { Routes, Route} from 'react-router-dom'
import TeacherElectives from './Teacher/TeacherElectives';
import TeacherCourse from './Teacher/TeacherCourse';
import Verification from './AcadOffice/Verification/Verification';
import StudentPayments from './AcadOffice/Verification/PaymentVerification';
import FileUpload from './Teacher/CourseUpload';
import VerifyStudentElectives from './Teacher/VerifyStudent';
import VerifyEachStudent from './Teacher/EachStudentVerify';
// import TeacherHome from './Teacher/TeacherHome';
import SubjectsAndStudents from './AcadOffice/ElectiveDistribution/ElectiveStudent';
import LeaveList from './AcadOffice/Leave/LeaveList';
import BonafideApplicationList from './AcadOffice/Bonafide/BonafideList';
const CustomRoutesTeacher = () =>{
    return(
        <div>
            <Routes>
                <Route  path='/teacher/home' element={<TeacherElectives/>}></Route>
                <Route  path='/teacher/classes' element={<TeacherElectives/>}></Route>  
                <Route  path='/teacher/course/:code' element={<TeacherCourse/>}></Route>
                <Route  path='/teacher/verify/student' element={<VerifyStudentElectives/>}></Route>
                <Route  path='/teacher/verify/student/:id' element={<VerifyEachStudent/>}></Route>
                <Route path='/acad/verify/students' element={<Verification/>}></Route>
                <Route path='/acad/verify/student/:id' element={<StudentPayments/>}></Route>
                <Route path='/acad/electives/students' element={<SubjectsAndStudents/>}></Route>
                <Route path='/teacher/post/upload/:code' element={<FileUpload/>}></Route>
                <Route path='/acad/leave' element={<LeaveList/>}></Route>
                <Route path='/acad/bonafide' element={<BonafideApplicationList/>}></Route>
            </Routes>
        </div>
    )
};

export default CustomRoutesTeacher;
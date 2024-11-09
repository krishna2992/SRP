import axios from 'axios'

const api = axios.create({baseURL:'http://localhost:8000/'})

api.interceptors.request.use((req) =>{
    if(localStorage.getItem("Access")){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('Access'))}`
    }
    return req;
})

// Authentication
export const logIn = (authData) => api.post('/user/login', authData);

// Payments
export const getPayments = (pk) => api.get(`/finance/student/payment/${pk}`);
export const submitPayment = (student_id, paymentData) => api.post(`/finance/student/payment/${student_id}`, paymentData);

// Posts
export const getPosts = (sub_id) => api.get(`/book/posts/subjects/${sub_id}`);

export const submitPost = (sub_id, postData) => api.post(`/book/posts/subjects/${sub_id}`, postData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
  });

// Results
export const getResults = (student_id) => api.get(`/user/students/result/${student_id}`)

//Token Refresh
export const refreshToken = (data) => api.post('/user/token/refresh', data);

//Unverified Students

export const getUnverifiedStudents = () =>api.get('/user/teacher/students');

export const signStudent = (data) => api.post('/user/teacher/students/sign', data);

//

export const postStudentsElecties = (data) => api.post('/user/student/subject_wise/students', data);
export const distibuteElectives = (data) => api.post('/user/acad/distribute/students/elective', data);

//submit initial submit

export const initialChoiceSubmit = (data) => api.post('/user/student/initial/choices', data)

//

export const getOptionSubjects = (data) => api.post('/book/option/electives', data)

export const getBacklogs = (pk) => api.get(`/book/student/backlogs/${pk}`);

export const submitStudentElectives = (pk, userData) => api.post(`/book/student/submit/electives/${pk}`, userData);

//personal Update

export const personalUpdate = (pk, userData) => api.post(`/book/student/personal/update/${pk}`, userData)

//paidStduents

export const getPaidStudents = () => api.get('/finance/acad/paid/students')

export const deletePost = (pk) => api.delete(`/book/teacher/delete/post/${pk}`)


//Sign Financial Verification

export const signStudentFinance = (pk) => api.post(`/finance/verify/student/payments/${pk}`)

//leave

export const submitLeave = (data) => api.post('/applications/leave/submit', data, {
  headers: {
    'Content-Type': 'multipart/form-data'
  },
})

export const changeStatus = (pk, data) => api.put(`applications/leave/status/change/${pk}`, data);

export const submitBonafideApplication = (userData) =>api.post('applications/bonafide/submit', userData)

export const getBonafideApplications = (statusFilter) => api.get(`applications/bonafides?status=${statusFilter}`)

export const getLeaveApplications = (statusFilter) => api.get(`applications/leaves?status=${statusFilter}`)

export const changeBonafideStatus = (pk, data) => api.put(`applications/bonafide/status/change/${pk}`, data);
// export const changeBonafideStatus = (pk, data) => console.log(data)


//change password

export const changePassword = (userData) => api.post('user/change/password', userData)
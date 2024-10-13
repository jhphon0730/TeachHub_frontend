"use client"

import React from 'react'
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

import Loading from "@/components/Loading"
import DashboardInfo from "@/components/dashboard/DashboardInfo"
import CreateCourseModal from "@/components/dashboard/CreateCourseModal"
import DashboardInfoHeader from "@/components/dashboard/DashboardInfoHeader"

import { AppDispatch, RootState } from '@/store';
import { getInitialStudentDashboard, getInitialInstructorDashboard } from '@/store/dashboardSlice';
import { 
	CourseModel,
	GetCourseByInstructorID, GetCourseByStudentID,
} from '@/lib/api/dashboard'

const DashboardPage = () => {
	const router = useRouter()
	const dispatch = useDispatch<AppDispatch>()
  const user = useSelector((state: RootState) => state.auth.user)
	const { initial_student, initial_instructor, loading, error } = useSelector((state: RootState) => state.dashboard)

	const [courses, setCourses] = React.useState<CourseModel[] | null>(null)

  React.useEffect(() => {
    if (!user) {
			return
		}

		if (user.role === 'student') {
			dispatch(getInitialStudentDashboard());
			getCoursesByStudentID()
		} else if (user.role === 'instructor') {
			dispatch(getInitialInstructorDashboard());
			getCourseByInstructorID()
		}
  }, [user, dispatch]);

	if ( !user ) return <Loading />

	/* 강사 ID로 강의/강좌 조회 */
	const getCourseByInstructorID = async (): Promise<void> => {
		const res = await GetCourseByInstructorID(user.id)
		if (res.status != 'success') {
			await Swal.fire({
				icon: 'error',
				title: 'Failed to get courses',
				text: res.message,
			})
			return
		}
		setCourses(() => res.data)
	}

	/* 학생 ID로 강의/강좌 조회 */
	const getCoursesByStudentID = async (): Promise<void> => {
		const res = await GetCourseByStudentID()
		if (res.status != 'success') {
			await Swal.fire({
				icon: 'error',
				title: 'Failed to get courses',
				text: res.message,
			})
			return
		}
		setCourses(() => res.data)
	}

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Welcome to TeachHub, {user.role}!</h1>
			{ user.role == "student" && initial_student && (
				<React.Fragment>
					<DashboardInfoHeader
						role={user.role}
						total_courses={initial_student.total_course_count}
						total_students={initial_student.total_student_count}
						total_instructors={initial_student.total_instructor_count} 
						my_course_count={initial_student.my_course_count}/>
					<DashboardInfo 
						role={user.role} 
						courses={courses} /> 
				</React.Fragment>
				)}

			{ user.role == "instructor" && initial_instructor && (
				<React.Fragment>
					<CreateCourseModal />
					<DashboardInfoHeader
						role={user.role}
						total_courses={initial_instructor.total_course_count}
						total_students={initial_instructor.total_student_count}
						total_instructors={initial_instructor.total_instructor_count}
						my_course_count={initial_instructor.my_course_count} />
					<DashboardInfo 
						role={user.role}
						courses={courses} /> 
				</React.Fragment>
			)}
			{ loading && <Loading /> }
		</div>
  )
}

export default DashboardPage

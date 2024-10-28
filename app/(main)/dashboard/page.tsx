"use client"

import React from 'react'
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

import Loading from "@/components/Loading"
import DashboardInfo from "@/components/dashboard/DashboardInfo"
import DashboardInfoHeader from "@/components/dashboard/DashboardInfoHeader"
import CreateCourseModal from "@/components/dashboard/course/CreateCourseModal"
import AddStudentToCourseModal from "@/components/dashboard/course/AddStudentToCourseModal"

import { AppDispatch, RootState } from '@/store';
import { getInitialStudentDashboard, getInitialInstructorDashboard } from '@/store/dashboardSlice';
import { 
	CourseModel,
	GetCourseByInstructorID, GetCourseByStudentID,
	CreateCourse,
	AddStudentToCourse,
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
			getCoursesByStudentID()
		} else if (user.role === 'instructor') {
			getCourseByInstructorID()
		}
  }, [user?.role]);

	if ( !user ) return <Loading />

	/* 강사 ID로 강의/강좌 조회 */
	const getCourseByInstructorID = async (): Promise<void> => {
		const initial_res = await dispatch(getInitialInstructorDashboard()).unwrap();
		if (initial_res.status != 'success') {
			await Swal.fire({
				icon: 'error',
				title: 'Failed to get initial student dashboard',
				text: initial_res.message,
			})
			router.refresh()
			return
		}
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
		const initial_res = await dispatch(getInitialStudentDashboard()).unwrap();
		if (initial_res.status != 'success') {
			await Swal.fire({
				icon: 'error',
				title: 'Failed to get initial student dashboard',
				text: initial_res.message,
			})
			router.refresh()
			return
		}
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

	/* Course ( 강의 중에서 id만 배열로 추출 ) */
	const getCourseIDList = (): {label: string, value: string}[] | null => {
		if (!courses || !courses.length) {
			Swal.fire({
				icon: 'error',
				title: 'No courses found',
				text: 'Please create a course first',
			})
			return null
		}

		if (user.role !== 'instructor') {
			Swal.fire({
				icon: 'error',
				title: 'Invalid role',
				text: 'Only instructors can create courses',
			})
			return null
		}

		const course_id_list = courses.map((course) => { return { label: course.title, value: course.id.toString() } })
		return course_id_list
	}

	/* 강사가 새로운 강의/강좌를 추가 */
	const createNewCourse = async (data: Record<string, string>): Promise<void> => {
		const res = await CreateCourse(data['title'], data['description'])
		if (res.status != 'success') {
			await Swal.fire({
				icon: 'error',
				title: 'Failed create courses',
				text: res.message
			})
			router.refresh()
		}
		await Swal.fire({
			icon: 'success',
			title: 'Success',
			text: 'Successfully created a new course',
			timer: 1000,
			showConfirmButton: false,
		})
		getCourseByInstructorID()
		return
	}

	/* 학생을 특정 강의/강좌에 추가 */
	const addStudentToCourse = async (data: Record<string, string>): Promise<void> => {
		const res = await AddStudentToCourse(parseInt(data['course_id']), data['student_username'])
		if (res.status != 'success') {
			await Swal.fire({
				icon: 'error',
				title: 'Failed to add student to course',
				text: res.message,
				timer: 1000,
			})
			return
		}
		await Swal.fire({
			icon: 'success',
			title: 'Success',
			text: 'Successfully added student to course',
			timer: 1000,
		})
		getCourseByInstructorID()
	}

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Welcome to TeachHub, {user.role}!</h1>

			{/* STUDENT UI */}
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
						courses={courses} 
						getCourse={getCoursesByStudentID}
					/> 
				</React.Fragment>
				)}

			{/* INSTRUCTOR UI */}
			{ user.role == "instructor" && initial_instructor && (
				<React.Fragment>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-4" >
						<CreateCourseModal 
							createHandler={createNewCourse} />
						<AddStudentToCourseModal 
							addStudentToCourseHandler={addStudentToCourse}
							getCourseIDList={getCourseIDList}/>
					</div>
					<DashboardInfoHeader
						role={user.role}
						total_courses={initial_instructor.total_course_count}
						total_students={initial_instructor.total_student_count}
						total_instructors={initial_instructor.total_instructor_count}
						my_course_count={initial_instructor.my_course_count} />
					<DashboardInfo 
						role={user.role}
						courses={courses} 
						getCourse={getCourseByInstructorID}
					/> 
				</React.Fragment>
			)}
			{ loading && <Loading /> }
		</div>
  )
}

export default DashboardPage

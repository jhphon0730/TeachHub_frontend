import { fetchWithAuth } from "@/lib/request";
import { Response } from "@/lib/response";

export interface CourseModel {
	id: number;
	instructor_id: number;
	title: string;
	description: string;
	created_at: string;
	updated_at: string;
}

interface InitialDashboardModel {
	total_course_count: number;
	total_instructor_count: number;
	total_student_count: number;
}

/** 학생의 정보로 Dashboard 기본 정보를 조회 */
export interface InitialStudentDashboardModel extends InitialDashboardModel { }
export const GetInitialStudentDashboard = async (): Promise<Response<InitialStudentDashboardModel>> => {
	const data = await fetchWithAuth('/dashboard/student/initial', {
		method: 'GET'
	})
	return {
		message: data.message,
		data: data.data,
		status: data.status
	}
}

/** 강사의 정보로 Dashboard 기본 정보를 조회 */
export interface InitialInstructorDashboardModel extends InitialDashboardModel {
	my_course_count: number;
}
export const GetInitialInstructorDashboard = async (): Promise<Response<InitialInstructorDashboardModel>> => {
	const data = await fetchWithAuth('/dashboard/instructor/initial', {
		method: 'GET'
	})
	return {
		message: data.message,
		data: data.data,
		status: data.status
	}
}

/** 사용가 강사라면 본인이 갖고 있는 강의들 조회 */
export const GetCourseByInstructorID = async (instructor_id: number): Promise<Response<CourseModel[] | null>> => {
	const data = await fetchWithAuth(`/course/instructor?instructor_id=${instructor_id}`, {
		method: 'GET'
	})
	return {
		message: data.message,
		data: data.data,
		status: data.status
	}
}

/** 학생 속한 강좌/강의들 조회 */
export const GetCourseByStudentID = async (): Promise<Response<CourseModel[] | null>> => {
	const data = await fetchWithAuth(`/course/student`, {
		method: 'GET'
	})
	return {
		message: data.message,
		data: data.data,
		status: data.status
	}
}

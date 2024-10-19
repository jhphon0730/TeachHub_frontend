import { fetchWithAuth } from "@/lib/request";
import { Response } from "@/lib/response";

export interface CourseModel {
	id: number;
	instructor_id: number;
	title: string;
	description: string;
	created_at: string;
	updated_at: string;
	student_count: number;
}

interface InitialDashboardModel {
	total_course_count: number;
	total_instructor_count: number;
	total_student_count: number;
	my_course_count: number;
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

/** 강사가 새로운 강의를 생성 */
export const CreateCourse = async (title: string, description: string): Promise<Response<null>> => {
	const data = await fetchWithAuth('/course', {
		method: 'POST',
		body: JSON.stringify({ title, description })
	})
	return {
		message: data.message,
		data: data.data,
		status: data.status
	}
}

/** 사용가 강사라면 본인이 갖고 있는 강의들 조회 */
export const GetCourseByInstructorID = async (instructor_id: number): Promise<Response<CourseModel[] | null>> => {
	const data = await fetchWithAuth(`/enrollment/instructor?instructor_id=${instructor_id}`, {
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
	const data = await fetchWithAuth(`/enrollment/student`, {
		method: 'GET'
	})
	return {
		message: data.message,
		data: data.data,
		status: data.status
	}
}

/** 강사가 학생<Username>으로 강의/강좌에 학생을 등록 */
export const AddStudentToCourse = async (course_id: number, student_username: string): Promise<Response<null>> => {
	const data = await fetchWithAuth(`/enrollment/student`, {
		method: 'POST',
		body: JSON.stringify({ course_id, student_username })
	})
	return {
		message: data.message,
		data: data.data,
		status: data.status
	}
}

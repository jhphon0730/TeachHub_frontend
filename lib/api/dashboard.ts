import { fetchWithAuth } from "@/lib/request";
import { Response } from "@/lib/response";

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

import { fetchWithoutAuth } from "@/lib/request";
import { Response } from "@/lib/response";

interface InitialDashboardModel {
	totalStudentCount: number;
	totalInstructorCount: number;
	totalCourseCount: number;
}

/** 학생의 정보로 Dashboard 기본 정보를 조회 */
export interface InitialStudentDashboardModel extends InitialDashboardModel { }
export const GetInitialStudentDashboard = async (): Promise<Response<InitialStudentDashboardModel>> => {
	const data = await fetchWithoutAuth('dashboard/student/initial', {
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
	myCourseCount: number;
}
export const GetInitialInstructorDashboard = async (): Promise<Response<InitialInstructorDashboardModel>> => {
	const data = await fetchWithoutAuth('dashboard/instructor/initial', {
		method: 'GET'
	})
	return {
		message: data.message,
		data: data.data,
		status: data.status
	}
}

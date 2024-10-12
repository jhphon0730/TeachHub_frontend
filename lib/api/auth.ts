import { fetchWithoutAuth } from "@/lib/request";
import { Response } from "@/lib/response";

export interface UserModel {
	id: number	
	username: string
	email: string
	password: string
	bio: string // can be empty
	role: 'student' | 'instructor' | 'admin' /* string */
	created_at: string
	updated_at: string
}

/** Login */
export type LoginFormModel = {
	username: string
	password: string
}
type ResponseLoginUser = {
	user: UserModel | null
	token: string | null
}
export const RequestLogin = async ({ username, password }: LoginFormModel): Promise<Response<ResponseLoginUser | null>> => {
	const data = await fetchWithoutAuth('/login', {
		method: 'POST',
		body: JSON.stringify({ username, password })
	})
	return {
		message: data.message,
		data: data.data,
		status: data.status
	}
}

/** Register */
export type RegisterFormModel = {
	email: string 
	username: string 
	password: string 
}
export type ResponseRegister = null
export const RequestRegister = async ({ email, username, password }: RegisterFormModel): Promise<Response<ResponseRegister>> => {
	const data = await fetchWithoutAuth('/register', {
		method: 'POST',
		body: JSON.stringify({ email, username, password })
	})
	return {
		message: data.message,
		data: data.data,
		status: data.status
	}
}

/** Update */
export type UpdateFormModel = {
	username: string
	email: string
	bio: string
	password: string
}
export type ResponseUpdate = null
export const RequestUpdate = async ({ username, email, bio, password }: UpdateFormModel): Promise<Response<ResponseUpdate>> => {
	const data = await fetchWithoutAuth('/update', {
		method: 'PATCH',
		body: JSON.stringify({ username, email, bio, password })
	})
	return {
		message: data.message,
		data: data.data,
		status: data.status
	}
}

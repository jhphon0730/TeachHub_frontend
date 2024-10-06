import { fetchWithoutAuth } from "@/lib/request";
import { Response } from "@/lib/response";

export interface UserModel {
	id: number	
	username: string
	email: string
	password: string
	createdat: string
	updatedat: string
}

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
		Message: data.message,
		Data: data.data,
		Status: data.status
	}
}

export type RegisterFormModel = {
	email: string 
	username: string 
	password: string 
}
export const RequestRegister = async ({ email, username, password }: RegisterFormModel): Promise<Response<null>> => {
	const data = await fetchWithoutAuth('/register', {
		method: 'POST',
		body: JSON.stringify({ email, username, password })
	})
	return {
		Message: data.message,
		Data: data.data,
		Status: data.status
	}
}

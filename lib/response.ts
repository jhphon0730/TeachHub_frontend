export interface Response<T> {
	status: 'error' | 'success'
	message: string
	data: T
}

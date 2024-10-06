export interface Response<T> {
	Status: 'error' | 'success'
	Message: string
	Data: T
}

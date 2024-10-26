import React from 'react';
import Swal from 'sweetalert2';

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "@/components/ui/select"

import { 
	RemoveStudentToCourse, 
	GetStudentByCourseID, IGetStudentByCourseID
} from '@/lib/api/dashboard'

interface RemoveStudentToCourseModalProps {
	course_id: number
	course_name: string
	getCourse: () => void
}

/* 학생을 강의/강좌에서 제거하는 모달 */
const RemoveStudentToCourseModal = ({course_id, course_name, getCourse}: RemoveStudentToCourseModalProps) => {
	const [isOpen, setIsOpen] = React.useState<boolean>(false)
	const [students, setStudents] = React.useState<IGetStudentByCourseID[] | null>(null)
	const [removeData, setRemoveData] = React.useState<Record<string, string | number>>({})

	const handleOpen = async (): Promise<void> => {
		setRemoveData(() => ({
			student_username: '',
			course_id: course_id,
		}))

		const res = await GetStudentByCourseID(course_id)
		if (res.status !== 'success') {
			Swal.fire({
				icon: 'error',
				title: 'Failed to get students',
				text: res.message,
				timer: 1500,
			})
			return
		}
		console.log(res.data)
		setStudents(() => res.data)
		setIsOpen(() => true)
	}

	const handleClose = () => {
		setIsOpen(() => false)
	}

	/* Select 입력 */
	const handleSelectChange = (value: string) => {
		setRemoveData((prev) => ({
			...prev,
			student_username: value,
		}))
	}

	const handleSubmit = async (): Promise<void> => {
		const { student_username, course_id } = removeData
		if (student_username.toString().trim() === '') {
			await Swal.fire({
				icon: 'error',
				title: 'Failed to remove student to course',
				text: 'Please enter student name',
				timer: 1500,
			})
			return
		}
		const res = await RemoveStudentToCourse(course_id as number, student_username as string)
		if (res.status !== 'success') {
			Swal.fire({
				icon: 'error',
				title: 'Failed to remove student to course',
				text: res.message,
				timer: 1500,
			})
			return
		}
		Swal.fire({
			icon: 'success',
			title: 'Success',
			text: 'Successfully removed student to course',
			timer: 1500,
		})
		getCourse()
		handleClose()
	}

	return (
		<React.Fragment>
			<Button variant="outline" onClick={handleOpen} >Remove Student</Button>

			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>
							Remove Student To Course
						</DialogTitle>
						<DialogDescription>
							Enter the details of the student and course.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="student_username" className="text-center">Student</Label>
							<div className="col-span-3">
								{ students && (
									<Select
										name="student_username"
										onValueChange={handleSelectChange}
									>
										<SelectTrigger>
											<SelectValue>
												{removeData.student_username}
											</SelectValue>
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												{students.map((student, index) => (
													<SelectItem key={index} value={student.user_username}>
														{student.user_username}
													</SelectItem>
												))}
											</SelectGroup>
										</SelectContent>
									</Select>
								)}
							</div>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="course_id" className="text-center">Selected Course Name</Label>
							<Input 
								disabled
								value={course_name}
								className="col-span-3"
							/>
						</div>
					</div>
					<DialogFooter>
						<Button type="submit" onClick={handleSubmit}>Remove Student</Button>
						<Button variant="outline" onClick={handleClose}>Cancel</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</React.Fragment>
	)
}

export default RemoveStudentToCourseModal

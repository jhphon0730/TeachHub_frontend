import React from 'react';

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "@/components/ui/select"

interface RemoveStudentToCourseModalProps {
	course_id: number
	course_name: string
}

/* 학생을 강의/강좌에서 제거하는 모달 */
const RemoveStudentToCourseModal = ({course_id, course_name}: RemoveStudentToCourseModalProps) => {
	const [isOpen, setIsOpen] = React.useState<boolean>(false)
	const [removeData, setRemoveData] = React.useState<Record<string, string | number>>({})

	const handleOpen = () => {
		setRemoveData(() => ({
			student_username: '',
			course_id: course_id,
		}))

		setIsOpen(() => true)
	}

	const handleClose = () => {
		setIsOpen(() => false)
	}

	const handleSubmit = () => {}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target
		setRemoveData((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	const submitHandler = (): void => {
		console.log(removeData)
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
							<Label htmlFor="student_username" className="text-center">Student Name</Label>
							<Input
								type="text"
								id="student_username"
								name="student_username"
								placeholder="Enter student name"
								className="col-span-3"
								value={removeData.student_id} 
								onChange={handleChange}/>
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
						<Button type="submit" onClick={submitHandler}>Add Course</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</React.Fragment>
	)
}

export default RemoveStudentToCourseModal

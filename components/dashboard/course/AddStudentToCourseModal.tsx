import React from 'react';

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "@/components/ui/select"

interface AddStudentToCourseModalProps {
	addStudentToCourseHandler: (data: Record<string, string>) => Promise<void>
	getCourseIDList: () => {label: string, value: string}[] | null
}

const AddStudentToCourseModal = ({addStudentToCourseHandler, getCourseIDList}: AddStudentToCourseModalProps) => {
	const [isOpen, setIsOpen] = React.useState<boolean>(false)
	const [addData, setAddData] = React.useState<Record<string, string>>({
		student_username: '',
		course_id: '',
	})
	const [course_id_list, setCourseIDList] = React.useState<{label: string, value: string}[] | null>(null)

	const handleOpen = () => {
		setAddData(() => ({
			student_username: '',
			course_id: '',
		}))

		const course_id_list = getCourseIDList()
		if (!course_id_list) {
			return
		}
		setCourseIDList(() => course_id_list)
		setIsOpen(() => true)
	}

	const handleClose = () => {
		setIsOpen(() => false)
	}

	/* Input 입력 */
	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target
		setAddData((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	/* Select 입력 */
	const handleSelectChange = (value: string) => {
		setAddData((prev) => ({
			...prev,
			course_id: value,
		}))
	}

	const submitHandler = async (): Promise<void> => {
		await addStudentToCourseHandler(addData)
		handleClose()
	}

	return (
		<React.Fragment>
			<Button variant="outline" onClick={handleOpen}>
				ADD A STUDENT TO COURSE
			</Button>

			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>
							Add Student to Course
						</DialogTitle>
						<DialogDescription>
							Enter the details of the student and course.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="student_username" className="text-start">Student Name</Label>
							<Input
								type="text"
								id="student_username"
								name="student_username"
								placeholder="Enter student name"
								className="col-span-3"
								value={addData.student_id} 
								onChange={handleChange}/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="course_id" className="text-start"> Select Course </Label>
							{ course_id_list && course_id_list.length !== 0 && 
								<div className="col-span-3">
									<Select
										name="course_id"
										value={addData.course_id}
										onValueChange={handleSelectChange}
									>
										<SelectTrigger>
											<SelectValue placeholder={ course_id_list.length === 0 ? "No courses available" : "Select a course" } >
												{addData.course_id ? course_id_list.find((findItem) => findItem.value == addData['course_id'])?.label : "Select a course"}
											</SelectValue>
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												<SelectLabel>Select a course</SelectLabel>
												{course_id_list.map((course_item) => (
													<SelectItem key={course_item.value} value={course_item.value}>
														<SelectLabel>{course_item.label}</SelectLabel>
													</SelectItem>
												))}
											</SelectGroup>
										</SelectContent>
									</Select>
								</div> }
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

export default AddStudentToCourseModal
		

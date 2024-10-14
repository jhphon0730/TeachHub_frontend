"use client"

import React from 'react'
import { PlusCircle } from 'lucide-react'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface CreateCourseModalProps {
	createHandler: (data: Record<string, string>) => Promise<void>
}

const CreateCourseModal = ({ createHandler }: CreateCourseModalProps) => {
	const [isOpen, setIsOpen] = React.useState<boolean>(false)
	const [newCourse, setNewCourse] = React.useState<Record<string, string>>({
		title: '',
		description: '',
	})

	React.useEffect(() => {
		if (isOpen) {
			setNewCourse({
				title: '',
				description: '',
			})
		}
	}, [isOpen])

	/* Open the Modal Handler */
	const handleOpen = () => setIsOpen(true)

	/* Close the Modal Handler */
	const handleClose = () => setIsOpen(false)

	/* Handle the input change */
	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target
		setNewCourse({ ...newCourse, [name]: value })
	}

	/* Add Course Handler */
	const submitHandler = async (): Promise<void> => {
		await createHandler(newCourse)
		handleClose()
	}

	return (
		<React.Fragment>
			<Button variant="outline" className="mb-4" onClick={handleOpen}>
				<PlusCircle size={16} className="me-2"/> 
				Create a new course
			</Button>

			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Add New Course</DialogTitle>
						<DialogDescription>
							Enter the details of the new course.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="course-title" className="text-start">
								Title
							</Label>
							<Input
								id="course-title"
								name="title"
								value={newCourse.title}
								onChange={handleChange}
								className="col-span-3"
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="course-description" className="text-start">
								Description
							</Label>
							<Textarea
								id="course-description"
								name="description"
								value={newCourse.description}
								onChange={handleChange}
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

export default CreateCourseModal;

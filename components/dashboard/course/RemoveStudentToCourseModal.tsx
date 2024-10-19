import React from 'react';

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "@/components/ui/select"

interface RemoveStudentToCourseModalProps {
	course_id: number
}

const RemoveStudentToCourseModal = ({course_id}: RemoveStudentToCourseModalProps) => {
	const [isOpen, setIsOpen] = React.useState<boolean>(false)
	const [removeData, setRemoveData] = React.useState<Record<string, string | number>>({})

	const handleOpen = () => {
		setRemoveData(() => ({
			student_username: '',
			course_id: '',
		}))

		setIsOpen(() => true)
	}

	const handleClose = () => {
		setIsOpen(() => false)
	}

	const handleSubmit = () => {}

	return (
		<React.Fragment></React.Fragment>
	)
}

export default RemoveStudentToCourseModal

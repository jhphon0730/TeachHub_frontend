import React from 'react'
import { Users } from 'lucide-react'

import { Button } from "@/components/ui/button"
import RemoveStudentToCourseModal from './course/RemoveStudentToCourseModal'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { 
	CourseModel,
} from '@/lib/api/dashboard'

interface DashboardInfoProps {
	role: "student" | "instructor" | "admin"
	courses: CourseModel[] | null
	getCourse: () => void
}

const DashboardInfo = ({ role, courses, getCourse }: DashboardInfoProps) => {
	return (
		<Tabs defaultValue="all-courses" className="space-y-4">
			<TabsList>
				<TabsTrigger value="all-courses">All Courses</TabsTrigger>
			</TabsList>

			<TabsContent value="all-courses" className="space-y-4">
				{courses ? courses.map((course, index) => (
					<Card key={index}>
						<CardHeader>
							<CardTitle>{course.title}</CardTitle>
							<CardDescription>{new Date(course.created_at).toLocaleString()}</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="flex justify-between items-center mb-2">{course.description}</div>
							<div className="mt-4 flex justify-between items-center">
								<div className="flex items-center">
									<Users className="mr-2 h-4 w-4 text-muted-foreground" />
									<span className="text-sm text-muted-foreground" >
										{course.student_count}
									</span>
								</div>
								<div className="space-x-2">
									<Button variant="default" size="sm">Continue</Button>
									{ course.student_count != 0 && role == 'instructor' && 
										<RemoveStudentToCourseModal 
											course_id={course.id}
											course_name={course.title}
											getCourse={getCourse} /> 
									}
								</div>
							</div>
						</CardContent>
					</Card>
				)): <div>No courses found</div>}
			</TabsContent>
		</Tabs>
	)
}

export default DashboardInfo

import React from 'react'
import { BookOpen, Users, Award, Clock } from 'lucide-react'

import Loading from "@/components/Loading"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { InitialStudentDashboardModel, InitialInstructorDashboardModel 
} from '@/lib/api/dashboard'

interface DashboardInfoProps {
	role: "student" | "instructor" | "admin"
	total_courses: number
	total_students: number
	total_instructors: number
	initial_student?: InitialStudentDashboardModel
	initial_instructor?: InitialInstructorDashboardModel
}

const DashboardInfo = ({ role, total_courses, total_students, total_instructors, initial_student, initial_instructor }: DashboardInfoProps) => {
	return (
		<React.Fragment>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{total_courses}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Instructor</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{total_instructors}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{total_students}</div>
          </CardContent>
        </Card>
				{ role == "instructor" && <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Course Count</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{initial_instructor?.my_course_count}</div>
          </CardContent>
        </Card> }
      </div>
      
      <Tabs defaultValue="all-courses" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all-courses">All Courses</TabsTrigger>
          <TabsTrigger value="test2">Test 2</TabsTrigger>
          <TabsTrigger value="test3">Test 3</TabsTrigger>
        </TabsList>
        <TabsContent value="all-courses" className="space-y-4">
          {[1, 2].map((_, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>title</CardTitle>
                <CardDescription>Instructor: Name Here</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-2">
									description here
								</div>
                <div className="mt-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Total students count here</span>
                  </div>
                  <Button variant="outline" size="sm">Continue</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="test2">
          <p>Courses in progress will be displayed here.</p>
        </TabsContent>
        
        <TabsContent value="test3">
          <p>Completed courses will be displayed here.</p>
        </TabsContent>
      </Tabs>
		</React.Fragment>
	)
}

export default DashboardInfo

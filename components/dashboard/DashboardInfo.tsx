import React from 'react'
import { Users } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { InitialStudentDashboardModel, InitialInstructorDashboardModel 
} from '@/lib/api/dashboard'

interface DashboardInfoProps {
	role: "student" | "instructor" | "admin"
	courses: []
}

const DashboardInfo = ({ role, courses }: DashboardInfoProps) => {
	return (
		<React.Fragment>
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

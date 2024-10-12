"use client"

import React from 'react'
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { BookOpen, Users, Award, Clock } from 'lucide-react'

import Loading from "@/components/Loading"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { AppDispatch, RootState } from '@/store';
import { getInitialStudentDashboard, getInitialInstructorDashboard } from '@/store/dashboardSlice';

const DashboardPage = () => {
	const router = useRouter()
  const user = useSelector((state: RootState) => state.auth.user)
	const { loading, error } = useSelector((state: RootState) => state.dashboard)

	if ( !user ) return <Loading />

	React.useEffect(() => {
	}, [])

	React.useEffect(() => {
		if (error) {
			Swal.fire({
				icon: 'error',
				title: 'An error occurred',
				text: error || 'error...',
			})
			router.push('/login')
			return
		}
	}, [error])

	const getInitialStudentDashboardData = async (): Promise<void> => {

	}

	const getInitialInstructorDashboardData  = async (): Promise<void> => {

	}

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Welcome to TeachHub, {user.role}!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">...</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">...</div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="all-courses" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all-courses">All Courses</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="all-courses" className="space-y-4">
          {[1, 2].map(() => (
            <Card key={0}>
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
        
        <TabsContent value="in-progress">
          <p>Courses in progress will be displayed here.</p>
        </TabsContent>
        
        <TabsContent value="completed">
          <p>Completed courses will be displayed here.</p>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default DashboardPage

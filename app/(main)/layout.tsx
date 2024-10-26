'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

import Navbar from "@/components/Navbar";

import { RootState } from '@/store';

interface MainLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
}

const MainLayout = ({ children }: MainLayoutProps) => {
	const router = useRouter();
	const user = useSelector((state: RootState) => state.auth).user;

	// 페이지 이동 시에 확인 해주는 backend 추가 예정
	React.useEffect(() => {
		if (!user || !localStorage.getItem('token') || !localStorage.getItem('user')) {
			router.push('/login');
		}
	}, [user])

	return (
		<div className="h-screen w-screen">
			<header className="w-full">
				<Navbar username={user && user.username} />
			</header>
			<main className="container flex flex-col items-center justify-center mx-auto mt-8 p-3 md:p-0">
				{children}
			</main>
		</div>
	)
}

export default MainLayout;

import React from 'react';

import Navbar from "@/components/Navbar";

interface MainLayoutProps extends React.HTMLAttributes<HTMLDivElement> {

}

const MainLayout = ({ children }: MainLayoutProps) => {
	return (
		<div className="h-screen w-screen">
			<header className="w-full">
				<Navbar />
			</header>
			<main className="container flex flex-col items-center justify-center mx-auto">
				{children}
			</main>
		</div>
	)
}

export default MainLayout;

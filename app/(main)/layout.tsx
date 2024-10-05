import React from 'react';

interface MainLayoutProps extends React.HTMLAttributes<HTMLDivElement> {

}

const MainLayout = ({ children }: MainLayoutProps) => {
	return (
		<div>
			<header>Hello WOrld</header>
			<main>
				{children}
			</main>
			<footer></footer>
		</div>
	)
}

export default MainLayout;

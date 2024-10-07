import React from 'react';

interface UserLayoutProps extends React.HTMLAttributes<HTMLDivElement> {

}

const UserLayout = ({ children }: UserLayoutProps) => {
	return (
		<div className="mx-auto flex w-full flex-col justify-center space-y-6 mt-8">
			{children}
		</div>
	)
}

export default UserLayout;

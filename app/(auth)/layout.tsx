import React from 'react';

interface AuthLayoutProps extends React.HTMLAttributes<HTMLDivElement> {

}

const AuthLayout = ({ children }: AuthLayoutProps) => {
	return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center mx-auto">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] p-3">
				{children}
      </div>
    </div>
	)
}

export default AuthLayout;

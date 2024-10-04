import React from 'react'

const SpinnerIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  )
}

const LogoIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => {
	return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
			<path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.86 8.14 6.84" />
			<path d="M22 12c0-4.42-2.86-8.14-6.84-8.98" />
			<path d="M16.18 21.94a9 9 0 0 1-2.12.26" />
			<path d="M12 17.5a4.5 4.5 0 0 1-4.5-4.5" />
			<path d="M12 6.5a9 9 0 0 1 9 9" />
			<path d="M12 6.5a9 9 0 0 0-9 9" />
			<path d="M3.06 21.94a9 9 0 0 1 2.12.26" />
			<path d="M12 17.5a4.5 4.5 0 0 0 4.5-4.5" />
    </svg>
	)
}

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => {
	return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
			<path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.86 8.14 6.84" />
			<path d="M16.18 21.94a9 9 0 0 1-2.12.26" />
			<path d="M12 6.5a9 9 0 0 1 9 9" />
			<path d="M3.06 21.94a9 9 0 0 1 2.12.26" />
    </svg>
	)
}


export const Icons = {
	logo: LogoIcon,
  spinner: SpinnerIcon,
	gitHub: GithubIcon,
	google: GoogleIcon,
}

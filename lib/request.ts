import { getCookie } from '@/lib/utils';

export interface FetchOptions {
	headers?: {[key: string]: any};
	method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
	body?: string;
}

export const fetchWithoutAuth = async (url: string, options: FetchOptions = {} ) => {
	const defaultHeaders = {
		'Content-Type': 'application/json',
	};

	const mergedOptions = {
		...options,
		headers: {
			...defaultHeaders,
			...options.headers,
		},
	};

  const response = await fetch("http://localhost:8080" + url, mergedOptions);
	return await response.json();
}

export const fetchWithAuth = async (url: string, options: FetchOptions = {} ) => {
	const token = getCookie('token');

  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,  // JWT 토큰 추가
  };

  const mergedOptions = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

	try {
		const response = await fetch("http://localhost:8080" + url, mergedOptions);
		return await response.json();
	} catch (error) {
		alert('로그인이 필요합니다.');
		window.location.href = '/login';
		console.error(error);
	}
};


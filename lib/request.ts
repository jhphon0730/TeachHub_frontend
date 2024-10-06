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
	return response.json();
}

export const fetchWithAuth = async (url: string, options: FetchOptions = {} ) => {
  const token = localStorage.getItem('accessToken');  // JWT 토큰을 localStorage에서 가져옴

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

  const response = await fetch("http://localhost:8080" + url, mergedOptions);
  return response.json();
};

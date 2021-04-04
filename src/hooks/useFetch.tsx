import { useEffect, useState } from "react";

export const useFetch = (url: string) => {
	const [state, setState] = useState<{ data: null | any; loading: boolean; error: null | any }>({
		data: null,
		loading: true,
		error: false
	});

	useEffect(() => {
		setState({ ...state, loading: true });
		fetch(`${url}`) //no proxy needed cause all on same server
			.then((res) => res.json())
			.then((data) => setState({ data: data, loading: false, error: null }))
			.catch((reason) => setState({ data: null, loading: false, error: reason }));
		// would cause infinite loop
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [url]);

	console.debug(url, state);
	return state;
};

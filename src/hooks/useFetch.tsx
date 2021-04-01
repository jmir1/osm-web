import { useEffect, useState } from "react";
import { proxyURL } from "../constants/proxy";

export const useFetch = (url: string) => {
	const [state, setState] = useState<{ data: null | any; loading: boolean }>({
		data: null,
		loading: true
	});

	useEffect(() => {
		fetch(`${proxyURL}${url}`)
			.then((res) => res.json())
			.then((data) => setState({ data: data, loading: false }));
	}, [url]);

	return state;
};

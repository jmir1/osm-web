import { useEffect, useState } from "react";
//import { proxyURL } from "../constants/proxy"; //not needed right now

export const useFetch = (url: string) => {
	const [state, setState] = useState<{ data: null | any; loading: boolean }>({
		data: null,
		loading: true
	});

	useEffect(() => {
		fetch(`${url}`) //no proxy needed cause all on same server
			.then((res) => res.json())
			.then((data) => setState({ data: data, loading: false }));
	}, [url]);

	return state;
};

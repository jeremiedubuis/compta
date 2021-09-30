console.log(process.env.NEXT_PUBLIC_API_HOST);

export const apiFetch = async (url: string, options: any = {}) =>
    fetch(process.env.NEXT_PUBLIC_API_HOST + url, {
        headers: {
            'content-type': 'application/json',
            ...(options.headers || {})
        },
        credentials: 'include',
        ...options
    }).then(async (r) => {
        if (r.status > 299) throw await r.json();
        else {
            return r.status !== 204 ? r.json() : null;
        }
    });

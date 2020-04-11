import agent from "superagent";

const BASE_URL = process.env.BACKEND_URL || "http://localhost:4000/api";

export const get = (url, params) => agent.get(BASE_URL + url).query(params);

export const post = (url, data = {}) => agent.post(BASE_URL + url).send(data);

export const patch = (url, data) => agent.patch(BASE_URL + url).send(data);

export const put = (url, data) => agent.put(BASE_URL + url).send(data);

export const delRequest = url => agent.del(BASE_URL + url);

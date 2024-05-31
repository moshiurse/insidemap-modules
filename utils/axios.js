import axios from "axios";

console.log(import.meta.env);
const axiosInstance = axios.create({
    baseURL: 'https://v3.football.api-sports.io/',
    // baseURL: 'https://transfermarkt-db.p.rapidapi.com/v1/',
    headers: {
        'Content-Type': 'application/json',
        'x-rapidapi-host': 'v3.football.api-sports.io',
        // 'x-rapidapi-host': 'transfermarkt-db.p.rapidapi.com',
        // 'x-rapidapi-key': 'ce976d4cb8mshdd00845062a1815p1bf226jsn5013858dfeeb'
        'x-rapidapi-key': 'ea73475f997de3b51287d7add55879ea'
    }
});

export default axiosInstance;
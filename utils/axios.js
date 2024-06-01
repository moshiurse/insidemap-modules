import axios from "axios";

console.log(import.meta.env);
const axiosInstance = axios.create({
    // baseURL: 'https://v3.football.api-sports.io/',
    baseURL: 'https://transfermarkt-db.p.rapidapi.com/v1/',
    headers: {
        'Content-Type': 'application/json',
        'x-rapidapi-host': 'transfermarkt-db.p.rapidapi.com',
        'x-rapidapi-key': 'ce976d4cb8mshdd00845062a1815p1bf226jsn5013858dfeeb'
    }
});

export default axiosInstance;
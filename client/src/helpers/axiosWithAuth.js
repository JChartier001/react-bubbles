import axios from "axios";

export function getToken() {
    return localStorage.getItem('token')
}

export default function() {
    return (
    axios.create({
        baseUrl: 'http://localhost:5000',
        headers: {
            Authorization: getToken()
        }
    })
    )
}
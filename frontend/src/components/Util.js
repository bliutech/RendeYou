export default function backend(endpoint) {
    return "http://localhost:8000" + endpoint;
}

// returns true if session is active, returns false if session has expired
export async function checkSession()
{
    const res = await fetch(backend("/check-session"), {
        method: "POST",
        credentials: "include",
        headers: {
        "Content-Type": "application/json"
        }
    });
    const res_j = await res.json();
    return res_j;
}
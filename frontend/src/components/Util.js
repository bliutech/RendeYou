export default function backend(endpoint) {
    return "http://localhost:8000" + endpoint;
}

// formats date string to confirm with React's yyyy-MM-dd format
export function formatDate(date_str) {
    let date = new Date(date_str);
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    let year = date.getFullYear();

    if (month.length < 2)
    {
        month = '0' + month;
    }  
    if (day.length < 2) 
    {
        day = '0' + day;
    }
    
    return [year, month, day].join('-');
}
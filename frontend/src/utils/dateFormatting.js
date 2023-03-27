
export const dateFormatting=(dateString) =>{
    const date = new Date(dateString);
    const now = new Date();
  
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = String(date.getFullYear()).slice(-2);
  
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    if (
        date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      ) {
        const hoursDifference = Math.floor((now - date) /(1000*60*60));
        return `${hoursDifference} hours ago`;
      } else {
        return `${day}/${month}/${year} at ${hours}:${minutes}`;
      }
  }
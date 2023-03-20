const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '918cbfc66fmsh8337b60dabcfea1p1b51fejsn53a9b8cd1246',
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
    }
};

fetch('https://travel-advisor.p.rapidapi.com/airports/search?query=amman&locale=en_US', options)
.then((response) => response.json())
.then((data) => console.log(data));


const options1 = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '918cbfc66fmsh8337b60dabcfea1p1b51fejsn53a9b8cd1246',
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
    }
};

fetch('https://travel-advisor.p.rapidapi.com/flights/create-session?o1=AMM&d1=LGA&dd1=2023-03-20&currency=USD&ta=1&c=0', options1)
.then((response) => response.json())
.then((data1) => console.log(data1));

const options2 = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '918cbfc66fmsh8337b60dabcfea1p1b51fejsn53a9b8cd1246',
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
    }
};

fetch('https://travel-advisor.p.rapidapi.com/flights/poll?sid=ffc883c4-2ebf-43da-9dd4-e3f726f3b859.1759&so=PRICE&currency=USD&n=15&ns=NON_STOP%2CONE_STOP&o=0', options2)
.then((response) => response.json())
.then((data) => console.log(data));


const options3 = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '918cbfc66fmsh8337b60dabcfea1p1b51fejsn53a9b8cd1246',
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
    }
};

fetch('https://travel-advisor.p.rapidapi.com/flights/get-booking-url?searchHash=amman&Dest=AMM&id=a&Orig=%3CREQUIRED%3E&searchId=%3CREQUIRED%3E', options3)
.then((response) => response.json())
.then((data) => console.log(data));


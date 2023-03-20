let countryCode=""
function gotoNode(val){
    if(val !==""){
        countryCode=val;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '918cbfc66fmsh8337b60dabcfea1p1b51fejsn53a9b8cd1246',
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
        };
        
        fetch(`https://travel-advisor.p.rapidapi.com/flights/create-session?o1=AMM&d1=${countryCode}&dd1=2023-03-20&currency=USD&ta=1&c=0`, options)
        .then((data)=>{
            return data.json();
        }).then((objectData)=>{
            if(objectData !==""){

                const options1 = {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': '918cbfc66fmsh8337b60dabcfea1p1b51fejsn53a9b8cd1246',
                        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
                    }
                };
                
                fetch(`https://travel-advisor.p.rapidapi.com/flights/poll?sid=${objectData.search_params.sid}&so=PRICE&currency=USD&n=15&ns=NON_STOP%2CONE_STOP&o=0`, options1)
                .then((data)=>{
                    return data.json();
                }).then((objectData)=>{
                    console.log(objectData);
                })
            }
        })
        
        
    }
    
}


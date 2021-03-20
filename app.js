window.addEventListener('load',()=> {
    let long;
    let lat;
    let apiId;
    let temptureDegree=document.querySelector('.tempture-degree');
    let temptureDescription=document.querySelector('.tempture-decription');
    let locationTimezone=document.querySelector('.location-timezone');
    let country=document.querySelector('.location p');
    let temptureSection=document.querySelector('.degree-section');
    let temptureType=document.querySelector('.degree-section span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long=position.coords.longitude;
            lat=position.coords.latitude;
            apiId='d10fcfe0451596db8b3ca63ced5ef66e';
            const proxy=`https://cors-anywhere.herokuapp.com/`;

            const api=`${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiId}`;
            
            fetch(api)
            .then(response =>{
                return response.json();
            })

            .then(data=>{
                console.log(data);
                const {temp}  =data.main;
                const {main} =data.weather[0];

                //assign the data
                temptureDegree.textContent=temp;
                temptureDescription.textContent=main;
                locationTimezone.textContent=data.name;
                country.textContent=data.sys.country;

                //Calculate the C <-> F
                let celsious=( temp - 32 ) * (5/9);

                // change the temp to C/F
                temptureSection.addEventListener('click', ()=> {
                    if(temptureType.textContent === "F") {
                        temptureType.textContent= "C";
                        temptureDegree.textContent=Math.floor(celsious);
                    }else{
                        temptureType.textContent= "F";
                        temptureDegree.textContent=temp;
                    }
                })
            })
        });

    }else{

    }
});
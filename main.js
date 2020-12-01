const background = document.querySelector('.background');
const author = document.querySelector(".author");
const icon = document.querySelector('.icon');
const details = document.querySelector('.details');
const period = document.querySelector(".period");
const expand = document.querySelector('.expand');



async function getQuotes (){
    
        const response = await fetch ('https://api.quotable.io/random')

        const quoteRes = await response.json();

        return quoteRes;
    
} getQuotes().then((quoteRes) => {
    console.log(quoteRes)
    const chosenQuote = quoteRes.data;

    document.querySelector('.quote').textContent = quoteRes.content;

    if (quoteRes.author == null) {
		author.textContent = 'Unknown author'
	} else {
		author.textContent = quoteRes.author;
	}
})
.catch(err => {
    console.log(err);
})


// document.getElementsByClassName('refresh').addEventListener('click',  getQuotes)

const getTime= () => {
    let currentTime = new Date();
    let hour = currentTime.getHours();
    let minute= currentTime.getMinutes();

    // console.log(currentTime);

    let greet = '';
    if (hour >= 5 && hour <= 11){
        greet = 'morning';
    } else if( hour >= 12 && hour <= 17){
        greet = 'afternoon';
    } else{
        greet= 'evening'
    }

    console.log(`good ${greet}`)

     document.querySelector('.greeting').textContent = `Good ${greet}`;

    //Bg and icon
	if (hour >= 5 && hour <= 17 ) {
		background.classList.add('day');
		icon.src = './assets/images/icon-sun.svg';
		icon.setAttribute("alt", "sun icon");
	} else {
		background.classList.add('night');
		icon.src = './assets/images/icon-moon.svg';
		icon.setAttribute("alt", "moon icon");
		details.style.color = '#fff';
		details.style.background = 'rgba(0, 0, 0, 0.75)';
    }
    if(minute < 10){
        minute = "0" + minute
        }
      
      if (hour == 12) {
        period.textContent = "pm";
      } else if (hour > 12) {
        hour -= 12;
        period.textContent = "pm";
      } else {
        period.textContent = "am";
        }
        document.querySelector(".time").textContent = `${hour}:${minute}`;
       
        let interval = (60 - (new Date()).getSeconds()) * 1000 + 5;
        setTimeout(getTime,interval)
      }

getTime();

async function getTimeZone (){
  const response = await fetch ('https://worldtimeapi.org/api/ip')

  const timeZoneRes = await response.json();

  return timeZoneRes;

} getTimeZone().then((timeZoneRes) => {
  const region = timeZoneRes.data;

  document.getElementById('timezone').textContent = timeZoneRes.timezone;
  document.getElementById('year-day').textContent = timeZoneRes.day_of_year;
  document.getElementById('week-day').textContent = timeZoneRes.day_of_week;
  document.getElementById('week-number').textContent = timeZoneRes.week_number;
})
.catch(err => console.error(err));

 async function getLocation() {
  const response = await fetch ('https://freegeoip.app/json/')

  const locationRes = await response.json();

  return locationRes;
  
} getLocation().then((locationRes) => {

  console.log(locationRes)
    
    const regionName = locationRes.region_name;
    const countryCode = locationRes.country_code;
    document.querySelector('.current-location').textContent = `in ${regionName}, ${countryCode}`;
  })
  .catch(err => console.error(err));




function showDetails() {
  document.querySelector('.top-part').classList.toggle('transform');
  details.classList.toggle('transform');
  
  if (expand.firstChild.nodeValue === "More") {
    expand.firstChild.nodeValue = "Less"
  } else {
    expand.firstChild.nodeValue = "More"
  }

  const arrow = document.querySelector('.arrow');
  arrow.classList.toggle('rotate');
}
expand.addEventListener('click', showDetails)
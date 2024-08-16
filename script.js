
  const Get = (element)=>document.querySelector(`.${element}`);/*takes className 
  as arguement select the element by className through query Selector and returns it */
  const body = document.querySelector("body");
  const repoCount = Get("repo-count");
  const followCount =Get("follow-count");
  const followingCount =Get("following-count");
  const darkBtn =Get("dark-theme");
  const lightBtn =Get("light-theme");
  const profileContainer =Get("profile-container");
  const inputField =Get("inputField");
  const url = "https://api.github.com/users/";
  const formContainer=Get("form-container");
  let profileImg=Get("profileImg");
  let namee=Get("name");
  let date=Get("date");
  const months=["Jan" , "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const profileLink=Get("profileLink");
  const bio=Get("bio");
  const locationContent=Get("location-content");
  const linkedinContent=Get("linkedin-content");
  const twitterContent=Get("twitter-content");
  const companyContent=Get("company-content")
  const notFoundError=Get("error");
  const searchButton=Get("searchButton");

  function initAll() {
    darkBtn.classList.add("active");
    notFoundError.style.display="none";
    fetchData(url+"akashaliaquat");
  }

  function darkModeFunct() {
    body.classList.add("darkMode");
    repoCount.classList.add("darkMode");
    followCount.classList.add("darkMode");
    followingCount.classList.add("darkMode");
    lightBtn.classList.add("active");
    darkBtn.classList.remove("active");
    profileContainer.classList.add("darkMode");
    inputField.classList.add("darkMode");
    linkedinContent.classList.add("darkMode");
  }


  darkBtn.addEventListener("click", darkModeFunct);

 
  function lightModeFunct(){
    body.classList.remove("darkMode");
    repoCount.classList.remove("darkMode");
    followCount.classList.remove("darkMode");
    followingCount.classList.remove("darkMode");
    lightBtn.classList.remove("active");
    darkBtn.classList.add("active");
    profileContainer.classList.remove("darkMode");
    inputField.classList.remove("darkMode");
  }
  lightBtn.addEventListener("click", lightModeFunct);

 //////////////////////////////////////////

formContainer.addEventListener("submit" , function(event){
  event.preventDefault();
  if(inputField.value !== ""){
    fetchData(url+inputField.value);
  }
});
async function fetchData(fetchURL){ 
  const response = await fetch (fetchURL);
  let data =await response.json();
  updateProfile(data);
}
///////////


function updateProfile(data){
  console.log(data);
  if(data.message!=="Not Found"){
    notFoundError.style.display="none";

    function checkNull(gitData, myElemetsInnerContent) {
      
      if (gitData === "" || gitData === null || gitData === " ") {
        myElemetsInnerContent.style.opacity = 0.5;
          myElemetsInnerContent.previousElementSibling.style.opacity = 0.5; // Adjust if necessary
        return false; // Data is not available
      } else {
        // Reset opacity if data is available to ensure code accurately reflects the current state of your data
        myElemetsInnerContent.style.opacity = 1;
          myElemetsInnerContent.previousElementSibling.style.opacity = 1; // Adjust if necessary
        return true; // Data is available
      }
    }
    

  profileImg.src = `${data.avatar_url}`;
  profileLink.innerText = `@${data.login}`;
  profileLink.href = `${data.html_url}`;
  namee.innerText = data.name === null ? data.login : data.name;/* accName if userName is NULL */
  let datesegments= data.created_at.split("T").shift().split("-");/*shift only year month and date into datesegment and time part is lost */
  /* then the year-month-date is split on basis of - dashes and then array is formed of length 2 stored in datesegment array*/
  date.innerText = `Joined ${datesegments[2]} ${months[datesegments[1] - 1]} ${datesegments[0]}`;/* -1 bcz month indexing lags behind from 1 digit as it starts from 0 */
  bio.innerText = data.bio == null ? "This profile has no bio" : `${data.bio}`;
  repoCount.innerText = `${data.public_repos}`;
  followCount.innerText = `${data.followers}`;
  followingCount.innerText = `${data.following}`;
  locationContent.innerText = checkNull(data.location, locationContent) ? data.location : "Not Available";
  linkedinContent.innerText = checkNull(data.blog, linkedinContent) ? data.blog : "Not Available";
  linkedinContent.href = checkNull(data.blog, linkedinContent) ? data.blog : "#";
  twitterContent.innerText = checkNull(data.twitter_username, twitterContent) ? data.twitter_username : "Not Available";
  twitterContent.href = checkNull(data.twitter_username, twitterContent) ? `https://twitter.com/${data.twitter_username}` : "#";
  companyContent.innerText = checkNull(data.company, companyContent) ? data.company : "Not Available";

}
else {
  notFoundError.style.display = "block";
}
}


  // Call initAll() after DOM is loaded
  initAll();
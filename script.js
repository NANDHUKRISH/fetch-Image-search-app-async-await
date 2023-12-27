const accees_key="oTqJgLFw3E6KnwyENN1OZBwTsOvbzcezsLrSr3Ohq6Y";

const formElement=document.querySelector("form");
const InputElement=document.querySelector("#search-input");
const searchResults=document.querySelector(".search-results");
const ShowMore=document.querySelector("#Show-more-button");
const ScrollTop=document.querySelector(".to-top")
let inputData=""
let page=2;

async function SearchImages(){
    inputData=InputElement.value;
    const url=`https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accees_key}`
    
    const response = await fetch(url);
    const data=await response.json();
    const results=data.results;
    //console.log(results);

    if(page===1){
        searchResults.innerHTML="";
    }

    results.map(result => {
        const imageWrapper=document.createElement("div");
        imageWrapper.classList.add("search-result");
        imageWrapper.innerHTML=`
        <img src="${result.urls.regular}" alt="${result.alt_description}" />
        <h2>${result.alt_description}</h2>
        `
        searchResults.append(imageWrapper);
    })

    page++;
    if(page>1){
        ShowMore.style.display="block";
    }
    if(page>2){
        ScrollTop.style.display="flex";
    }
}

formElement.addEventListener("submit",(e)=>{
    e.preventDefault();
    page=1;
    SearchImages();
})

ShowMore.addEventListener("click",()=>{
    SearchImages();
})

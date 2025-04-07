const button = document.querySelector(".sub-btn");
const box = document.querySelector(".add");

button.addEventListener("click", async () => {
  const search = document.querySelector("#inp-search").value;
  if(search===""){
    alert("Enter movie name");
    return ;
  }
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYTg2OGUxZWEzZDUwMmRkNzg5MmMyYWNiMDFhYzExOSIsIm5iZiI6MTc0MzU4MzA5My43OTEwMDAxLCJzdWIiOiI2N2VjZjc3NWY1YWU3MTQzNWRhYWVjMDQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.YKpBrhpw-a4QSNSMn0DcUtsXGQ0Bm_S3wxH-6mDJ-cM',
      },
    }
  );

  const data = await response.json();
  const resul = data.results;
  if (resul.length === 0) {
    alert("No movies found.");
    return;
  }
  box.innerHTML = ""; 

  data.results.forEach((element) => {
    const path = element.poster_path
      ? `https://image.tmdb.org/t/p/w500${element.poster_path}`
      : "https://via.placeholder.com/100";

    const div = document.createElement("div");
    div.classList.add("movie-card");
    div.innerHTML = `
      <img src="${path}" alt="${element.title}">
      <p class="movie-title">${element.title}</p>
      <p class="movie-rating">${element.vote_average}</p>
    `;

    const favBtn = document.createElement("button");
    favBtn.textContent = "Add to Favourite";
    favBtn.classList.add("fav-btn");
    favBtn.addEventListener("click", () => {
      addFav(element.id, true);
    });

    div.appendChild(favBtn);
    box.appendChild(div);
  });
});
// const favSet = new Set();
async function addFav(mediaId, addToFav) {
  // if (favSet.has(mediaId)) {
  //   alert("Already in favourites!");
  //   return;
  // }
  // favSet.add(mediaId);
  await fetch(`https://api.themoviedb.org/3/account/21921682/favorite`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYTg2OGUxZWEzZDUwMmRkNzg5MmMyYWNiMDFhYzExOSIsIm5iZiI6MTc0MzU4MzA5My43OTEwMDAxLCJzdWIiOiI2N2VjZjc3NWY1YWU3MTQzNWRhYWVjMDQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.YKpBrhpw-a4QSNSMn0DcUtsXGQ0Bm_S3wxH-6mDJ-cM',
    },
    body: JSON.stringify({ media_type: "movie", media_id: mediaId, favorite: addToFav }),
  });

  showFav();
}
window.addEventListener("load",()=>{
  showFav();
})

async function showFav() {
  const url = 'https://api.themoviedb.org/3/account/21921682/favorite/movies?language=en-US&page=1&sort_by=created_at.asc';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYTg2OGUxZWEzZDUwMmRkNzg5MmMyYWNiMDFhYzExOSIsIm5iZiI6MTc0MzU4MzA5My43OTEwMDAxLCJzdWIiOiI2N2VjZjc3NWY1YWU3MTQzNWRhYWVjMDQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.YKpBrhpw-a4QSNSMn0DcUtsXGQ0Bm_S3wxH-6mDJ-cM'
  }
};

  const favBox = document.querySelector(".fav-list");
  const response = await fetch(url, options);
  
  const movies = await response.json();
  favBox.innerHTML = ""
  movies.results.reverse().forEach((element) => {
    const path = element.poster_path
      ? `https://image.tmdb.org/t/p/w500${element.poster_path}`
      : "https://via.placeholder.com/100";

    const div = document.createElement("div");
    div.classList.add("movie-card");
    div.innerHTML = `
      <img src="${path}" alt="${element.title}">
      <p class="movie-title">${element.title}</p>
      <p class="movie-rating">${element.vote_average}</p>
    `;

    const favBtn = document.createElement("button");
    favBtn.textContent = "Remove from Favourite";
    favBtn.classList.add("fav-btn");
    favBtn.addEventListener("click", () => {
      addFav(element.id, false);
    });

    div.appendChild(favBtn);
    favBox.appendChild(div);
  });
}

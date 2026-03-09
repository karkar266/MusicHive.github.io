// Плейлист хранится в localStorage
let playlist = JSON.parse(localStorage.getItem("playlist")) || [];

// Функция поиска
function search() {
    let q = document.getElementById("search").value;
    fetch(`https://ytsearch.vercel.app/api?q=${q}`)
    .then(res => res.json())
    .then(data => {
        let results = document.getElementById("results");
        results.innerHTML = "";
        data.videos.slice(0,5).forEach(video => {
            let div = document.createElement("div");
            div.className = "song";
            div.innerHTML = `
                <img src="${video.thumbnail}"><br>
                ${video.title}<br>
                <button onclick="play('${video.id}')">▶</button>
                <button onclick="add('${video.id}','${video.title}','${video.thumbnail}')">➕</button>
            `;
            results.appendChild(div);
        });
    });
}

// Функция воспроизведения
function play(id) {
    document.getElementById("player").innerHTML =
    `<iframe width="300" height="170"
        src="https://www.youtube.com/embed/${id}?autoplay=1"
        frameborder="0"
        allowfullscreen></iframe>`;
}

// Добавление в плейлист
function add(id,title,thumb) {
    playlist.push({id,title,thumb});
    localStorage.setItem("playlist", JSON.stringify(playlist));
    showPlaylist();
}

// Отображение плейлиста
function showPlaylist() {
    let div = document.getElementById("playlist");
    div.innerHTML = "";
    playlist.forEach(song => {
        div.innerHTML += `
        <div class="song">
            <img src="${song.thumb}"><br>
            ${song.title}<br>
            <button onclick="play('${song.id}')">▶</button>
        </div>`;
    });
}

// Случайная музыка
function randomSong() {
    let genres = ["lofi hip hop","phonk","chill music","gaming music"];
    let q = genres[Math.floor(Math.random() * genres.length)];
    document.getElementById("search").value = q;
    search();
}

// Показываем плейлист при загрузке
showPlaylist();

module.exports = function render(paintings, user) {
    return `<!DOCTYPE html>
    <html>
      <head>
        <title>ArtLocker</title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="/stylesheets/style.css" />
        <link rel="stylesheet" href="/stylesheets/main.css" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
      </head>
      <body>

        <nav class="navbar">
            <a href="/"><img class="logo" src="/logo.svg"><!-- Icon by https://freeicons.io/profile/75801 --></a>
            <p class="headline">ArtLocker</p>
            <div>
                <img class="profile-icon" src="${user.avatar ? `/avatars/${user.avatar}` : "/user.svg"}" onclick="toggleProfileMenu()"><!-- Icon by https://freeicons.io/profile/6156 -->
                ${createProfileMenu(user)}
            </div>
        </nav>

        <div class="item-container">
            ${paintings.map(createItem).join('')}
            <div class="item-add">
                <a href="/painting/form">+</a>
            </div>
        </div>
      </body>
      <script>
            function toggleProfileMenu() {
                const menu = document.getElementById("profile_menu");

                if(profile_menu.style.display == "none") profile_menu.style.display = "flex";
                else profile_menu.style.display = "none";
            }
      </script>
    </html>`;
};

function createItem(item) {
    return `
        <div class="item">
            <div class="image-container">
                <a href="/painting/item/${item.id}"><img class="item-image" src="/images/${item.image}"></a>
                <div class="image-data">
                    <p class="item-headline">${item.title}</p>
                    <a class="item-seller" href="/user/profile/${item.author}">@${item.username}</a>
                </div>
            </div> 
            <div class="item-data-container">
                <p class="item-description">${item.description}</p>
                <div class="horizontal-line"></div>
                <div class="buy-container">
                    <p class="item-price">${item.price} €</p>
                    <button class="buy-button"><a href="/painting/buy/${item.id}">Kaufen</a></button>
                </div>
            </div>
        </div>`
}

function createProfileMenu(user) {
    if(user.isLoggedIn) {
        return `
            <div id="profile_menu" class="profile-menu" style="display: none;">
                <a href="/user/profile/${user.id}">Mein Profil</a>
                <a href="/user/settings/${user.id}">Einstellungen</a>
                <a href="/logout">Ausloggen</a>
            </div>`
    }
    else {
        return `
        <div id="profile_menu" class="profile-menu" style="display: none;">
            <a href="/login">Einloggen</a>
        </div>`
    }
}


module.exports = function render(painting, user) {
    return `<!DOCTYPE html>
    <html>
      <head>
        <title>ArtLocker</title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="/stylesheets/style.css" />
        <link rel="stylesheet" href="/stylesheets/painting.css" />
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

        <div class="content">
            <div class="image-container">
                <img class="painting-bg-image" src="/images/${painting.image}" alt="">
                <img class="painting-image" src="/images/${painting.image}" alt="">
            </div>
            <div class="image-data-container">
                <p class="item-headline">${painting.title}</p>
                <div class="user-container">
                    <img class="user-icon" src="${painting.avatar ? `/avatars/${painting.avatar}` : "/user.svg"}" alt="">
                    <div class="user-data">
                        <a class="user-name" href="/user/profile/${painting.author}">@${painting.username}</a>
                        <div class="user-joined">Mitglied seit 01.05.2020</div>
                    </div>
                </div>
                <p class="item-price">${painting.price} €</p>
                <div class="horizontal-line"></div>
                <div class="image-description-container">
                    <p class="description">${painting.description}</p>
                </div>
                <div class="horizontal-line"></div>
                <div class="icon-container flex">
                    <div class="creation flex">
                        <img class="logo" src="/calendar.svg"><!-- Icon by https://freeicons.io/profile/823 -->
                        <p>${painting.createdAt.toLocaleString().split(',')[0]}</p>
                    </div>
                    <div class="views flex">
                        <img class="logo" src="/eye.svg"><!-- Icon by https://freeicons.io/profile/3 -->
                        <p>${painting.views}</p>
                    </div>
                    <div class="favorites flex">
                        <img class="logo" src="/star.svg"><!-- Icon by https://freeicons.io/profile/3 -->
                        <p>${painting.favs}</p>
                    </div>
                </div>
                ${createBuyContainer(painting, user.id == painting.author)}
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

function createBuyContainer(item, isProfileOwner) {
    if(item.sold) return `<div class="painting-buy-container"></div>`;

    return `<div class="painting-buy-container">
    ${isProfileOwner 
        ? `<button class="buy-button"><a href="/painting/delete/${item.id}">Löschen</a></button>` 
        : `<button class="buy-button"><a href="/painting/buy/${item.id}">Kaufen</a></button>`}
    </div>`;
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
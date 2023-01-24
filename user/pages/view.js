module.exports = function render(user, localUser) {
    return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>ArtLocker</title>
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
                    ${createProfileMenu(localUser)}
                </div>
            </nav>

                <div class="profile-content">
                    <div class="profile-container">
                        <img class="user-image" src="/avatars/${user.avatar ? user.avatar : "/user.svg"}">
                        <div>
                            <p class="user-name">${user.firstname} ${user.surname}</p>
                            <p class="user-handle">@${user.username}</p>
                        </div>
                    </div>
                    <div class="profile-item-container">
                        ${user.paintings.map(x => createItem(x, localUser.isProfileOwner)).join('')}
                        
                        ${localUser.isLoggedIn 
                            ? `<div class="item-add">
                                <a href="/painting/form">+</a>
                                </div>`

                            : ``
                        }
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

function createItem(item, isProfileOwner) {
    return `
        <div class="item background-contrast">
            <div class="image-container-profile">
                <a href="/painting/item/${item.id}"><img class="item-image" src="/images/${item.image}"></a>
                <div class="image-data">
                    <div class="item-data-container">
                        <p class="item-headline">${item.title}</p>
                        <a class="item-seller" href="/user/profile/${item.author}">@${item.username}</a>
                    </div>
                </div>
            </div> 
            <div class="item-data-container">
                <p class="item-description">${item.description}</p>
                <div class="horizontal-line"></div>
                <div class="buy-container">
                    <p class="item-price font-grey">${item.price} €</p>
                    ${isProfileOwner 
                        ? `<button class="buy-button"><a href="/painting/delete/${item.id}">Löschen</a></button>` 
                        : `<button class="buy-button"><a href="/painting/buy/${item.id}">Kaufen</a></button>`}
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
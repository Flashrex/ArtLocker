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

        
        <div class="content">
            
            <div class="category-container">
                <p class="category-headline">Am Beliebtesten</p>
                <div class="item-container">
                    ${findMostPopularItems(paintings, 5).map(createItem).join('')}
                </div>
            </div>

            <div class="category-container">
                <p class="category-headline">Alle Angebote</p>
                <div class="item-container">
                    ${paintings.map(createItem).join('')}
                </div>
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
                    <div class="item-data-container">
                        <p class="item-headline">${item.title}</p>
                        <a class="item-seller" href="/user/profile/${item.author}">@${item.username}</a>
                    </div>
                    <div class="item-price-container">
                        <p class="item-price font-white">${item.price} €</p>
                    </div>
                </div>
            </div> 
        </div>`
}

function findMostPopularItems(items, count) {
    let copy = [...items];

    return copy.sort(compareItems).slice(0, count);
}

function compareItems(item1, item2) {
    const favoriteMultiplier = 5;
    const impressionsItem1 = item1.views + (item1.favs * favoriteMultiplier);
    const impressionsItem2 = item2.views + (item2.favs * favoriteMultiplier);

    if(impressionsItem1 > impressionsItem2) return -1;
    else if(impressionsItem1 < impressionsItem2) return 1;
    else return 0;
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
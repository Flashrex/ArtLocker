module.exports = function render(painting, user) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>ArtLocker</title>
      <link rel="stylesheet" href="/stylesheets/style.css" />
      <link rel="stylesheet" href="/stylesheets/form.css" />
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
            <div class="form-content">
                <p>Neues Angebot erstellen:</p>
                <form action="/painting/save" method="post" encType="multipart/form-data">
                    <input type="hidden" id="id" name="id" value="${painting.id}" />
                    <div class="form-item">
                        <label for="id">Titel:</label>
                        <input type="text" id="title" name="title" value="${painting.title}" maxlength=20 required/>
                    </div>
                    <div class="form-item">
                        <label for="description">Beschreibung:</label>
                        <textarea type="text" id="description" name="description" value="${painting.description}" maxlength=100 required></textarea>
                        
                    </div>
                    <div class="form-item">
                        <label for="price">Preis:</label>
                        <input type="text" id="price" name="price" value="${painting.price}" required/>
                    </div>
                    <div class="form-item">
                        <label for="upload">Bild: </label>
                        <input type="file" id="upload" name="upload" accept="image/png, image/jpeg" value="${painting.image}" required/>
                    </div>
                    <div class="form-button">
                        <button type="submit">speichern</button>
                    </div>
                </form>
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
</html>`
};

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
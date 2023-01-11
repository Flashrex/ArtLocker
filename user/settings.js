module.exports = function render(user, localUser) {
    return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>ArtLocker</title>
                <link rel="stylesheet" href="/style.css" />
                <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
            </head>
            <body>

            <nav class="navbar">
                <a href="/"><img class="logo" src="/logo.svg"><!-- Icon by https://freeicons.io/profile/75801 --></a>
                <p class="headline">ArtLocker</p>
                <div>
                    <img class="profile-icon" src="${localUser.avatar ? `/avatars/${localUser.avatar}` : "/user.svg"}" onclick="toggleProfileMenu()"><!-- Icon by https://freeicons.io/profile/6156 -->
                    ${createProfileMenu(localUser)}
                </div>
            </nav>

            <div class="content">
                <div class="form-content">
                    <p>Account</p>
                    <form action="/user/save" method="post" encType="multipart/form-data">
                        <input type="hidden" id="id" name="id" value="${user.id}" />
                        <div class="form-item">
                            <label for="username">Username:</label>
                            <input type="text" id="username" name="username" value="${user.username}" minlength=6 maxlength=15/>
                        </div>
                        <div class="form-item">
                            <label for="email">E-Mail:</label>
                            <input type="email" id="email" name="email" value="${user.email}"/>
                        </div>
                        <div class="form-item">
                            <label for="password">Password:</label>
                            <input type="password" id="password" name="password" value="" maxlength=15/>
                        </div>
                        <div class="form-item">
                            <label for="firstname">Vorname:</label>
                            <input type="text" id="firstname" name="firstname" value="${user.firstname}" maxlength=15/>
                        </div>
                        <div class="form-item">
                            <label for="lastname">Nachname:</label>
                            <input type="text" id="lastname" name="lastname" value="${user.surname}" maxlength=15/>
                        </div>
                        <div class="form-item">
                            <label for="upload">Avatar: </label>
                            <input type="file" id="upload" name="upload" accept="image/png, image/jpeg" value=""/>
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
        </html>`;
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
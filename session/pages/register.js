module.exports = function render() {
    return `<!DOCTYPE html>
    <html lang="de">
        <head>
            <title>ArtLocker</title>
            <meta charset="utf-8">
            <link rel="stylesheet" href="/stylesheets/style.css" />
            <link rel="stylesheet" href="/stylesheets/form.css" />
            <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        </head>
        <body>
            <nav class="navbar">
                <a href="/"><img class="logo" src="/logo.svg"><!-- Icon by https://freeicons.io/profile/75801 --></a>
                <p class="headline">ArtLocker</p>
                <div>
                    <img class="profile-icon" src="/user.svg"><!-- Icon by https://freeicons.io/profile/6156 -->
                </div>
            </nav>
    
            <div class="content">
                <div class="form-content">
                    <p>Bitte Daten eingeben</p>
                    <form action="/register" method="post" id="register">
                        <div>
                            <div class="form-item">
                                <label for="username">Email:</label>
                                <input type="email" name="username" id="username" required autofocus>
                            </div>
                            <div class="form-item">
                                <label for="password">Passwort:</label>
                                <input type="password" name="password" id="password" required>
                            </div>
                            <div class="form-item">
                                <label for="vorname">Vorname:</label>
                                <input type="text" name="vorname" id="firstname" required>
                            </div>
                            <div class="form-item">
                                <label for="nachname">Nachname:</label>
                                <input type="text" name="nachname" id="surname" required>
                            </div>
                            <div class="form-item">
                                <label for="nickname">Benutzername:</label>
                                <input type="text" name="nickname" id="nickname" required>
                            </div>
                        </div>
                        <div class="form-button">
                            <button type="submit">Registrieren</button>
                        </div>
                        <p id="register_text">Schon einen Account? <a href="/login">Einloggen</a></p>
                    </form>
                </div>
            </div>
        </body>
    </html>`
};
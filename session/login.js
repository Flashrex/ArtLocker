module.exports = function render() {
    return `<!DOCTYPE html>
    <html lang="de">
        <head>
            <title>ArtLocker</title>
            <meta charset="utf-8">
            <link rel="stylesheet" href="/style.css" />
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
                    <p>Bitte melden Sie sich an</p>
                    <form action="/login" method="post" id="login">
                        <div>
                            <div class="form-item">
                                <label for="username">Benutzername:</label>
                                <input type="text" name="username" id="username" required autofocus>
                            </div>
                            <div class="form-item">
                                <label for="password">Passwort:</label>
                                <input type="password" name="password" id="password" required>
                            </div>
                        </div>
                        <div class="form-button">
                            <button type="submit">Einloggen</button>
                        </div>
                        <p id="register_text">Noch keinen Account? <a href="/register">Registrieren</a></p>
                    </form>
                </div>
            </div>
        </body>
    </html>`
};
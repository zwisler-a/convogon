import * as process from "node:process";

export const jwtSecret = process.env.JWT_SECRET ?? "local"
export const mailTemplate = (link: string)=> `
<h1>Hey :)</h1>
<p>
Um die Registrierung abzuschließen oder dich anzumelden, klicke bitte auf den folgenden Link: <a href="${link}">Registrierung abschließen</a>
</p>
<p>
<br/>
Kopiere diese URL in deinen Browser, falls der Link nicht funktioniert: <br/>
${link}
</p>
`
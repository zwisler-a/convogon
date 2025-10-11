import * as process from "node:process";

export const jwtSecret = process.env.JWT_SECRET ?? "local"
export const mailTemplate = (link: string)=> `
<h1>Hey :)</h1>
<p>
Zum Anmelden im Account bitte folgenden Link öffnen: <a href="${link}">Link</a>
</p>
<p>
Falls der Link nicht funktioniert:
${link}
</p>
`
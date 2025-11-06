import * as process from "node:process";

export const jwtSecret = process.env.JWT_SECRET ?? "local"
export const mailTemplateText = (link: string)=> `
Hey,
Du hast einen Anmeldelink für ConVogon angefordert.
Öffne den folgenden Link, um dich bei deinem Konto anzumelden:
${link}
`;
export const mailTemplateHtml = (link: string)=> `
<table width="100%" cellpadding="0" cellspacing="0"
       style="max-width: 600px; background: #1a1c18; border-radius: 8px; overflow: hidden; border: solid 1px #6c6c6c;">
    <tr>
        <td style="background-color: #2b2a2a; color: #ffffff; text-align: center; padding: 4px 0;">
            <h2>Anmeldung bei ConVogon</h2>
        </td>
    </tr>
    <tr>
        <td style="padding: 30px; color: #ffffff;">
            <p>Hey,</p>
            <p>Du hast einen Anmeldelink für ConVogon angefordert. Klicke auf den Limk, um dich bei deinem Konto anzumelden:</p>
            <p style="text-align: center; margin: 30px 0;">
                <a href="${link}"
                   style="background-color: #02e600; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 25px; display: inline-block;">
                    Jetzt anmelden
                </a>
            </p>
            <p>Oder kopiere diesen Link in deinen Browser:</p>
            <p style="word-break: break-all; color: #02e600;">${link}</p>
        </td>
    </tr>
    <tr>
        <td style="padding: 30px; color: #ffffff;">
            Wenn du diese Anfrage nicht gestellt hast, kannst du diese E‑Mail ignorieren.
        </td>
    </tr>
</table>
`;


export const METRICS = {
    PERSONAS:"persona_count",
    MAIL_SEND: "mail_sent",
}
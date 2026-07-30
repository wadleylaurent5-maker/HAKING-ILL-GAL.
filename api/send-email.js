const nodemailer = require('nodemailer');

const EMAIL_ACCOUNTS = [
    { email: "mrlordseigneurxpp11@gmail.com", password: "xdbteuxtjsrraegd" },
    { email: "wadleylaurent5@gmail.com", password: "ehxvpqzlkahbnnaj" },
    { email: "hisokacdm@gmail.com", password: "nvzautpnloomjtcj" }
];

const SUPPORT_EMAILS = [
    "support@support.whatsapp.com",
    "support@whatsapp.com",
    "abuse@whatsapp.com"
];

const DESCRIPTIONS = [
    `🚨 URGENT: CRITICAL SECURITY THREAT – FRAUD AND EXTORTION 🚨

This phone number is actively participating in large-scale financial scams and targeted fraud against innocent WhatsApp users worldwide. The malicious actor operating this account has been formally reported by multiple victims for systematically impersonating financial institution representatives, bank personnel, and government officials to extract sensitive personal data, authentication credentials, and monetary funds. 

Investigations indicate that the individual uses sophisticated social engineering techniques, psychological manipulation, and coordinated pressure tactics to force victims into disclosing their private banking passwords, one-time verification codes (OTPs), and legal identity documentation. Several users have already suffered devastating financial losses as a direct result of this criminal behavior. 

WhatsApp is a globally trusted communication platform that relies on integrity, safety, and strict adherence to community standards. This specific account blatantly violates those foundational principles in the most egregious manner possible. It represents a clear and present danger to the ecosystem. We urgently demand an immediate and permanent suspension of this number to safeguard the community from further devastation.`,

    `⚠️ IMMEDIATE ACTION REQUIRED: CYBERBULLYING AND HARASSMENT ⚠️

This phone number has been repeatedly flagged and reported for orchestrating severe campaigns of harassment, verbal abuse, intimidation, and targeted cyberbullying against multiple platform users. The messages originating from this line are profoundly offensive, hostile, and replete with explicit threats of physical violence, psychological intimidation, and targeted harm. 

The individual behind this account deliberately fosters a toxic, unsafe, and threatening environment, clearly undermining the core values of respect and safety that WhatsApp strives to maintain for its billions of global users. Despite prior informal warnings and community flags, this offender continues to operate with blatant impunity, exploiting platform features to inflict ongoing emotional distress and fear upon vulnerable individuals. 

This sustained pattern of behavior constitutes a severe, direct violation of the WhatsApp Terms of Service and Community Guidelines. Allowing this malicious account to remain active sets a dangerous precedent and endangers community safety. We strongly request an immediate, permanent ban and device blacklisting.`,

    `🔥 CRITICAL ALERT: SYSTEMATIC DISTRIBUTION OF MALWARE AND PHISHING 🔥

This phone number is systematically weaponized for the mass distribution of malicious software, advanced phishing links, trojan payloads, and deceptive fraudulent content targeting everyday users. The automated and manual messages distributed from this account are expertly crafted to masquerade as official platform notifications, trusted security updates, or attractive financial offers. 

However, upon interaction, these links redirect unsuspecting victims to highly sophisticated malicious domains specifically designed to harvest private credentials, hijack personal data, and compromise device integrity. The sheer scale and velocity of this spam campaign affect numerous users daily, presenting an escalating cybersecurity threat that undermines network reliability. 

This is not a minor infraction; it is a calculated, large-scale cyberattack operation executed with malicious intent. Immediate intervention by the WhatsApp security and moderation team is critically required. We formally request a full comprehensive investigation and the immediate permanent revocation of this phone number's access.`
];

let currentIndex = 0;

function getNextAccount() {
    const account = EMAIL_ACCOUNTS[currentIndex % EMAIL_ACCOUNTS.length];
    currentIndex++;
    return account;
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: "Méthode non autorisée" });
    }

    const { number } = req.body;

    if (!number || number.length < 8) {
        return res.status(400).json({ error: "Numéro invalide" });
    }

    const account = getNextAccount();
    const supportEmail = SUPPORT_EMAILS[Math.floor(Math.random() * SUPPORT_EMAILS.length)];
    const desc = DESCRIPTIONS[Math.floor(Math.random() * DESCRIPTIONS.length)];
    const uid = Math.floor(100000 + Math.random() * 900000);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: account.email,
            pass: account.password
        }
    });

    const mailOptions = {
        from: account.email,
        to: supportEmail,
        subject: `[REPORT] ${number} - Violation WhatsApp`,
        text: `Numéro cible : ${number}\nUID : ${uid}\nCompte rapporteur : ${account.email}\n\nDESCRIPTION :\n${desc}\n\nMerci de traiter ce rapport en urgence.`
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ success: true, message: "Email envoyé", account: account.email, support: supportEmail });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

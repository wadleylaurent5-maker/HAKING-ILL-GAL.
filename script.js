const targetInput = document.getElementById('targetNumber');
const btn = document.getElementById('sendBtn');
const logDiv = document.getElementById('log');

function log(msg, type = 'info') {
    const line = document.createElement('div');
    line.className = 'log-' + type;
    line.innerText = msg;
    logDiv.appendChild(line);
    logDiv.scrollTop = logDiv.scrollHeight;
}

async function launchEmailAttack() {
    const number = targetInput.value.trim();

    if (!number || number.length < 8) {
        log("❌ Numéro invalide !", "error");
        return;
    }

    btn.disabled = true;
    btn.innerText = "⏳ ENVOI EN COURS...";
    log("🔥 Lancement (10 imèl nan ~50 segond)...", "info");

    let success = 0;
    let errors = 0;
    const totalEmails = 10;

    for (let i = 1; i <= totalEmails; i++) {
        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ number: number })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                log(`✅ [${i}/10] Envoyé à ${data.support} (via ${data.account})`, "success");
                success++;
            } else {
                log(`❌ [${i}/10] Échec : ${data.error || 'Erè nan sèvè a'}`, "error");
                errors++;
            }
        } catch (err) {
            log(`❌ [${i}/10] Erè koneksyon ak sèvè a`, "error");
            errors++;
        }

        if (i < totalEmails) {
            await new Promise(r => setTimeout(r, 5000));
        }
    }

    log(`\n📊 TERMINÉ ! ${success} envoyés, ${errors} échecs.`, "info");
    btn.innerText = "🍷_𝐁𝐀𝐍_🍷";
    btn.disabled = false;
}

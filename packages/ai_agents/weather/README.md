# Väderagent (Home Assistant)

Syfte: Generera dagliga väderprognoser (berättande) och posta till Slack.
Arkitektur: Tunn HA-automation → AI-gateway-script → LLM (Ollama) → Slack.

Mappar:
- contracts/: JSON schema för LLM-output
- prompts/: Prompt/persona
- scripts/: HA-skript (AI-gateway och Slack-postning)
- sensors/: Hjälpsensorer och template-sensorer
- test/: Test-fixtures för torrkörning

Körordning (kort):
1) sensors → 2) ai_gateway → 3) post_to_slack → 4) automationer (schema/manuell)

Denna README uppdateras löpande efter varje steg.

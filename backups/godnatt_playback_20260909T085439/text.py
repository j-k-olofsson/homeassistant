"""Short greetings without stale claims about the house."""

FALLBACK = "Godnatt, hörni. Sov gott och låt morgondagen vänta en stund."
PROMPT = (
    "Skriv en varm, naturlig godnatthälsning på svenska från Granny till familjen. "
    "8–12 ord totalt, högst två korta meningar. Tilltala dem med ni eller hörni. "
    "En liten vardaglig humoristisk knorr är välkommen. Börja med Godnatt. "
    "Svara endast med texten. Inga citattecken, gäspningar, ljud eller scenanvisningar. "
    "Nämn inte dörrar, lampor, säkerhet, väder eller andra aktuella förhållanden."
)


def greeting(text):
    """Reject oversized or unsuitable output rather than cutting a sentence in half."""
    text = " ".join(str(text or "").strip().strip('"“”').split())
    forbidden = ("dörr", "lamp", "säker", "låst", "gäsp", "*", "[", "]", "väder")
    if not 8 <= len(text.split()) <= 12 or not text.lower().startswith("godnatt"):
        return FALLBACK
    if any(word in text.lower() for word in forbidden):
        return FALLBACK
    return text


def variants(text):
    text = greeting(text)
    return {"closed": text, "open": "Stäng balkongdörren. " + text,
            "unknown": "Kontrollera balkongdörren. " + text}


def door_variant(state):
    return {"on": "open", "off": "closed"}.get(state, "unknown")

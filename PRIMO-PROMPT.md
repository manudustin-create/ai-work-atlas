# Prima sessione — prompt da incollare in Claude Code

Dopo aver fatto setup del progetto (git init, file copiati, CLAUDE.md creato),
lancia `claude` e incolla questo come primo messaggio:

---

Leggi il CLAUDE.md e il file index.html. Poi esegui in sequenza:

A) **Audit rapido** del prototipo: cosa funziona, cosa è fragile, cosa va rifattorizzato. Max 15 bullet, organizzati per priorità (bloccante → migliorabile → nice-to-have).

B) **Micro-roadmap in 3 step** (MVP evolutivo) che mi consenta di:
   1. continuare a iterare velocemente sul contenuto
   2. ridurre il rischio di "rompere" la UI a ogni modifica
   3. arrivare gradualmente a una versione pubblicabile come sito statico

C) **NON implementare nulla ancora** — mostrami audit + roadmap e aspetta il mio OK prima di toccare qualsiasi file.

D) Dopo il mio OK, implementa SOLO lo Step 1 della roadmap (miglior rapporto valore/tempo). Produci un commit con messaggio chiaro.

E) In fondo, elenca max 5 **"decisioni da prendere più avanti"** per arrivare alla pubblicazione.

# API WOŚP Aukcje

Projekt REST API wspierający obsługę aukcji charytatywnych (WOŚP).  
Aplikacja umożliwia zarządzanie aukcjami oraz kategoriami aukcji z wykorzystaniem nowoczesnej architektury backendowej.

---

## 🛠 Technologie
- Node.js
- TypeScript
- Express
- Prisma ORM
- PostgreSQL / SQLite
- Zod (walidacja danych)
- REST API

---

## 📁 Struktura projektu
Projekt został podzielony na moduły domenowe:
```text

src/
├─ modules/
│ ├─ auctions/
│ │ ├─ auction.controller.ts
│ │ ├─ auction.service.ts
│ │ ├─ auction.repository.ts
│ │ ├─ auction.routes.ts
│ │ └─ auction.schema.ts
│ └─ categories/
│ ├─ category.controller.ts
│ ├─ category.service.ts
│ ├─ category.repository.ts
│ ├─ category.routes.ts
│ └─ category.schema.ts
├─ app.ts
└─ server.ts

yaml
Skopiuj kod

Każdy moduł zawiera:
- kontroler (obsługa HTTP),
- serwis (logika biznesowa),
- repozytorium (dostęp do bazy danych),
- walidację danych wejściowych.

---

## 🧩 Architektura

Aplikacja wykorzystuje architekturę warstwową opartą o wzorce:
- **Controller – Service – Repository**
- separację logiki biznesowej od warstwy danych
- pełne typowanie w TypeScript

Walidacja danych wejściowych realizowana jest przy użyciu biblioteki **Zod**, a komunikacja z bazą danych odbywa się poprzez **Prisma ORM**.

---

## 🔌 Endpointy API

### Kategorie
- `POST /api/categories` – dodanie kategorii
- `GET /api/categories` – lista kategorii

### Aukcje
- `POST /api/auctions` – dodanie aukcji
- `GET /api/auctions` – lista aukcji
- `GET /api/auctions/:id` – szczegóły aukcji
- `PUT /api/auctions/:id` – edycja aukcji
- `DELETE /api/auctions/:id` – usunięcie aukcji

API zwraca poprawne kody HTTP (200, 201, 404).

---

## ▶️ Uruchomienie projektu

```bash
npm install
npm run build
npm start
Aplikacja uruchomi się pod adresem:

arduino
Skopiuj kod
http://localhost:3000

cmkr95lrq0001oxqc8rnd8vhu
cmkr9wz2m0001oxt4neuggjwh
cmkrdpyx10000ox5sm5yh8qwx

{
  "title": "Słuchawki WOŚP",
  "description": "Nowe",
  "status": "ACTIVE",
  "currentPrice": 10,
  "categoryId": "TU_WKLEJ_ID_KATEGORII",
  "url": "https://example.com/1"
}

2) Postman + screeny: testy funkcjonalne (na npm start i .env)
Odpalasz npm start, potem lecisz po kolei:

POST /api/categories → 201 + dostajesz id
GET /api/categories → lista + auctionCount
POST /api/auctions z categoryId → 201
GET /api/categories/:id/auctions → lista aukcji kategorii
DELETE /api/categories/:id (gdy ma aukcje) → 409 CATEGORY_HAS_AUCTIONS

Jedno zdanie komentarza:
„Tu pracuję na bazie z .env (serwer z npm start), więc ID biorę z odpowiedzi w trakcie demo.”
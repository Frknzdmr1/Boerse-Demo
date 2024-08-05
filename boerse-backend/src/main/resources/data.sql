INSERT INTO rollen (id, bezeichnung) VALUES
                                        (RANDOM_UUID(), 'ADMIN'),
                                        (RANDOM_UUID(), 'USER');


INSERT INTO benutzer (id, benutzername, email, passwort, kontotyp, erstellt_am, aktualisiert_am) VALUES
                                                                                                     (RANDOM_UUID(), 'furkan', 'user1@example.com', '$2a$12$kbOQ3KrCR6Xx3HkfB/OHwOTmKoBmUGWZusagLSqxKkLmY1/RY7g5a', 'STANDARD', NOW(), NOW()),
                                                                                                     (RANDOM_UUID(), 'user2', 'user2@example.com', '$2a$12$k4a2ZcrPKPxB3vmBTG8u.eIDkOasQVBX2IBC5vlMRYEeLb2Ly.iQi', 'PREMIUM', NOW(), NOW());
INSERT INTO benutzer_rollen (benutzer_id, role_id) VALUES
                                                      ((SELECT id FROM benutzer WHERE benutzername = 'furkan'), (SELECT id FROM rollen WHERE bezeichnung = 'USER')),
                                                      ((SELECT id FROM benutzer WHERE benutzername = 'user2'), (SELECT id FROM rollen WHERE bezeichnung = 'USER'));

INSERT INTO aktien (id, symbol, firmenname, markt, sektor, aktueller_preis, zuletzt_aktualisiert) VALUES
                                                                                                      (RANDOM_UUID(), 'AAPL', 'Apple Inc.', 'NASDAQ', 'Technology', 150.25, NOW()),
                                                                                                      (RANDOM_UUID(), 'GOOGL', 'Alphabet Inc.', 'NASDAQ', 'Technology', 2750.50, NOW()),
  (RANDOM_UUID(), 'COKE', 'Coca-Cola Consolidated, Inc.', 'NASDAQ', 'Technology', 150.25, NOW()),
    (RANDOM_UUID(), 'IBM', 'International Business Machines Corporation', 'NASDAQ', 'Technology', 150.25, NOW());

INSERT INTO portfolios (id, benutzer_id, erstellt_am, aktualisiert_am) VALUES
                                                                           (RANDOM_UUID(), (SELECT id FROM benutzer WHERE benutzername = 'furkan'), NOW(), NOW()),
                                                                           (RANDOM_UUID(), (SELECT id FROM benutzer WHERE benutzername = 'user2'), NOW(), NOW());

INSERT INTO portfolio_aktien (id, portfolio_id, aktie_id, menge, durchschnittlicher_kaufpreis) VALUES
                                                                                                   (RANDOM_UUID(), (SELECT id FROM portfolios WHERE benutzer_id = (SELECT id FROM benutzer WHERE benutzername = 'furkan')), (SELECT id FROM aktien WHERE symbol = 'AAPL'), 10, 145.00),
                                                                                                   (RANDOM_UUID(), (SELECT id FROM portfolios WHERE benutzer_id = (SELECT id FROM benutzer WHERE benutzername = 'user2')), (SELECT id FROM aktien WHERE symbol = 'GOOGL'), 5, 2700.00);

INSERT INTO auftraege (id, benutzer_id, aktie_id, auftragstyp, menge, preis, status, erstellt_am, aktualisiert_am) VALUES
                                                                                                                       (RANDOM_UUID(), (SELECT id FROM benutzer WHERE benutzername = 'furkan'), (SELECT id FROM aktien WHERE symbol = 'AAPL'), 'KAUF', 10, 145.00, 'ABGESCHLOSSEN', NOW(), NOW()),
                                                                                                                       (RANDOM_UUID(), (SELECT id FROM benutzer WHERE benutzername = 'user2'), (SELECT id FROM aktien WHERE symbol = 'GOOGL'), 'KAUF', 5, 2700.00, 'ABGESCHLOSSEN', NOW(), NOW());

INSERT INTO transaktionen (id, auftrag_id, benutzer_id, aktie_id, transaktionstyp, menge, preis, zeitstempel) VALUES
                                                                                                                  (RANDOM_UUID(), (SELECT id FROM auftraege WHERE benutzer_id = (SELECT id FROM benutzer WHERE benutzername = 'furkan') AND aktie_id = (SELECT id FROM aktien WHERE symbol = 'AAPL')), (SELECT id FROM benutzer WHERE benutzername = 'furkan'), (SELECT id FROM aktien WHERE symbol = 'AAPL'), 'KAUF', 10, 145.00, NOW()),
                                                                                                                  (RANDOM_UUID(), (SELECT id FROM auftraege WHERE benutzer_id = (SELECT id FROM benutzer WHERE benutzername = 'user2') AND aktie_id = (SELECT id FROM aktien WHERE symbol = 'GOOGL')), (SELECT id FROM benutzer WHERE benutzername = 'user2'), (SELECT id FROM aktien WHERE symbol = 'GOOGL'), 'KAUF', 5, 2700.00, NOW());

INSERT INTO beobachtungslisten (id, benutzer_id, name, erstellt_am, aktualisiert_am) VALUES
                                                                                         (RANDOM_UUID(), (SELECT id FROM benutzer WHERE benutzername = 'furkan'), 'Tech Stocks', NOW(), NOW()),
                                                                                         (RANDOM_UUID(), (SELECT id FROM benutzer WHERE benutzername = 'user2'), 'Favorite Stocks', NOW(), NOW());

INSERT INTO beobachtungslisten_aktien (id, beobachtungsliste_id, aktie_id, hinzugefuegt_am) VALUES
                                                                                                (RANDOM_UUID(), (SELECT id FROM beobachtungslisten WHERE name = 'Tech Stocks'), (SELECT id FROM aktien WHERE symbol = 'AAPL'), NOW()),
                                                                                                (RANDOM_UUID(), (SELECT id FROM beobachtungslisten WHERE name = 'Favorite Stocks'), (SELECT id FROM aktien WHERE symbol = 'GOOGL'), NOW());
INSERT INTO guthaben (id, kontostand, zuletzt_aktualisiert, benutzer_id)
VALUES
    (RANDOM_UUID(), 50000.00, NOW(), (SELECT id FROM benutzer WHERE benutzername = 'furkan')),
    (RANDOM_UUID(), 50000.00, NOW(), (SELECT id FROM benutzer WHERE benutzername = 'user2'));

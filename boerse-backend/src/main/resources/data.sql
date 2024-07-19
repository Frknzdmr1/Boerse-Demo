INSERT INTO benutzer (id, benutzername, email, passwort, kontotyp, erstellt_am, aktualisiert_am) VALUES
                                                                                                     (UUID(), 'user1', 'user1@example.com', 'password1', 'STANDARD', NOW(), NOW()),
                                                                                                     (UUID(), 'user2', 'user2@example.com', 'password2', 'PREMIUM', NOW(), NOW());

INSERT INTO aktien (id, symbol, firmenname, markt, sektor, aktueller_preis, zuletzt_aktualisiert) VALUES
                                                                                                      (UUID(), 'AAPL', 'Apple Inc.', 'NASDAQ', 'Technology', 150.25, NOW()),
                                                                                                      (UUID(), 'GOOGL', 'Alphabet Inc.', 'NASDAQ', 'Technology', 2750.50, NOW());

INSERT INTO portfolios (id, benutzer_id, erstellt_am, aktualisiert_am) VALUES
                                                                           (UUID(), (SELECT id FROM benutzer WHERE benutzername = 'user1'), NOW(), NOW()),
                                                                           (UUID(), (SELECT id FROM benutzer WHERE benutzername = 'user2'), NOW(), NOW());

INSERT INTO portfolio_aktien (id, portfolio_id, aktie_id, menge, durchschnittlicher_kaufpreis) VALUES
                                                                                                   (UUID(), (SELECT id FROM portfolios WHERE benutzer_id = (SELECT id FROM benutzer WHERE benutzername = 'user1')), (SELECT id FROM aktien WHERE symbol = 'AAPL'), 10, 145.00),
                                                                                                   (UUID(), (SELECT id FROM portfolios WHERE benutzer_id = (SELECT id FROM benutzer WHERE benutzername = 'user2')), (SELECT id FROM aktien WHERE symbol = 'GOOGL'), 5, 2700.00);

INSERT INTO auftraege (id, benutzer_id, aktie_id, auftragstyp, menge, preis, status, erstellt_am, aktualisiert_am) VALUES
                                                                                                                       (UUID(), (SELECT id FROM benutzer WHERE benutzername = 'user1'), (SELECT id FROM aktien WHERE symbol = 'AAPL'), 'KAUF', 10, 145.00, 'ABGESCHLOSSEN', NOW(), NOW()),
                                                                                                                       (UUID(), (SELECT id FROM benutzer WHERE benutzername = 'user2'), (SELECT id FROM aktien WHERE symbol = 'GOOGL'), 'KAUF', 5, 2700.00, 'ABGESCHLOSSEN', NOW(), NOW());

INSERT INTO transaktionen (id, auftrag_id, benutzer_id, aktie_id, transaktionstyp, menge, preis, zeitstempel) VALUES
                                                                                                                  (UUID(), (SELECT id FROM auftraege WHERE benutzer_id = (SELECT id FROM benutzer WHERE benutzername = 'user1') AND aktie_id = (SELECT id FROM aktien WHERE symbol = 'AAPL')), (SELECT id FROM benutzer WHERE benutzername = 'user1'), (SELECT id FROM aktien WHERE symbol = 'AAPL'), 'KAUF', 10, 145.00, NOW()),
                                                                                                                  (UUID(), (SELECT id FROM auftraege WHERE benutzer_id = (SELECT id FROM benutzer WHERE benutzername = 'user2') AND aktie_id = (SELECT id FROM aktien WHERE symbol = 'GOOGL')), (SELECT id FROM benutzer WHERE benutzername = 'user2'), (SELECT id FROM aktien WHERE symbol = 'GOOGL'), 'KAUF', 5, 2700.00, NOW());

INSERT INTO beobachtungslisten (id, benutzer_id, name, erstellt_am, aktualisiert_am) VALUES
                                                                                         (UUID(), (SELECT id FROM benutzer WHERE benutzername = 'user1'), 'Tech Stocks', NOW(), NOW()),
                                                                                         (UUID(), (SELECT id FROM benutzer WHERE benutzername = 'user2'), 'Favorite Stocks', NOW(), NOW());

INSERT INTO beobachtungslisten_aktien (id, beobachtungsliste_id, aktie_id, hinzugefuegt_am) VALUES
                                                                                                (UUID(), (SELECT id FROM beobachtungslisten WHERE name = 'Tech Stocks'), (SELECT id FROM aktien WHERE symbol = 'AAPL'), NOW()),
                                                                                                (UUID(), (SELECT id FROM beobachtungslisten WHERE name = 'Favorite Stocks'), (SELECT id FROM aktien WHERE symbol = 'GOOGL'), NOW());

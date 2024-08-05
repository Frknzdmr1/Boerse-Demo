package de.brightslearning.boersebackend.service;

import de.brightslearning.boersebackend.model.*;
import de.brightslearning.boersebackend.repository.BenutzerRepository;
import de.brightslearning.boersebackend.repository.TransaktionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class GuthabenBerechnenService {

    private final TransaktionRepository transaktionRepository;
    private final BenutzerRepository benutzerRepository;
    @Value("${POLYGON_API_KEY}")
    private String polygonApiKey;

    @Autowired
    public GuthabenBerechnenService(TransaktionRepository transaktionRepository,
                                    BenutzerRepository benutzerRepository){
        this.transaktionRepository = transaktionRepository;
        this.benutzerRepository = benutzerRepository;
    }



    public Map<LocalDate, BigDecimal> guthabenZuTageListe(UUID benutzerId, LocalDate anfangsDatum) {

        Benutzer benutzer = benutzerRepository.findBenutzerById(benutzerId)
                .orElseThrow(() -> new RuntimeException("User mit dieser ID konnte nicht gefunden werden!"));

        List<Transaktion> transaktionen =  transaktionRepository.findAllByBenutzer(benutzer);

        Map<LocalDate, BigDecimal> guthabenWerte = new HashMap<>();
        Map<ZonedDateTime, BigDecimal> guthabenVeraenderungenMap = new HashMap<>();


        transaktionen.stream()
                .filter(transaktion -> transaktion.getAuftrag().getStatus().equals(Auftragsstatus.ABGESCHLOSSEN))
                .forEach(
                transaktion -> guthabenVeraenderungenMap.put(transaktion.getZeitstempel()
                        ,
                        (transaktion.getTransaktionstyp().equals(Auftragstyp.VERKAUF) ? BigDecimal.ONE
                                : BigDecimal.valueOf(-1)).multiply(
                        transaktion.getPreis().multiply(BigDecimal.valueOf(transaktion.getMenge())))
                )
        );

        for(LocalDate date = anfangsDatum; date.isBefore(LocalDate.now()); date = date.plusDays(1) ){
            BigDecimal guthaben = BigDecimal.valueOf(50_000);

            for( ZonedDateTime dateTime : guthabenVeraenderungenMap.keySet()) {
                if(dateTime.toLocalDate().isAfter(date)) {
                    break;
                }
                else {
                    guthaben = guthaben.add(guthabenVeraenderungenMap.get(dateTime));
                }
            }

            guthabenWerte.put(date, guthaben);

            }

        return guthabenWerte;


    }


    public List<DateStringUndWert> portfolioWertNachTag(UUID benutzerId, LocalDate anfangsDatum){
        Set<String> symbole = getSymbole(benutzerId);
        Map<String, List<LocalDateUndPreis>> closingDayWerteNachTicker = getClosingDayWerteMap(symbole);
        Map<String, List<Integer>> aktienMengeTagListeNachTicker = getAktienMengenNachTicker(benutzerId, symbole, anfangsDatum);

        return portfolioNachFormatiertenDatum(
                portfolioWertListe(
                        guthabenZuTageListe(benutzerId,anfangsDatum),
                        portfolioWerteNachTag(
                                aktienWertListeNachAktienSymbol(
                                        aktienMengeTagListeNachTicker,
                                        closingDayWerteNachTicker
                                )
                        ),
                        anfangsDatum
                )
        );


    }

    private static Map<String, List<LocalDateUndPreis>> getClosingDayWerteMap(Set<String> symbole){
        Map<String, List<LocalDateUndPreis>> closingDayWerteMap = new HashMap<>();

        AktienService aktienService = new AktienService();

        for(String symbol : symbole){
            closingDayWerteMap.put(symbol, aktienService.getClosingPricesArray2(symbol));
        }

        return closingDayWerteMap;
    }

    private Set<String> getSymbole(UUID benutzerId){
        Set<String> symbole = new HashSet<>();

        Benutzer benutzer = benutzerRepository.findBenutzerById(benutzerId).orElseThrow();
        List<Transaktion>  transaktionList = transaktionRepository.findAllByBenutzer(benutzer);

        transaktionList.stream().forEach(t-> symbole.add(t.getAktie().getSymbol()));
        return symbole;
    }

    private Map<ZonedDateTime, Integer> getZonedDateTimeAktienMengenVeraenderungsMap(UUID benutzerId, String symbol){
        Benutzer benutzer = benutzerRepository.findBenutzerById(benutzerId).orElseThrow();
        List<Transaktion> transaktionList = transaktionRepository.findAllByBenutzer(benutzer);


        Map<ZonedDateTime, Integer> zonedDateTimeAktienMengenVeraenderungsMap = new HashMap<>();
        transaktionList
                .stream()
                .filter(t -> t.getAktie().getSymbol().equals(symbol))
                .filter(t -> t.getAuftrag().getStatus().equals(Auftragsstatus.ABGESCHLOSSEN))
                .forEach(
                        t -> zonedDateTimeAktienMengenVeraenderungsMap.put(t.getZeitstempel(),
                                (t.getTransaktionstyp().equals(Transaktionstyp.KAUF)? 1 : -1)
                                        *t.getMenge()
                        )
                );
        return zonedDateTimeAktienMengenVeraenderungsMap;
    }

    private List<Integer> aktienMengenTagListe(Map<ZonedDateTime, Integer> zonedDateTimeAktienMengenVeraenderungsMap, LocalDate anfangsDatum){

        List<Integer> aktienMengen = new ArrayList<>();

        for(LocalDate date = anfangsDatum; date.isBefore(LocalDate.now()); date = date.plusDays(1) ){
            int menge = 0;

            for( ZonedDateTime dateTime : zonedDateTimeAktienMengenVeraenderungsMap.keySet()) {
                if(dateTime.toLocalDate().isAfter(date)) {
                    break;
                }
                else {
                    menge = menge + zonedDateTimeAktienMengenVeraenderungsMap.get(dateTime);
                }
            }
            aktienMengen.add(menge);
        }
        return aktienMengen;
    }

    private Map<String, List<Integer>> getAktienMengenNachTicker(UUID benutzerId, Set<String> symbole, LocalDate anfangsDatum){
        Map<String, List<Integer>> aktienMengenNachTicker1 = new HashMap<>();
        for(String symbol : symbole){
           List<Integer> aktienMengeListe = aktienMengenTagListe(
                   getZonedDateTimeAktienMengenVeraenderungsMap(benutzerId, symbol)
                   ,anfangsDatum
           );
           aktienMengenNachTicker1.put(symbol, aktienMengeListe);
        }

        return aktienMengenNachTicker1;
    }

    private Map<String, List<BigDecimal>> aktienWertListeNachAktienSymbol(Map<String,List<Integer>> aktienMengenNachTicker,
                                                                       Map<String, List<LocalDateUndPreis>> closingDayWerteArrayNachTicker ){

        Map<String, List<BigDecimal>> aktienWerteListeNachSymbol = new HashMap<>();
        if(!aktienMengenNachTicker.keySet().equals(closingDayWerteArrayNachTicker.keySet())){
            throw new RuntimeException("Aktien Symbole der Maps stimmen nicht überein");
        }

        for(String symbol : aktienMengenNachTicker.keySet()){
            List<BigDecimal> aktienWertListe = new ArrayList<>();
            List<Integer> aktienMenge = aktienMengenNachTicker.get(symbol);
            List<LocalDateUndPreis> closingWerteListe = closingDayWerteArrayNachTicker.get(symbol);
            for(int i=0; i<aktienMenge.size(); i++){
                aktienWertListe.add(BigDecimal.valueOf(aktienMenge.get(i)).multiply(closingWerteListe.get(i).getWert()));
            }
            aktienWerteListeNachSymbol.put(symbol, aktienWertListe);
        }


        return aktienWerteListeNachSymbol;
    }


    private List<BigDecimal> portfolioWerteNachTag(Map<String, List<BigDecimal>> aktienWertListeNachSymbol) {

        List<BigDecimal> portfolioWertVerlauf = new ArrayList<>();

        int j = 0;
        int i = 0;
        while (i == 0) {
            BigDecimal summeNachTag = BigDecimal.ZERO;
            for (String symbol : aktienWertListeNachSymbol.keySet()) {
                if(aktienWertListeNachSymbol.get(symbol).size()<=j){
                    i = 1;
                    break;
                }
                summeNachTag= summeNachTag.add(aktienWertListeNachSymbol.get(symbol).get(j));

            }
            portfolioWertVerlauf.add(summeNachTag);
            j++;
        }

        return portfolioWertVerlauf;
    }

    private List<LocalDateUndPreis> portfolioWertListe(Map<LocalDate, BigDecimal> guthabenNachZeit,
                                                List<BigDecimal> portfolioWertVerlauf,
                                                LocalDate anfangsDatum){
        int i = 0;
        List<LocalDateUndPreis> portfolioNachDatum = new ArrayList<>();
        for(LocalDate date = anfangsDatum; date.isBefore(date.plusDays(portfolioWertVerlauf.size())); date = date.plusDays(1)){
            portfolioNachDatum.add(
                    new LocalDateUndPreis(date,
                            guthabenNachZeit.get(date).add(portfolioWertVerlauf.get(i)
                            )));
        }

        return portfolioNachDatum;
    }

    private List<DateStringUndWert> portfolioNachFormatiertenDatum(List<LocalDateUndPreis> portfolioNachDatum){
        DateTimeFormatter dtf = DateTimeFormatter.BASIC_ISO_DATE;

        return portfolioNachDatum.stream()
                .map(p -> new DateStringUndWert(p.getDate().format(dtf).substring(6)
                        + "." + p.getDate().format(dtf).substring(4,6),
                        p.getWert()))
                .toList();

    }
}

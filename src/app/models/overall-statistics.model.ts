export interface OverallStatistics {
    ertek: string | number | GrossNetPrice;
    leiras: string;
    me: 'db' | 'óra' | 'Ft';
    megnevezes: string;
}

export interface BackendData {
    aktiv_szerelok: Worker[],
    aktiv_munkafelvevok: Worker[],
    jarmu_db: OverallStatistics,
    szamlazott_ido: OverallStatistics,
    blokkolt_ido: OverallStatistics,
    jelenleti_ido: OverallStatistics,
    munkadij_adatok: OverallStatistics,
    alkatresz_adatok: OverallStatistics,
    hiba: string,
}

interface Worker {
    id: number,
    nev: string
}

export interface GrossNetPrice {
    netto_ertek: number,
    bekerar: number
}
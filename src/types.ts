export interface GameMedia {
  iconUrl?: string;
  bannerUrl?: string;
  screenshots?: string[];
}

export interface GameDetails {
  downloads?: string;
  rating?: number | string;
  size?: string;
  ageRating?: string;
  androidVersion?: string;
  version?: string;
}

export interface DownloadLinks {
  playStoreUrl?: string;
  galaxyStoreUrl?: string;
  apk1?: string | null;
  apk2?: string | null;
  mirrors?: string[];
}

export interface Game {
  id: string;
  title: string;
  package: string;
  details: GameDetails;
  description: string;
  whatsNew?: string;
  media: GameMedia;
  downloadLinks: DownloadLinks;
}

export interface GamesData {
  games: Game[];
}

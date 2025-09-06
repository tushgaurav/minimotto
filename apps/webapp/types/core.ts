export type Torrent = {
  title: string;
  dateUploaded: string | Date;
  size: number;
  seeders: number;
  peers: number;    
  magnetLink: string;
  infohash: string;
  jackettindexer?: {
    id: string;
    name: string;
  };
};
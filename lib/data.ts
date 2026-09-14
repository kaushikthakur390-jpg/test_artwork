export type ArtworkType = 'sculpture' | 'painting';

export interface Artwork {
  id: string;
  type: ArtworkType;
  title: string;
  artist: string;
  year: number;
  medium: string;
  dimensions: string;
  description: string;
  // Specific to sculpture
  modelUrl?: string;
  iosSrc?: string;
  // Specific to painting
  imageUrl?: string;
}

export const artworks: Artwork[] = [
  {
    id: "sculpture-01",
    type: "sculpture",
    title: "UNTITLED I",
    artist: "Aria Vance",
    year: 2026,
    medium: "Bronze",
    dimensions: "82 × 41 × 38 cm",
    modelUrl: "/models/sculpture.glb",
    iosSrc: "/models/sculpture.usdz",
    description: "A meditation on balance and form, Untitled I explores the tension between organic growth and rigid structure. The dark bronze surface catches light softly, inviting tactile exploration."
  },
  {
    id: "painting-01",
    type: "painting",
    title: "UNTITLED II",
    artist: "Julian Reed",
    year: 2026,
    medium: "Oil and mixed media on canvas",
    dimensions: "120 × 90 cm",
    imageUrl: "/images/painting.jpg",
    description: "Built up in translucent layers, Untitled II reveals a complex topography of brushwork and surface texture. The deep, muted tones suggest an obscured landscape or a quiet interior."
  },
  {
    id: "sculpture-02",
    type: "sculpture",
    title: "ECHO",
    artist: "Aria Vance",
    year: 2025,
    medium: "Cast Resin and Ash",
    dimensions: "45 × 45 × 12 cm",
    modelUrl: "/models/sculpture.glb",
    description: "Cast from the negative space of a decayed root system, Echo captures a moment of absence made physical."
  },
  {
    id: "painting-02",
    type: "painting",
    title: "SILENCE IV",
    artist: "Julian Reed",
    year: 2024,
    medium: "Oil on linen",
    dimensions: "200 × 150 cm",
    imageUrl: "/images/painting.jpg",
    description: "A monumental study in restraint, where minimal shifts in value draw the viewer into a deep, atmospheric space."
  }
];

export function getArtworkById(id: string): Artwork | undefined {
  return artworks.find(a => a.id === id);
}

export function getFeaturedArtworks(): Artwork[] {
  return artworks;
}

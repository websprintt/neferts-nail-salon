export interface Service {
  id: string;
  name: string;
  category: "manicura" | "pedicura" | "nail-art" | "otros";
  price: number;
  duration: number; // in minutes
  description: string;
  popular?: boolean;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  authorPrefix?: string;
  avatarUrl?: string;
}

export interface BookingPreference {
  serviceIds: string[];
  nailArtLevel: "none" | "simple" | "complex";
  reconstructionNeeded: boolean;
  notes: string;
  name: string;
  date: string;
  timeSlot: string;
}

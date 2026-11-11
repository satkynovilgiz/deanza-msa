// All site content lives here so officers can update it without touching the layout.

export const INSTAGRAM = "https://www.instagram.com/deanzamsa";
// Prayer room shown in the Events section.
export const PRAYER_ROOM = {
  room: "Room 223",
  name: "Meditation Room",
  building: "Campus Center",
  landmark: "near Conference Rooms A & B",
  jumuah: "Every Friday · 1:00–2:30 PM",
};

export const WHATSAPP = "https://chat.whatsapp.com/HEqpLpMg5U7CRYatuVrDFF";
export const DISCORD = "https://discord.com/invite/2weyCZKHZT"; // shared Foothill–De Anza (FHDA) MSA server

// Intern application. Set INTERN_OPEN to false to hide the section when applications close.
export const INTERN_FORM = "https://docs.google.com/forms/d/e/1FAIpQLSdP9euvjz7ovwf4HqdUZiMnWqIlLjIIVJbScNk1spUzFCGY3g/viewform";
export const INTERN_OPEN = true;

export type Officer = {
  name: string;
  role: string;
  blurb: string;
  major?: string;
  surah?: { en: string; ar: string }; // favorite surah
  photo?: string; // e.g. "/officers/web/nabiha.jpg"
  photoPos?: string; // CSS object-position to keep the face in frame
  defaultPhoto?: boolean; // true = show a plain profile silhouette instead of a photo
  placeholder?: boolean; // true = still needs a real name/photo
};

export const officers: Officer[] = [
  {
    name: "Nabiha Shahid",
    role: "President",
    major: "Computer Science",
    surah: { en: "Al-Baqarah", ar: "البقرة" },
    photo: "/officers/web/nabiha.jpg",
    photoPos: "50% 30%",
    blurb: "Leads the board, sets the vision for the year and keeps MSA connected with campus partners.",
  },
  {
    name: "Azlan Shafquat",
    role: "Internal VP",
    major: "Electrical Engineering",
    surah: { en: "Ar-Rahman", ar: "الرحمن" },
    photo: "/officers/web/azlan.jpg",
    photoPos: "85% 75%",
    blurb: "Supports the president and runs board meetings and internal planning.",
  },
  {
    name: "Manahil",
    role: "External VP",
    major: "Mechanical Engineering",
    surah: { en: "Alam Nashrah", ar: "الشرح" },
    photo: "/officers/web/manahil.jpg",
    photoPos: "50% 30%",
    blurb: "Builds MSA's relationships off campus, from other MSAs to community partners and joint events.",
  },
  {
    name: "Ilgiz Satkynov",
    role: "Secretary",
    major: "Math / Computer Science",
    surah: { en: "Al-Kahf", ar: "الكهف" },
    photo: "/officers/web/ilgiz.jpg",
    photoPos: "50% 40%",
    blurb: "Keeps minutes, manages the member list and sends out weekly updates.",
  },
  {
    name: "Maryam Abdurahimova",
    role: "Events Coordinator",
    major: "Cognitive Science",
    surah: { en: "Ad-Duha", ar: "الضحى" },
    photo: "/officers/web/maryam.jpg",
    photoPos: "50% 25%",
    blurb: "Plans halaqas, socials, iftars and joint events with other MSAs.",
  },
  {
    name: "Zaid",
    role: "ICC Rep",
    major: "Business",
    surah: { en: "Al-Fatihah", ar: "الفاتحة" },
    defaultPhoto: true,
    blurb: "Represents MSA at De Anza's Inter-Club Council and keeps us connected with other clubs on campus.",
  },
  {
    name: "Salehah",
    role: "Historian",
    major: "Biology",
    surah: { en: "Ar-Rahman", ar: "الرحمن" },
    photo: "/officers/web/salehah.jpg",
    photoPos: "50% 30%",
    blurb: "Captures the year in photos and keeps a record of MSA's events and milestones.",
  },
];

export type Event = {
  title: string;
  when: string;
  where: string;
  tag: "Weekly" | "Upcoming" | "Past";
  icon: "jumuah" | "halaqa" | "iftar" | "heritage" | "bingo";
  blurb: string;
};

export const events: Event[] = [
  {
    title: "Jumu'ah Prayer",
    icon: "jumuah",
    when: "Fridays · 1:00–2:30 PM",
    where: "Campus Center, Room 223",
    tag: "Weekly",
    blurb: "Friday congregational prayer and khutbah on campus. Everyone is welcome to come and observe.",
  },
  {
    title: "Weekly Halaqa",
    icon: "halaqa",
    when: "Day & time TBA",
    where: "Location TBA",
    tag: "Weekly",
    blurb: "A relaxed study circle: a short reflection, open discussion, and snacks afterward.",
  },
  {
    title: "Ramadan Iftars",
    icon: "iftar",
    when: "Ramadan 1448 · Feb–Mar 2027",
    where: "De Anza campus",
    tag: "Upcoming",
    blurb: "Break the fast together. Open to all students, whether you're fasting or just curious.",
  },
  {
    title: "Muslim Heritage Month",
    icon: "heritage",
    when: "Spring quarter",
    where: "De Anza campus",
    tag: "Past",
    blurb: "Hosted with the Office of Equity and De Anza Student Government to celebrate Muslim history and culture.",
  },
  {
    title: "Islamic Bingo Night",
    icon: "bingo",
    when: "April 26, 2024",
    where: "West Valley Muslim Association, Saratoga",
    tag: "Past",
    blurb: "A joint night with Foothill MSA: bingo, prizes and a lot of laughing.",
  },
];

export const pillars: { title: string; arabic: string; art: "faith" | "community" | "service"; text: string }[] = [
  {
    title: "Faith",
    art: "faith",
    arabic: "إيمان",
    text: "Space to pray, learn and grow, with Jumu'ah, halaqas and reminders through the quarter.",
  },
  {
    title: "Community",
    art: "community",
    arabic: "أخوة",
    text: "Find your people between classes. Socials, study sessions and iftars that feel like home.",
  },
  {
    title: "Service",
    art: "service",
    arabic: "خدمة",
    text: "Give back to the Cupertino and South Bay community through drives and volunteering.",
  },
];

// "Moments" gallery. Each tile shows an illustration until you add a real photo:
// put the image in public/photos/ and set e.g. photo: "/photos/iftar.jpg".
export type Moment = {
  scene: "night" | "iftar" | "halaqa" | "jumuah" | "study" | "service";
  title: string;
  caption: string;
  photo?: string;
};

export const moments: Moment[] = [
  { scene: "night", title: "Nights on campus", caption: "Late conversations, lanterns and good company." },
  { scene: "iftar", title: "Ramadan iftars", caption: "Breaking the fast together at sunset." },
  { scene: "halaqa", title: "Halaqa circles", caption: "Tea, reflection and honest questions." },
  { scene: "jumuah", title: "Jumu'ah", caption: "Friday prayer, shoulder to shoulder." },
  { scene: "study", title: "Study nights", caption: "Finals season is better with friends." },
  { scene: "service", title: "Service drives", caption: "Packing boxes for the South Bay community." },
];

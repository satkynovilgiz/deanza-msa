// All site content lives here so officers can update it without touching the layout.

export const INSTAGRAM = "https://www.instagram.com/deanzamsa";

export type Officer = {
  name: string;
  role: string;
  blurb: string;
  major?: string;
  placeholder?: boolean; // true = still needs a real name/photo
};

export const officers: Officer[] = [
  {
    name: "Nabiha Shahid",
    role: "President",
    blurb: "Leads the board, sets the vision for the year and keeps MSA connected with campus partners.",
  },
  {
    name: "Name TBA",
    role: "Vice President",
    blurb: "Supports the president and runs board meetings and internal planning.",
    placeholder: true,
  },
  {
    name: "Name TBA",
    role: "Secretary",
    blurb: "Keeps minutes, manages the member list and sends out weekly updates.",
    placeholder: true,
  },
  {
    name: "Name TBA",
    role: "Treasurer",
    blurb: "Manages the club account, budgets for events and handles reimbursements.",
    placeholder: true,
  },
  {
    name: "Name TBA",
    role: "Events Coordinator",
    blurb: "Plans halaqas, socials, iftars and joint events with other MSAs.",
    placeholder: true,
  },
  {
    name: "Name TBA",
    role: "Media & Outreach",
    blurb: "Runs @deanzamsa, designs flyers and gets the word out across campus.",
    placeholder: true,
  },
];

export type Event = {
  title: string;
  when: string;
  where: string;
  tag: "Weekly" | "Upcoming" | "Past";
  blurb: string;
};

export const events: Event[] = [
  {
    title: "Jumu'ah Prayer",
    when: "Fridays · time TBA",
    where: "Location TBA",
    tag: "Weekly",
    blurb: "Friday congregational prayer and khutbah on campus. Everyone is welcome to come and observe.",
  },
  {
    title: "Weekly Halaqa",
    when: "Day & time TBA",
    where: "Location TBA",
    tag: "Weekly",
    blurb: "A relaxed study circle: a short reflection, open discussion, and snacks afterward.",
  },
  {
    title: "Ramadan Iftars",
    when: "Ramadan 1448 · Feb–Mar 2027",
    where: "De Anza campus",
    tag: "Upcoming",
    blurb: "Break the fast together. Open to all students, whether you're fasting or just curious.",
  },
  {
    title: "Muslim Heritage Month",
    when: "Spring quarter",
    where: "De Anza campus",
    tag: "Past",
    blurb: "Hosted with the Office of Equity and De Anza Student Government to celebrate Muslim history and culture.",
  },
  {
    title: "Islamic Bingo Night",
    when: "April 26, 2024",
    where: "West Valley Muslim Association, Saratoga",
    tag: "Past",
    blurb: "A joint night with Foothill MSA: bingo, prizes and a lot of laughing.",
  },
];

export const pillars = [
  {
    title: "Faith",
    arabic: "إيمان",
    text: "Space to pray, learn and grow, with Jumu'ah, halaqas and reminders through the quarter.",
  },
  {
    title: "Community",
    arabic: "أخوة",
    text: "Find your people between classes. Socials, study sessions and iftars that feel like home.",
  },
  {
    title: "Service",
    arabic: "خدمة",
    text: "Give back to the Cupertino and South Bay community through drives and volunteering.",
  },
];

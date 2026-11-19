import type { Media } from "@/lib/media";

export interface Cta {
  label: string;
  href: string;
}
export interface Split {
  id: string;
  /** Lines render as separate lines in the headline (e.g. Residences intro) */
  heading: string | string[];
  body: string[];
  cta: Cta;
  image: Media;
  imageSide: "left" | "right";
}
export interface Band {
  image: Media;
  zoom?: boolean;
}

const brochure: Cta = { label: "Request Brochure", href: "#brochure" };

/* ---------------- Home ---------------- */
export const home = {
  heroImage: {
    key: "home/hero-arch",
    alt: "Marea interior looking out to the bay",
    label: "Hero arch image (interior)",
  },
  bands: {
    exterior: {
      image: {
        key: "home/exterior",
        alt: "Marea residences from the waterfront",
        label: "Full-bleed: building exterior from the water",
      },
      zoom: true,
    },
    aerial: {
      image: {
        key: "home/aerial-pin",
        alt: "Aerial view of Batemans Bay with Marea marked",
        label: "Full-bleed: aerial with M pin",
      },
    },
    kitchen: {
      image: { key: "home/kitchen", alt: "Kitchen with natural stone island", label: "Full-bleed: kitchen" },
      zoom: true,
    },
    bay: {
      image: {
        key: "home/bay-aerial",
        alt: "Aerial view along the Clyde River to the bay",
        label: "Full-bleed: bay aerial",
      },
    },
  } satisfies Record<string, Band>,
  intro: {
    id: "beach-road",
    heading: "43 Beach Road",
    body: [
      "Set on the waterfront of Batemans Bay, Marea is a composition of six uniquely crafted residences.",
      "Each four-bedroom, three-bathroom residence begins with a refined palette of natural stone and timber, and from there every interior finish is open to make your own.",
      "Marea takes its cues from the textures and movement of its setting. Intentional sight lines draw the ocean into the home, and open-plan living flows out to an intimate balcony.",
    ],
    cta: { label: "View Residences", href: "/residences" },
    image: { key: "home/living", alt: "Living room facing the bay", label: "Square: living room to the bay" },
    imageSide: "right",
  } satisfies Split,
  statement: {
    lead: [
      { text: "Derived from the Latin roots " },
      { text: "mare", italic: true },
      { text: ", and " },
      { text: "linea", italic: true },
      { text: ", meaning " },
      { text: "sealine", italic: true },
      { text: "." },
    ],
    statement:
      "A place shaped by contrast, where intimacy meets openness and stillness rests beside the motion of the bay.",
  },
  amenities: {
    id: "amenities",
    heading: "Amenities curated for contrast",
    body: [
      "Low-light wellness facilities catching glimpses of colour from the unobstructed coastline. A still swimming pool resting beside the gentle current of the bay. A generous private rooftop with views over the welcoming Bay community.",
      "Marea offers a more intentional way to live by the water, where the architecture and the landscape sit in considered balance.",
    ],
    cta: { label: "View Amenity", href: "/amenity" },
    image: { key: "home/sauna", alt: "Stone-lined wellness room", label: "Square: wellness / sauna room" },
    imageSide: "left",
  } satisfies Split,
  amenityIcons: [
    { icon: "amenity-pool", label: "Private Pool" },
    { icon: "amenity-sauna", label: "Sauna Room" },
    { icon: "amenity-shower", label: "Outdoor Shower" },
    { icon: "amenity-bike", label: "Secure Bike Storage" },
    { icon: "amenity-parking", label: "Basement Parking" },
    { icon: "amenity-communal", label: "Communal Areas" },
  ],
  community: {
    id: "community",
    heading: "Bustling Coastal Community",
    body: [
      "Nestled between bushland and coast Marea offers an enduring connection to the natural surrounds. The area holds boundless bush tracks to explore, hidden beaches to recline on, and viewpoints to admire.",
      "Within five minutes of your front door supermarkets, cinemas and restaurants, so anything you need is never a stress to reach.",
    ],
    cta: { label: "View Neighbourhood", href: "/location" },
    image: { key: "home/marina", alt: "Batemans Bay marina from above", label: "Square: marina aerial" },
    imageSide: "right",
  } satisfies Split,
};

/* ---------------- Residences ---------------- */
export const residences = {
  hero: {
    title: "Residence",
    tone: "light" as const,
    image: {
      key: "residences/hero",
      alt: "Open-plan living with views to the bay",
      label: "Hero: living room",
    },
  },
  splits: [
    {
      id: "four-bedrooms",
      heading: ["Four Bedrooms.", "Three Bathrooms.", "Six Residences."],
      body: [
        "Living and dining open as one space toward the water, with wide glazing that frames the bay from the moment you step inside. The horizon stays in view from the kitchen bench to the sofa.",
        "Timber panelling runs through the joinery, set against a soft, textured finish to walls and ceilings. Natural stone carries through to the kitchen, chosen to sit quietly beside the colour of the water outside.",
        "Lighting and air conditioning run on an integrated smart home system and entry is by digital swipe, so it is as easy to lock up and leave as it is to come back to.",
      ],
      cta: brochure,
      image: {
        key: "residences/balcony",
        alt: "Curved balcony detail against the sky",
        label: "Square: curved balcony detail",
      },
      imageSide: "right",
    },
    {
      id: "table",
      heading: "Built around the table",
      body: [
        "A built-in, upholstered bench seat runs the length of the dining wall as a standard finish, set against the textured wall and lit by concealed lighting along its length.",
        "Natural stone frames the doorway and grained timber panelling lines the adjoining wall, with a pair of wall lights on the timber and a pendant hung over the dining area.",
        "Set between the kitchen and the balcony, it works as easily for a weekday breakfast as it does for a long dinner with friends.",
      ],
      cta: brochure,
      image: {
        key: "residences/dining",
        alt: "Dining nook with upholstered bench seat",
        label: "Square: dining bench",
      },
      imageSide: "left",
    },
    {
      id: "bathhouse",
      heading: "Designed like a bathhouse",
      body: [
        "Banded natural stone wraps the walls, with wall lights set on the stone, and twin veined-stone basins stand beneath a full-width mirror beside a freestanding bath.",
        "Each residence has three bathrooms, every one finished in natural stone and timber joinery. As in every room at Marea, the base palette is a starting point, and the stone and fittings can be changed to suit.",
        "Spaces designed for unhurried time, a rinse after a morning swim or the slow wind-down at the end of a day spent on the water.",
      ],
      cta: brochure,
      image: {
        key: "residences/bathroom",
        alt: "Bathroom with twin stone basins and freestanding bath",
        label: "Square: bathroom",
      },
      imageSide: "right",
    },
  ] satisfies Split[],
  bands: [
    {
      image: { key: "residences/kitchen", alt: "Kitchen with marble island", label: "Full-bleed: kitchen" },
      zoom: true,
    },
    {
      image: {
        key: "residences/bedroom",
        alt: "Main bedroom in warm timber tones",
        label: "Full-bleed: bedroom",
      },
    },
  ] satisfies Band[],
};

/* ---------------- Amenity ---------------- */
export const amenity = {
  hero: {
    title: "Amenity",
    tone: "dark" as const,
    image: { key: "amenity/hero", alt: "Amenity hero", label: "Hero: amenity" },
  },
  splits: [
    {
      id: "contrast",
      heading: "Anchored by contrast",
      body: [
        "Duality sits at the heart of Marea, between intimacy and openness, seclusion and connection. Each contrast is weighed so every space feels at home in its setting.",
        "Beyond the residence, a ground-floor pool and wellness space, a rooftop terrace and a boat ramp to the marina bring the bay into everyday life.",
        "Marea offers a more intentional way to live by the water, where the architecture and the landscape sit in considered balance.",
      ],
      cta: brochure,
      image: { key: "amenity/contrast", alt: "Amenity detail", label: "Square: amenity detail" },
      imageSide: "right",
    },
    {
      id: "balanced",
      heading: "A balanced Lifestyle",
      body: [
        "On the ground floor, a dedicated wellness space holds a sauna, cold plunge and private shower space, set apart from the residences above and kept deliberately low-lit and still.",
        "Beside it, the swimming pool looks out across the bay, so a morning swim, a session in the sauna and a cold plunge can all happen before breakfast without leaving the building.",
      ],
      cta: brochure,
      image: {
        key: "amenity/wellness",
        alt: "Wellness space with sauna and cold plunge",
        label: "Square: wellness space",
      },
      imageSide: "left",
    },
    {
      id: "communal",
      heading: "Communal spaces Designed to host",
      body: [
        "Marea takes its cues from the textures, tones and movement of the bay. Intentional architectural sight lines draw the ocean into the home and expansive open-plan living flows out to an intimate balcony.",
        "Set on the waterfront of Batemans Bay, Marea is a composition of six uniquely crafted residences.",
        "Across three generous storeys, each four-bedroom, three-bathroom residence considers the surrounding bushland and coastal shoreline.",
      ],
      cta: brochure,
      image: { key: "amenity/communal", alt: "Communal rooftop space", label: "Square: communal space" },
      imageSide: "right",
    },
  ] satisfies Split[],
  bands: [
    {
      image: { key: "amenity/pool", alt: "Swimming pool looking across the bay", label: "Full-bleed: pool" },
      zoom: true,
    },
    { image: { key: "amenity/rooftop", alt: "Rooftop terrace", label: "Full-bleed: rooftop" } },
    { image: { key: "amenity/closing", alt: "Marea amenity", label: "Full-bleed: closing image" } },
  ] satisfies Band[],
};

/* ---------------- Location ---------------- */
export const location = {
  hero: {
    title: "Location",
    tone: "dark" as const,
    image: {
      key: "location/hero",
      alt: "Boat moored on the calm bay at dusk",
      label: "Hero: boat on the bay",
    },
  },
  splits: [
    {
      id: "explore",
      heading: "First rest, then explore",
      body: [
        "Batemans Bay sits where the Clyde River meets the Pacific. The river supplies oysters sold at the farm gate and keeps the water calm at the moorings, while the coast to the south extends into quiet beaches backing onto national park.",
        "It’s a town with its own life all year round, quiet enough to hear your own breath, and busy enough to have everything you need when you need it.",
      ],
      cta: brochure,
      image: {
        key: "location/rest",
        alt: "Glass of wine on a balcony overlooking the water",
        label: "Square: balcony at dusk",
      },
      imageSide: "right",
    },
    {
      id: "essentials",
      heading: "Everyday Essentials within reach.",
      body: [
        "Batemans Bay is small enough to keep its calm, and large enough to have what you need. Supermarkets and restaurants are within five minutes of the front door, along with a cinema and the everyday shops, so the weekly errands take a morning rather than the day.",
      ],
      cta: brochure,
      image: {
        key: "location/dining",
        alt: "Wine being poured at a waterfront restaurant",
        label: "Square: waterfront dining",
      },
      imageSide: "left",
    },
    {
      id: "golf",
      heading: "Catalina Golf Club",
      body: [
        "Just moments from Marea, the Catalina Golf Club is part of the rhythm of life in Batemans Bay. Its 27-hole championship course is set among tall native trees, alongside relaxed dining and generous social spaces that extend life well beyond the residence.",
      ],
      cta: brochure,
      image: { key: "location/golf", alt: "Catalina Golf Club green", label: "Square: golf course" },
      imageSide: "right",
    },
  ] satisfies Split[],
  bands: [
    {
      image: {
        key: "location/aerial-pin",
        alt: "Aerial view of Batemans Bay with Marea marked",
        label: "Full-bleed: aerial with M pin",
      },
      zoom: true,
    },
    {
      image: {
        key: "location/main-street",
        alt: "Batemans Bay main street",
        label: "Full-bleed: main street",
      },
    },
  ] satisfies Band[],
  map: {
    key: "location/illustrated-map",
    alt: "Illustrated map of Batemans Bay with numbered points of interest",
    label: "Illustrated map (1440 × 788)",
  },
};

/* ---------------- Team ---------------- */
export const team = {
  developer: {
    label: "Designed and Developed By",
    body: [
      "PlaceCo is a vertically-integrated development group shaping projects from concept to delivery.",
      "Each development is shaped with a focus on quality, durability and long-term performance. Architectural integrity, environmental consideration and commercial discipline are balanced to deliver projects designed to endure and contribute lasting value over time.",
    ],
    image: {
      key: "team/building",
      alt: "Place Co residential building with timber screens and palms",
      label: "Square: Place Co project",
    },
  },
  agency: {
    heading: "Sales Agent",
    body: "The Property Collective is seasoned in the NSW South Coast property market, providing seamless end-to-end buying experience.",
  },
};

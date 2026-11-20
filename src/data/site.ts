export const site = {
  name: "Marea",
  tagline: "Batemans Bay",
  url: "https://mareabatemansbay.com.au",
  description:
    "Marea is a collection of six custom four-bedroom waterfront residences at 43 Beach Road, Batemans Bay NSW.",
  address: { line1: "43 Beach Rd,", line2: "Batemans Bay, NSW", short: "43 Beach Road, Batemans Bay NSW" },
  heroMeta: [
    "43 Beach Road, Batemans Bay NSW",
    "Custom four-bedroom waterfront residences",
    "Shaped by balance",
  ],
  nav: [
    { label: "Home", href: "/" },
    { label: "Amenity", href: "/amenity" },
    { label: "Residences", href: "/residences" },
    { label: "Location", href: "/location" },
    { label: "Team", href: "/team" },
  ],
  agents: [
    {
      name: "Nathan Page",
      phone: "0499 054 888",
      photo: {
        key: "team/nathan-page",
        alt: "Nathan Page",
        label: "Agent portrait: Nathan Page",
        position: "top",
      },
    },
    {
      name: "Liam Lagana",
      phone: "0498 441 335",
      photo: {
        key: "team/liam-lagana",
        alt: "Liam Lagana",
        label: "Agent portrait: Liam Lagana",
        position: "top",
      },
    },
  ],
  primaryPhone: "0498 441 335",
  credit: { text: "Made by a bunch of", linkText: "characters", href: "https://characters.agency" },
  disclaimer:
    "Images are artist's impressions for illustrative purposes only. Plans, finishes and specifications are indicative and subject to change without notice. Purchasers should rely on their own enquiries and the contract for sale.",
} as const;

export const telHref = (phone: string) => `tel:+61${phone.replace(/\s/g, "").replace(/^0/, "")}`;

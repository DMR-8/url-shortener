import { defineStore } from "pinia";

export const useLinkStore = defineStore("linkStore", {
  state: () => ({
    links: JSON.parse(localStorage.getItem("links") || "[]") as LinkData[],
  }),
  actions: {
    addLink(link: LinkData) {
      let isFound = false;
      this.links.forEach((linkInDB) => {
        if (linkInDB.org_link === link.org_link) {
          isFound = true;
        }
      });
      if (!isFound) {
        this.links.push(link);
        localStorage.setItem("links", JSON.stringify(this.links));
      }
    },
    getAllLinks(): LinkData[] {
      return this.links;
    },
    checkLink(link: string): boolean {
      this.links.forEach((linkInDB) => {
        if (linkInDB.org_link === link) {
          return true;
        }
      });
      return false;
    },
    getLink(link: string): LinkData {
      this.links.forEach((linkInDB) => {
        if (linkInDB.org_link === link) {
          return linkInDB;
        }
      });
      return {} as LinkData;
    },
  },
});

export interface LinkData {
  org_link: string;
  short_link: string;
}

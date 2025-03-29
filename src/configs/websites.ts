import type { WebsitesData } from "~/types";

const websites: WebsitesData = {
  favorites: {
    title: "Socials",
    sites: [
      {
        id: "my-github",
        title: "Github",
        img: "img/sites/github.svg",
        link: "https://github.com/walletkun"
      },
      {
        id: "my-linkedin",
        title: "Linkedin",
        img: "img/sites/linkedin.svg",
        link: "https://www.linkedin.com/in/fei-lincs"
      },
      {
        id: "devpost",
        title: "Devpost",
        img: "img/sites/devpost.png",
        link: "https://www.devpost.com/walletkun"
      },
      {
        id: "my-email",
        title: "Email",
        img: "img/sites/gmail.svg",
        link: "mailto:feilinpersonal@gmail.com"
      }
    ]
  },
  freq: {
    title: "Frequently Visited",
    sites: [
      {
        id: "github",
        title: "Github",
        img: "img/sites/github.svg",
        link: "https://github.com/"
      },
      {
        id: "arxiv",
        title: "youtube",
        img: "img/sites/youtube.svg",
        link: "https://youtube.com/"
      },
      {
        id: "leetcode",
        title: "LeetCode",
        img: "img/sites/leetcode.svg",
        link: "https://leetcode.com/"
      },
      {
        id: "reddit",
        title: "Reddit",
        img: "img/sites/reddit.svg",
        link: "https://www.reddit.com/"
      },
      {
        id: "hacker-news",
        title: "Hacker News",
        img: "img/sites/hacker.svg",
        link: "https://news.ycombinator.com/"
      },
      {
        id: "steam",
        title: "Steam",
        img: "img/sites/steam.svg",
        link: "https://store.steampowered.com/"
      },
      {
        id: "nazo",
        title: "Nazo",
        link: "https://nazo.one-story.cn"
      },
      {
        id: "svgomg",
        title: "SVGOMG",
        img: "https://jakearchibald.github.io/svgomg/imgs/icon.png",
        link: "https://jakearchibald.github.io/svgomg/"
      },
      {
        id: "tiny-png",
        title: "Tiny PNG",
        img: "https://tinypng.com/images/panda-chewing-2x.png",
        link: "https://tinypng.com/"
      }
    ]
  }
};

export default websites;

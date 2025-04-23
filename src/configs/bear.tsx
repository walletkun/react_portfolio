import type { BearData } from "~/types";

const bear: BearData[] = [
  {
    id: "profile",
    title: "Profile",
    icon: "i-la:code",
    md: [
      {
        id: "about-me",
        title: "About Me",
        file: "markdown/about-me.md",
        icon: "i-la:user",
        excerpt: "Hey there! I love to build projects..."
      },
      {
        id: "github-stats",
        title: "Github Stats",
        file: "markdown/github-stats.md",
        icon: "i-icon-park-outline:github",
        excerpt: "Working on it..."
      },
      {
        id: "about-site",
        title: "About This Site",
        file: "markdown/about-site.md",
        icon: "i-octicon:browser",
        excerpt: "Shouting out to @Renovamen!"
      }
    ]
  },
  {
    id: "project",
    title: "Projects",
    icon: "i-octicon:repo",
    md: [
      {
        id: "alexandria-boostagram",
        title: "Alexandria",
        file: "https://raw.githubusercontent.com/walletkun/Bookstagram/refs/heads/main/README.md",
        icon: "i-material-symbols:work",
        excerpt: "Platform built for book ethuiast...",
        link: "https://github.com/walletkun/Bookstagram"
      },
      {
        id: "cicero-ai-tutor",
        title: "CICERO",
        file: "https://raw.githubusercontent.com/walletkun/CICERO/refs/heads/main/README.md",
        icon: "i-ri:brain-line",
        excerpt: "AI-powered tutor...",
        link: "https://github.com/walletkun/cicero"
      },
      {
        id: "emotionfy",
        title: "Emotionfy",
        file: "https://raw.githubusercontent.com/walletkun/Emotionfy/refs/heads/main/README.md",
        icon: "i-fluent:emoji-sad-16-filled",
        excerpt: "Real-time sentiment analysis with music..",
        link: "https://github.com/walletkun/emotionfy"
      },
      {
        id: "hotdog-detector",
        title: "Hotdog Detector 2.0",
        file: "https://raw.githubusercontent.com/walletkun/hotdog_detector/refs/heads/main/README.md",
        icon: "i-twemoji:hotdog",
        excerpt: "Brain rotted hackathon, I don't know it's funny I guess..",
        link: "https://github.com/walletkun/hotdog_detector"
      },
      {
        id: "guessdle",
        title: "Guessdle",
        file: "https://raw.githubusercontent.com/walletkun/guessdle/refs/heads/main/README.md",
        icon: "i-carbon:data-vis-4",
        excerpt: "Guess like you in wordle..",
        link: "https://github.com/walletkun/guessdle"
      }
    ]
  }
];

export default bear;

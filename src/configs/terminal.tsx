import type { TerminalData } from "~/types";

const terminal: TerminalData[] = [
  {
    id: "about",
    title: "about",
    type: "folder",
    children: [
      {
        id: "about-bio",
        title: "bio.txt",
        type: "file",
        content: (
          <div className="py-1">
            <div>
              Hi, this is Fei Lin. I am an undergoing undergraduate student at CUNY
              Brooklyn College majoring in Computer Science with a focus in Data Science.
            </div>
          </div>
        )
      },
      {
        id: "about-interests",
        title: "interests.txt",
        type: "file",
        content: "Software Engineering / Full Stack development / Data Analytic"
      },
      {
        id: "about-who-cares",
        title: "who-cares.txt",
        type: "file",
        content:
          "I'm looking for software engineering internship for Summer 2025. I'm open to any locations!"
      },
      {
        id: "about-contact",
        title: "contact.txt",
        type: "file",
        content: (
          <ul className="list-disc ml-6">
            <li>
              Email:{" "}
              <a
                className="text-blue-300"
                href="mailto:feilinpersonal@gmail.com"
                target="_blank"
                rel="noreferrer"
              >
                feilinpersonal@gmail.com
              </a>
            </li>
            <li>
              Github:{" "}
              <a
                className="text-blue-300"
                href="https://github.com/walletkun"
                target="_blank"
                rel="noreferrer"
              >
                @walletkun
              </a>
            </li>
            <li>
              <a
                className="text-blue-300"
                href="https://devpost.com/walletkun"
                target="_blank"
                rel="noreferrer"
              >
                Devpost
              </a>
            </li>
            <li>
              Linkedin:{" "}
              <a
                className="text-blue-300"
                href="https://www.linkedin.com/in/fei-lincs"
                target="_blank"
                rel="noreferrer"
              >
                fei-lincs
              </a>
            </li>
            <li>
              Personal Website:{" "}
              <a
                className="text-blue-300"
                href="https://walletkun.com"
                target="_blank"
                rel="noreferrer"
              >
                https://walletkun.com
              </a>
            </li>
          </ul>
        )
      }
    ]
  },
  {
    id: "about-dream",
    title: "my-dream.cpp",
    type: "file",
    content: (
      <div className="py-1">
        <div>
          <span className="text-yellow-400">while</span>(
          <span className="text-blue-400">sleeping</span>) <span>{"{"}</span>
        </div>
        <div>
          <span className="text-blue-400 ml-9">money</span>
          <span className="text-yellow-400">++</span>;
        </div>
        <div>
          <span>{"}"}</span>
        </div>
      </div>
    )
  }
];

export default terminal;

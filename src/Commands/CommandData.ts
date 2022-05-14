import type { ApplicationCommandData } from "discord.js";

export const poll: ApplicationCommandData = {
  name: "poll",
  description: "Start a poll",
  type: 1, //"CHAT_INPUT",
  options: [
    {
      type: 3, //"STRING",
      name: "title",
      description: "Title of the poll",
      required: true,
    },
    {
      type: 3, //"STRING",
      description: "Choice #1",
      name: "choice-1",
      required: true,
    },
    {
      type: 3, //"STRING",
      description: "Choice #2",
      name: "choice-2",
      required: true,
    },
    {
      type: 3, //"STRING",
      description: "Choice #3",
      name: "choice-3",
      required: false,
    },
    {
      type: 3, //"STRING",
      description: "Choice #4",
      name: "choice-4",
      required: false,
    },
    {
      type: 3, //"STRING",
      description: "Choice #5",
      name: "choice-5",
      required: false,
    },
  ],
};

export const kari: ApplicationCommandData = {
  name: "kari",
  description: "Kari ?? Häkkinen",
  type: 1, //"CHAT_INPUT",
};

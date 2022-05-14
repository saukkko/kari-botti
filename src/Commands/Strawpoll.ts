import fetch from "node-fetch";
import type { Response } from "node-fetch";
import type { PollConfig, PollOpts } from "../types/PollTypes";

const API = new URL("https://api.strawpoll.com/v3");

const createPoll = async (
  title: string,
  opts: PollOpts[],
  config?: PollConfig,
  type?: "ranked_choice" | "meeting" | "multiple_choice"
): Promise<Response> => {
  API.pathname = API.pathname + "/polls";
  return fetch(API.href, {
    method: "POST",
    headers: {
      "X-API-Key": process.env.STRAWPOLL_TOKEN ?? "",
      "Content-TYpe": "application/json",
    },
    body: JSON.stringify({
      title: title,
      poll_options: opts,
      poll_config: config,
      type: type || "multiple_choice",
    }),
  });
};

export const pollCommand = async (
  title: string,
  opts: PollOpts[],
  config?: PollConfig,
  type?: "ranked_choice" | "meeting" | "multiple_choice"
): Promise<string> => {
  return new Promise((resolve, reject) => {
    createPoll(title, opts, config, type)
      .then((res) => res.json())
      .then((data: any) => {
        resolve(data.url);
      })
      .catch((err) => {
        console.error(err);
        reject(err.message);
      });
  });
};

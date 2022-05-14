import { Router } from "express";
import { verifyToken } from "./Validate.js";
import type { APIInteractionResponse } from "../types/Interactions.js";
import { kariCommand } from "../Commands/Kari.js";
import { pollCommand } from "../Commands/Strawpoll.js";
import { APIApplicationCommandInteractionDataChannelOption } from "discord-api-types/v10";
import type { ApplicationCommandData } from "discord.js";

export const API = Router();

API.use(async (req, res, next) => {
  const body = String(req.body);
  const signature = String(req.header("X-Signature-Ed25519"));
  const timestamp = String(req.header("X-Signature-Timestamp"));

  verifyToken(body, timestamp, signature, process.env.PUBLIC_KEY).then(
    (valid) =>
      valid
        ? next()
        : res
            .status(401)
            .json({ code: res.statusCode, message: "invalid signature" })
  );
});

API.post("/interaction", async (req, res) => {
  const body = JSON.parse(req.body);
  const data: ApplicationCommandData = body.data;
  const requestType: number = body.type;
  const options: APIApplicationCommandInteractionDataChannelOption[] =
    body.data.options;

  let content = "";
  let payload: APIInteractionResponse;

  switch (requestType) {
    // PING
    case 1:
      payload = { type: 1 };
      res.status(200).json(payload);
      break;

    // APPLICATION_COMMAND
    case 2:
      content = await commandChooser(data.name, options);

      payload = { type: 4, data: { content: content } };
      res.status(200).json(payload);
      break;

    // MESSAGE_COMPONENT
    case 3:
      res.sendStatus(501);
      break;

    // APPLICATION_COMMAND_AUTOCOMPLETE
    case 4:
      res.sendStatus(501);
      break;

    // MODAL_SUBMIT
    case 5:
      res.sendStatus(501);
      break;

    default:
      res.status(400).json({ code: res.statusCode, message: "Bad request" });
  }
});

const commandChooser = async (
  commandName: string,
  opts?: APIApplicationCommandInteractionDataChannelOption[]
): Promise<string> => {
  if (!opts) opts = [];
  const [title, ...choices] = opts;

  switch (commandName) {
    case "kari":
      return await kariCommand();

    case "poll":
      return await pollCommand(
        title.value,
        choices.map((choice, i) => {
          return { type: "text", position: i, value: choice.value };
        })
      );

    default:
      return "Unknown command";
  }
};

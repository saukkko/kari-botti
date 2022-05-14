import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";
import dotenv from "dotenv";
import { poll, kari } from "./Commands/CommandData.js";
import { app } from "./Express/App.js";

import type { ApplicationCommandData, Snowflake } from "discord.js";
dotenv.config();

// check if env vars are set
const keys = ["TOKEN", "CLIENT_ID", "STRAWPOLL_TOKEN", "PUBLIC_KEY"];
if (!keys.every((key) => process.env[key])) process.exit(1);
export const isDebug = !(process.env.NODE_ENV === "production");

const rest = new REST().setToken(process.env.TOKEN);
const guilds = {
  nta220sa: "760892189789388820",
  test: "691669279376146452",
};

const registerCommands = async (
  commands: ApplicationCommandData[],
  guildIds: Snowflake[],
  appId: string
) => {
  guildIds.forEach(async (guildId, i) => {
    await rest
      .put(Routes.applicationGuildCommands(appId, guildId), {
        body: commands,
      })
      .then((res: any) =>
        res.forEach((cmd: any) =>
          isDebug
            ? console.debug(JSON.stringify(cmd, null, 2))
            : console.log(
                `Command "${cmd.name}" registered successfully on server ${cmd.guild_id}`
              )
        )
      )
      .catch((err) =>
        isDebug ? console.error(err) : console.error(err.message)
      );
  });
};

await registerCommands([kari], Object.values(guilds), process.env.CLIENT_ID);
await registerCommands([poll, kari], [guilds.test], process.env.CLIENT_ID);

const PORT = parseInt(process.env.PORT || "3000");
app.listen(PORT, () => console.log(`Server ready on port: ${PORT}`));

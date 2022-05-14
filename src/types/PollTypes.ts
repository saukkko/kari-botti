export type PollOpts = (TextPollOpts | DatePollOpts | ImgPollOpts) & {
  id?: string;
  type: "text" | "image" | "date" | "time_range";
  position: number;
  max_votes?: number;
  description?: string;
  is_write_in?: boolean;
  value?: string | number | boolean;
};
export type PollConfig = {
  vote_type?: string;
};

type ImgPollOpts = {
  type: "image";
  media: {
    type: "image" | "video" | "youtube" | "giphy";
    source: string;
  };
};
type TextPollOpts = {
  type: "text";
  value?: string;
};
type DatePollOpts = {
  type: "date";
};

export type PollResponse = {
  id: string;
  url: string;
};

export type PollCommandOpts = {
  title: string;
  pollOpts: PollOpts[];
  config?: PollConfig | undefined;
  type?: "ranked_choice" | "meeting" | "multiple_choice" | undefined;
};

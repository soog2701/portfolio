import { rest } from "msw";
import dummy from "../dummy/listData.json";

export const handlers = [
  rest.get("/todos", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(dummy));
  }),

  rest.post("/todos", (req, res, ctx) => {
    dummy.list.push(req.body);
    return res(ctx.status(201));
  }),
];

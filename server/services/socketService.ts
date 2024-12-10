import { Server, Socket } from "socket.io";
import { EVENT } from "../types/types.ts";

export default class SocketService {
  private _io: Server;

  constructor() {
    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });
  }

  public initListeners() {
    const io = this._io;

    io.on("connect", (socket) => {
      socket.on(EVENT.INPUT, async (data: {}) => {});

      socket.on(
        EVENT.STREAM,
        async (data: { id: string; command: string }) => {}
      );

      socket.on(EVENT.UPDATE, async (data: { id: string }) => {});
    });
  }

  get io() {
    return this._io;
  }
}

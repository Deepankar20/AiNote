import { Server, Socket } from "socket.io";
import { EVENT } from "../types/types.ts";
import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";

export default class SocketService {
  private _io: Server;
  private genAI: GoogleGenerativeAI;
  private model: GenerativeModel;

  constructor() {
    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });

    this.genAI = new GoogleGenerativeAI(`${process.env.GEMINI_API_KEY}`);
    this.model = this.genAI.getGenerativeModel({
      model: `${process.env.GEMINI_MODEL}`,
    });
  }

  public initListeners() {
    const io = this._io;

    io.on("connect", (socket) => {
      socket.on(
        EVENT.INPUT,
        async (data: { input: string; userId: string }) => {
          try {
            console.log(data);

            const stream = await this.model.generateContent(data.input);
            console.log(stream.response.text());

            io.emit(EVENT.STREAM, stream);
          } catch (error) {
            console.error("Error generating text:", error);
          }
        }
      );

      socket.on(EVENT.UPDATE, async (data: { id: string }) => {});
    });
  }

  get io() {
    return this._io;
  }
}

import {
  HandlerFunc,
  Context,
} from "https://deno.land/x/abc@v1.0.0-rc2/mod.ts";

import connectionDatabase from "../../database/connection.ts";
import { ErrorHandler } from "../../utils/handleError.ts";

const database = connectionDatabase.findDatabase;
const user = database.collection("users");

export const deleteUser: HandlerFunc = async (data: Context) => {
  try {
    const { id } = data.params as { id: string };

    const existUser = await user.findOne({ _id: { "$oid": id } });

    if (existUser) {
      const deleteCount = await user.deleteOne({ _id: { "$oid": id } });
      if (deleteCount) {
        return data.string("Usuário foi deletado!", 204);
      }
      throw new ErrorHandler("Não foi possivel excuir esse usuário", 400);
    }

    throw new ErrorHandler("Usuário não encontrado", 404);
  } catch (error) {
    throw new ErrorHandler(error.message, error.status || 500);
  }
};

 
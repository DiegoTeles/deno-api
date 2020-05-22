import {
  HandlerFunc,
  Context,
} from "https://deno.land/x/abc@v1.0.0-rc2/mod.ts";

import connectionDatabase from "../../database/connection.ts";
import { ErrorHandler } from "../../utils/handleError.ts";

const database = connectionDatabase.findDatabase;
const user = database.collection("users");

export const updateUser: HandlerFunc = async (data: Context) => {
  try {
    const { id } = data.params as { id: string };

    if (data.request.headers.get("content-type") !== "application/json") {
      throw new ErrorHandler("Invalid body", 422);
    }

    const body = await (data.body()) as {
      name?: string;
      middleName?: string;
      profession?: string;
    };

    console.log('body :>> ', body)

    if (!Object.keys(body).length) {
      throw new ErrorHandler("O body não pode estar vazio!", 400);
    }

    const existUser = await user.findOne({ _id: { "$oid": id } });

    if (existUser) {
      const { matchedCount } = await user.updateOne(
        { _id: { "$oid": id } },
        { $set: body },
      );

      if (matchedCount) {
        return data.string("O usuário foi atualizado com sucesso!", 204);
      }
      return data.string("Não foi possivel atualizar esse usuário");
    }
    throw new ErrorHandler("Usuário não encontrado", 404);
  } catch (error) {
    throw new ErrorHandler(error.message, error.status || 500);
  }
};

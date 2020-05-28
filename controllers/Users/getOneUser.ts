import {
  HandlerFunc,
  Context,
} from "abc";

import connectionDatabase from "../../database/connection.ts";
import { ErrorHandler } from "../../utils/handleError.ts";

const database = connectionDatabase.findDatabase;
const user = database.collection("users");

export const getUser: HandlerFunc = async (data: Context) => {
  try {
    const { id } = data.params as { id: string };

    const existUser = await user.findOne({ _id: { "$oid": id } });

    if (existUser) {
      const { _id: { $oid }, name, middleName, profession } = existUser;
      return data.json({ id: $oid, name, middleName, profession }, 200);
    }

    throw new ErrorHandler("Usuário não encontrado", 404);
  } catch (error) {
    throw new ErrorHandler(error.message, error.status || 500);
  }
};

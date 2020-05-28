import {
  HandlerFunc,
  Context,
} from "abc";

import connectionDatabase from "../../database/connection.ts";
import { ErrorHandler } from "../../utils/handleError.ts";

const database = connectionDatabase.findDatabase;
const user = database.collection("users");

export const createUser: HandlerFunc = async (data: Context) => {
  try {
    if (data.request.headers.get("content-type") !== "application/json") {
      throw new ErrorHandler("Body invalido", 422);
    }
    const body = await (data.body());

    console.log('body :>> ', body);
    if (!Object.keys(body).length) {
      throw new ErrorHandler("O body não pode estar vazio!!", 400);
    }
    const { name, profession, middleName } = body;

    await user.insertOne({
      name,
      middleName,
      profession,
    });

    return data.json('Usuário cadastrado com sucesso', 201);
  } catch (error) {
    throw new ErrorHandler(error.message, error.status || 500);
  }
};


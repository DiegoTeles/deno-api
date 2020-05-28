import {
    HandlerFunc,
    Context,
  } from "abc";

import connectionDatabase from "../../database/connection.ts";
import { ErrorHandler } from "../../utils/handleError.ts";
import Users from '../../model/users.ts'

const database = connectionDatabase.findDatabase;
const user = database.collection("users");

export const getAllUsers: HandlerFunc = async (data: Context) => {
    try {
        const existUser: Users[] = await user.find();

        if (existUser) {
            const list = existUser.length
                ? existUser.map((item: any) => {
                    const { _id: { $oid }, name, middleName, profession } = item;

                    console.log('item :>> ', item);
                    return { id: $oid, name, middleName, profession };
                }) : [];

            return data.json(list, 200);
        }
    } catch (error) {
        throw new ErrorHandler(error.message, error.status || 500);
    }
};


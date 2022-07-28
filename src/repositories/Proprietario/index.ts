import IRepository from "../IRepository";
import { IEstabelecimento } from "../../models/Estabelecimento";
import { IProprietario } from "../../models/Proprietario";
import { isObjectIdOrHexString, Model } from "mongoose";

export default class ProprietarioRepository implements IRepository {
  private proprietarioModel: any;
  constructor(proprietarioModel: Model<IProprietario>) {
    this.proprietarioModel = proprietarioModel;
  }
  async create(payload: {
    nome: string;
    email: string;
    senha: string;
    hashResetSenha: string | null;
    estabelecimento: IEstabelecimento[];
  }) {
    return this.proprietarioModel.create(payload);
  }

  async find() {
    return this.proprietarioModel.find({}, ['-senha', '-__v']);
  }

  async findOne(id: any) {
    return this.proprietarioModel.findById(id, ['-senha', '-__v']);
  }

  async update(
    id: any,
    payload: {
      nome: string;
      email: string;
      senha: string;
    }
  ) {
    await this.proprietarioModel.findById({ _id: id }, payload);
  }

  async delete(id: any) {
    return await this.proprietarioModel.deleteOne({ _id: id });
  }
}

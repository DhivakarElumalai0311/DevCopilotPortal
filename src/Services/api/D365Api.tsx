import { EasyApiService } from "./base/EasyApiService.ts";
import {
  OrderRequest,
  OrderReponse,
} from "../../Components/Component.types.ts";

const URLs = {
  validateAndCreateSO: `https://6221264be246e22d8ef90bd569d3ec.02.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/17cce0b29a5e4c6bbdc2a66a20a9579c/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=SqEQzRnr1vPr17n9WLdEpdbUpf-7Qb4Ph0mjTN915r4`,
  getProducts: `https://orderfullfilmentscm.azurewebsites.net/api/get-products-list`,
};

class D365ApiClass extends EasyApiService {
  public ValidateAndCreateSO = (request: OrderRequest) =>
    this.postEasy<void>(URLs.validateAndCreateSO, request);

  public GetProducts = () => this.fetchEasy<OrderReponse>(URLs.getProducts);
}

export const D365Api = new D365ApiClass();

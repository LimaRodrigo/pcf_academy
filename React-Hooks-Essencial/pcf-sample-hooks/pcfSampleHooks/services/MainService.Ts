import { IInputs } from "../generated/ManifestTypes";
import { dynamicsService } from "./DynamicsService";

interface IMainService {
    dynService: dynamicsService;

}

export class MainService<T> implements IMainService {
    dynService: dynamicsService;

    constructor(context: ComponentFramework.Context<IInputs> | undefined, mockEntities?: ComponentFramework.WebApi.Entity[]) {
        this.dynService = new dynamicsService(context, 1500, mockEntities);
    }

    getData = async (entityName: string, optionOdata?: string): Promise<T[]> => {
        const data = await this.dynService.RetrieveMultipleAsync(entityName, optionOdata);
        return data.entities as T[];
    }

}
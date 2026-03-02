import { MeatballDBA } from "../DBAs/MeatballDBA";
import { CreateMeatballRequestDTO } from "../DTOs/Meatball/CreateMeatballRequestDTO";
import { MeatballDTO } from "../DTOs/Meatball/MeatballDTO";
import { Meatball } from "../models/Meatball";

export class MeatballBusinessLogic {
  static createMeatball(dto: CreateMeatballRequestDTO): MeatballDTO {
    const resp: Meatball = MeatballDBA.createMeatball(dto.name, dto.instructions, dto.description);

    return {
      id: resp.id,
      name: resp.name,
      description: resp.description,
      instructions: resp.instructions,
      createdTimestamp: resp.created_timestamp,
      editedTimestamp: resp.edited_timestamp,
    } as MeatballDTO;
  }
}
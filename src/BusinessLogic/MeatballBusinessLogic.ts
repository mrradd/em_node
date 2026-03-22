import { MeatballDBA } from "../DBAs/MeatballDBA";
import { CreateMeatballRequestDTO } from "../DTOs/Meatball/CreateMeatballRequestDTO";
import { GetAllMeatballsResponseDTO } from "../DTOs/Meatball/GetAllMeatballsResponseDTO";
import { MeatballDTO } from "../DTOs/Meatball/MeatballDTO";
import { UpdateMeatballRequestDTO } from "../DTOs/Meatball/UpdateMeatballRequestDTO";
import { UpdateMeatballResponseDTO } from "../DTOs/Meatball/UpdateMeatballResponseDTO";
import { Meatball } from "../models/Meatball";

export class MeatballBusinessLogic {

  static createMeatball(dto: CreateMeatballRequestDTO): MeatballDTO | null {
    const res: Meatball | null = MeatballDBA.createMeatball(dto.name, dto.instructions, dto.description);

    if (!res) {
      return null;
    }

    return this.toMeatballDTO(res);
  }

  static deleteMeatballById(id: string) {
    return MeatballDBA.deleteMeatball(id);
  }

  static getMeatballById(id: string): MeatballDTO | null {
    const res: Meatball | null = MeatballDBA.getMeatballById(id);

    if (res) {
      return this.toMeatballDTO(res);
    }
    else {
      return null;
    }
  }

  static getMeatballs(): GetAllMeatballsResponseDTO {
    const res: Meatball[] | null = MeatballDBA.getMeatballs();
    let dto = {} as GetAllMeatballsResponseDTO;

    if (res) {
      dto.meatballs = res.map((meatball) => {
        return this.toMeatballDTO(meatball);
      });
    }

    return dto;
  }

  static updateMeatball({ id, name, instructions, description }: UpdateMeatballRequestDTO): UpdateMeatballResponseDTO | null {
    const newMeatballData: Partial<Meatball> = {
      id: id,
      name: name,
      description: description,
      instructions: instructions,
    };

    const res: Partial<Meatball> | null = MeatballDBA.updateMeatball(newMeatballData);

    if (!res) {
      return null;
    }

    const dto: UpdateMeatballResponseDTO = {
      id: res.id!,
      name: res.name || undefined,
      description: res.description || undefined,
      instructions: res.instructions || undefined,
    }

    return dto;
  }

  static toMeatballDTO(meatball: Meatball): MeatballDTO {
    return {
      id: meatball.id,
      name: meatball.name,
      description: meatball.description,
      instructions: meatball.instructions,
      createdTimestamp: meatball.created_timestamp,
      editedTimestamp: meatball.edited_timestamp,
    } as MeatballDTO;
  }
}
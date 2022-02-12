import { Visualization } from './Visualization';

interface CreateVisualizationDTO{
    ip:string
    fbId: string;
}

export async function createVisualization(dto:CreateVisualizationDTO) {
  const { ip, fbId } = dto;
  const visualization = Visualization
    .create({ fbId, ip });

  return visualization.save();
}

import { Interaction } from './Interaction';

export async function createInteraction(data:any, ip:string) {
  const interaction = Interaction.create({ ip, data });
  return interaction.save();
}

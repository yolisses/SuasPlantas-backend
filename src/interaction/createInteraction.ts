import { isBrowser } from '../request/isBroswer';
import { Interaction } from './Interaction';

export async function createInteraction(data:any, ip:string, ua:string) {
  if (!isBrowser(ua)) return null;
  const interaction = Interaction.create({ ip, data });
  return interaction.save();
}

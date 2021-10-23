import { PlantId } from "plant/Plant";
import { UserId } from "user/User";
import { error } from "utils/error";
import { Like } from "./Like";

export async function removeLikeOnPlantService(
  userId: UserId,
  plantId: PlantId
) {
  const like = await Like.findOne({ where: { userId, plantId } });
  if (like) {
    if (like.userId !== userId) error(403, "Unauthorized like remotion");
    await like.softRemove();
    return like;
  }
}

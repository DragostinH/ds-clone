import client from "../app/libs/prismadb.js";
import cron from "node-cron";

const cleanEmptyConversations = async () => {
  try {
    // test with a threshold of the last 10 seconds
    const threshold = new Date(Date.now() - 10000);
    console.log("[CLEAN_EMPTY_CONVERSATIONS] Threshold", threshold);

    // get all empty conversations
    const conversations = await client.conversation.findMany({
      where: {
        messages: {
          none: {},
        },
        lastMessageAt: {
          lte: threshold,
        },
      },
    });

    console.log("[CLEAN_EMPTY_CONVERSATIONS] Found empty conversations", conversations);

    if (conversations.length === 0) {
      console.log("[CLEAN_EMPTY_CONVERSATIONS] No empty conversations found");
      return;
    }

    // delete all empty conversations
    const deleteConversations = await client?.conversation.deleteMany({
      where: {
        id: {
          in: conversations.map((conversation) => conversation.id),
        },
      },
    });
  } catch (error) {
    console.log("[CLEAN_EMPTY_CONVERSATIONS]", error);
  }
};

// run every 30 seconds
cron.schedule("*/5 * * * * *", () => {
  console.log("[CRON] Running cleanEmptyConversations task");
  cleanEmptyConversations()
    .then(() => {
      console.log("[CRON] cleanEmptyConversations task completed");
    })
    .catch((error) => {
      console.log("[CRON] cleanEmptyConversations task failed", error);
    });
});

console.log("[CRON] Scheduled cleanEmptyConversations task");
// cleanEmptyConversations();

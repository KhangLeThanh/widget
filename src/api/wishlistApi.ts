const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const wishlistApi = {
  async createStack(stack: any) {
    await delay(500);
    if (Math.random() < 0.1) throw new Error("Network error");
    return stack;
  },

  async deleteStack(id: string) {
    await delay(400);
    return id;
  },

  async addCard(card: any) {
    await delay(400);
    return card;
  },

  async removeCard(id: string) {
    await delay(400);
    return id;
  },
};

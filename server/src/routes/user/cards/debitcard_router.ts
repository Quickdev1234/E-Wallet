import Elysia, { t } from "elysia";
import { UserModel } from "../../../models/user/user-model";
import { DebitCardModel } from "../../../models/cards/debitcard-model";

const DebitCardRouter = new Elysia({
  prefix: "/debitcard",
  detail: {
    tags: ["Debit Card Management"],
  },
})

  .post(
    "/create",
    async ({ set, body }) => {
      try {
        const {
          userId,
          cardNumber,
          cardHolderName,
          expiryDate,
          ccv,
          bankName,
        } = body;

        const isUserExist = await UserModel.findById(userId);

        if (!isUserExist) {
          set.status = 400;
          return {
            message: "User Not Found",
          };
        }

        const card = new DebitCardModel({
          userId,
          cardNumber,
          cardHolderName,
          expiryDate,
          ccv,
          bankName,
        });

        await card.save();

        set.status = 201;

        return {
          message: "Card Added Successfully ",
          success: true,
        };
      } catch (error) {
        set.status = 500;
        return {
          message: error,
        };
      }
    },

    {
      body: t.Object({
        userId: t.String({
          examples: ["64a3d84c2d3c1b2a08930b32"],
        }),
        cardNumber: t.String({
          examples: ["1234567890123456"],
        }),
        cardHolderName: t.String({
          examples: ["John Doe"],
        }),
        expiryDate: t.String({
          examples: ["12/25"],
        }),

        ccv: t.String({
          examples: ["123"],
        }),
        bankName: t.String({
          examples: ["Bank of America"],
        }),
      }),
      detail: {
        summary: "Create Debit Card",
        description: "Create a new Debit card",
      },
    }
  )
  .get(
    "/allcards",
    async ({ query, set }) => {
      try {
        const { page, limit, userId } = query;

        const isUserExist = await UserModel.findById(userId);

        if (!isUserExist) {
          set.status = 400;
          return {
            message: "User Not Found",
          };
        }

        const cards = await DebitCardModel.find({ userId })
          .select("+cardNumber +ccv")
          .skip((Number(page) - 1) * Number(limit))
          .limit(Number(limit))
          .sort({ createdAt: -1 })
          .lean();

        const count = await DebitCardModel.countDocuments({ userId });

        const decryptedCards = cards.map((card: any) => {
          try {
            const cardDoc: any = new DebitCardModel(card);
            return {
              ...cardDoc.decryptCardDetails(),
              _id: card._id,
              userId: card.userId,
              createdAt: card.createdAt,
              updatedAt: card.updatedAt,
              __v: card.__v,
            };
          } catch (error) {
            console.error(`Failed to decrypt card ${card._id}:`, error);
            return {
              ...card,
              cardNumber: "DECRYPTION_FAILED",
              ccv: "DECRYPTION_FAILED",
            };
          }
        });

        set.status = 200;
        return {
          message: "cards fetched",
          Cards: decryptedCards,
          count,
        };
      } catch (error: any) {
        console.log(error);
        set.status = 500;
        return {
          message: error.message || "Internal server error",
        };
      }
    },
    {
      query: t.Object({
        page: t.String({
          examples: ["1"],
        }),
        limit: t.String({
          examples: ["10"],
        }),
        userId: t.String({
          examples: ["64a3d84c2d3c1b2a08930b32"],
        }),
      }),
      detail: {
        summary: "Get All Debit Cards with Sensitive Data",
        description:
          "Get all Debit cards of a user including decrypted sensitive information",
      },
    }
  )
  .put(
    "/edit",
    async ({ set, body, query }) => {
      try {
        const { cardId } = query;
        const {
          userId,
          cardNumber,
          expiryDate,
          ccv,
          cardHolderName,
          bankName,
        } = body;

        const existingCard = await DebitCardModel.findOne({
          _id: cardId,
          userId,
        });

        if (!existingCard) {
          set.status = 400;
          return {
            message: "Card Not Found",
          };
        }
        existingCard.cardNumber = cardNumber;
        existingCard.expiryDate = expiryDate;
        existingCard.ccv = ccv;
        existingCard.cardHolderName = cardHolderName;
        existingCard.bankName = bankName;

        await existingCard.save();

        set.status = 200;

        return {
          message: "Card Updated Successfully",
          success: true,
        };
      } catch (error: any) {
        console.log(error);
        set.status = 500;
        return {
          message: error,
        };
      }
    },
    {
      detail: {
        summary: "Edit Debit Card",
        description: "Edit a Debit card of a user",
      },
      query: t.Object({
        cardId: t.String({
          examples: ["64a3d84c2d3c1b2a08930b32"],
        }),
      }),
      body: t.Object({
        userId: t.String({
          examples: ["64a3d84c2d3c1b2a08930b32"],
        }),
        cardNumber: t.String({
          examples: ["1234567890123456"],
        }),
        cardHolderName: t.String({
          examples: ["John Doe"],
        }),
        expiryDate: t.String({
          examples: ["12/25"],
        }),

        ccv: t.String({
          examples: ["123"],
        }),
        bankName: t.String({
          examples: ["Bank of America"],
        }),
      }),
    }
  )
  .delete(
    "/delete",
    async ({ set, query }) => {
      try {
        const { cardId } = query;

        const existingCard = await DebitCardModel.findOneAndDelete({
          _id: cardId,
        });

        if (!existingCard) {
          set.status = 400;
          return {
            message: "Card Not Found",
          };
        }

        set.status = 200;

        return {
          message: "Card Deleted Successfully",
          success: true,
        };
      } catch (error: any) {
        console.log(error);
        set.status = 500;
        return {
          message: error,
        };
      }
    },
    {
      detail: {
        summary: "Delete Debit Card",
        description: "Delete a Debit card of a user",
      },
    }
  );

export { DebitCardRouter };

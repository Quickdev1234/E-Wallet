import Elysia, { t } from "elysia";
import { UserModel } from "../../models/user/user-model";
import { CardModel } from "../../models/card/card-model";

const CardRouter = new Elysia({
  prefix: "/card",
  detail: {
    tags: ["Card Management"],
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
          cardType,
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

        const card = new CardModel({
          userId,
          cardNumber,
          cardHolderName,
          expiryDate,
          cardType,
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
        cardType: t.String({
          examples: ["debit"],
        }),
        ccv: t.String({
          examples: ["123"],
        }),
        bankName: t.String({
          examples: ["Bank of America"],
        }),
      }),
      detail: {
        summary: "Create Card",
        description: "Create a new card",
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

        // Modified query to include sensitive fields
        const cards = await CardModel.find({ userId })
          .select("+cardNumber +ccv") // Explicitly include sensitive fields
          .skip((Number(page) - 1) * Number(limit))
          .limit(Number(limit))
          .sort({ createdAt: -1 })
          .lean();

        const count = await CardModel.countDocuments({ userId });

        const decryptedCards = cards.map((card: any) => {
          try {
            const cardDoc: any = new CardModel(card);
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
        summary: "Get All Cards with Sensitive Data",
        description:
          "Get all cards of a user including decrypted sensitive information",
      },
    }
  );
// .get(
//   "/allcards",
//   async ({ query, set }) => {
//     try {
//       const { page, limit, userId } = query;

//       const isUserExist = await UserModel.findById(userId);

//       if (!isUserExist) {
//         set.status = 400;
//         return {
//           message: "User Not Found",
//         };
//       }

//       const Cards = await CardModel.find({ userId })
//         .skip((Number(page) - 1) * Number(limit))
//         .limit(Number(limit))
//         .sort({ createdAt: -1 })
//         .lean();

//       const count = await CardModel.countDocuments({ userId });

//       set.status = 200;

//       return {
//         message: "cards fetched",
//         Cards,
//         count,
//       };
//     } catch (error: any) {
//       console.log(error);
//       set.status = 500;
//       return {
//         message: error,
//       };
//     }
//   },
//   {
//     query: t.Object({
//       page: t.String({
//         examples: ["1"],
//       }),
//       limit: t.String({
//         examples: ["10"],
//       }),
//       userId: t.String({
//         examples: ["64a3d84c2d3c1b2a08930b32"],
//       }),
//     }),
//     detail: {
//       summary: "Get All Cards",
//       description: "Get all cards of a user",
//     },
//   }
// );
export { CardRouter };

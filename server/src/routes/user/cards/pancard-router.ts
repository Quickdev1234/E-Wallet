import Elysia, { t } from "elysia";
import { UserModel } from "../../../models/user/user-model";
import { PancardModel } from "../../../models/cards/pancard-model";

const PanCardRouter = new Elysia({
  prefix: "/pancard",
  detail: {
    tags: ["Pan Card Management"],
  },
})

  .post(
    "/create",
    async ({ set, body }) => {
      try {
        const {
          userId,
          panNumber,
          fullName,
          dateOfBirth,
          type,
          fatherName,
          address,
        } = body;

        const isUserExist = await UserModel.findById(userId);

        if (!isUserExist) {
          set.status = 400;
          return {
            message: "User Not Found",
          };
        }
        const isPanExist = await PancardModel.findOne({
          panNumber,
        });

        if (isPanExist) {
          set.status = 400;
          return {
            message: "Pan card already exist",
          };
        }

        const card = new PancardModel({
          userId,
          panNumber,
          fullName,
          dateOfBirth,
          type,
          fatherName,
          address,
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
          examples: ["123456789"],
        }),
        panNumber: t.String({
          examples: ["ABCDE1234F"],
        }),
        fullName: t.String({
          examples: ["John Doe"],
        }),
        dateOfBirth: t.String({
          examples: ["1990-01-01"],
        }),
        type: t.String({
          examples: ["Individual"],
        }),
        fatherName: t.String({
          examples: ["John Doe"],
        }),
        address: t.String({
          examples: ["123 Main Street, City, Country"],
        }),
      }),
      detail: {
        summary: "Create Pan Card",
        description: "Create a new Pan card",
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

        const cards = await PancardModel.find({ userId })
          .skip((Number(page) - 1) * Number(limit))
          .limit(Number(limit))
          .sort({ createdAt: -1 })
          .lean();

        const count = await PancardModel.countDocuments({ userId });

        set.status = 200;
        return {
          message: "cards fetched",
          Cards: cards,
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
        summary: "Get All Pan Cards with Sensitive Data",
        description: "Get all Pan cards of a user ",
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
          panNumber,
          fullName,
          dateOfBirth,
          type,
          fatherName,
          address,
        } = body;

        const existingCard = await PancardModel.findOne({
          _id: cardId,
          userId,
        });

        if (!existingCard) {
          set.status = 400;
          return {
            message: "Card Not Found",
          };
        }
        existingCard.panNumber = panNumber;
        existingCard.fullName = fullName;
        existingCard.dateOfBirth = new Date(dateOfBirth);
        existingCard.type = type;
        existingCard.fatherName = fatherName;
        existingCard.address = address;

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
        summary: "Edit Pan Card",
        description: "Edit a Pan card of a user",
      },
      query: t.Object({
        cardId: t.String({
          examples: ["64a3d84c2d3c1b2a08930b32"],
        }),
      }),
      body: t.Object({
        userId: t.String({
          examples: ["123456789"],
        }),
        panNumber: t.String({
          examples: ["ABCDE1234F"],
        }),
        fullName: t.String({
          examples: ["John Doe"],
        }),
        dateOfBirth: t.String({
          examples: ["1990-01-01"],
        }),
        type: t.String({
          examples: ["Individual"],
        }),
        fatherName: t.String({
          examples: ["John Doe"],
        }),
        address: t.String({
          examples: ["123 Main Street, City, Country"],
        }),
      }),
    }
  )
  .delete(
    "/delete",
    async ({ set, query }) => {
      try {
        const { cardId } = query;

        const existingCard = await PancardModel.findOneAndDelete({
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
        summary: "Delete Pan Card",
        description: "Delete a Pan card of a user",
      },
    }
  );

export { PanCardRouter };

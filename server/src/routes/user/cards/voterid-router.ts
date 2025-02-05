import Elysia, { t } from "elysia";
import { UserModel } from "../../../models/user/user-model";
import { VoterIdModel } from "../../../models/cards/voterid-model";

const VoterIdRouter = new Elysia({
  prefix: "/voterid",
  detail: {
    tags: ["Voter Id Management"],
  },
})

  .post(
    "/create",
    async ({ set, body }) => {
      try {
        const { userId, voterId, fullName, dateOfBirth, fatherName, address } =
          body;

        const isUserExist = await UserModel.findById(userId);

        if (!isUserExist) {
          set.status = 400;
          return {
            message: "User Not Found",
          };
        }
        const isVoteridExist = await VoterIdModel.findOne({
          voterId,
        });

        if (isVoteridExist) {
          set.status = 400;
          return {
            message: "Voter Id already exist",
          };
        }

        const card = new VoterIdModel({
          userId,
          voterId,
          fullName,
          dateOfBirth,
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
        voterId: t.String({
          examples: ["ABCDE1234F"],
        }),
        fullName: t.String({
          examples: ["John Doe"],
        }),
        dateOfBirth: t.String({
          examples: ["1990-01-01"],
        }),

        fatherName: t.String({
          examples: ["John Doe"],
        }),
        address: t.String({
          examples: ["123 Main Street, City, Country"],
        }),
      }),
      detail: {
        summary: "Create Voter id",
        description: "Create a new Voter id",
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

        const cards = await VoterIdModel.find({ userId })
          .skip((Number(page) - 1) * Number(limit))
          .limit(Number(limit))
          .sort({ createdAt: -1 })
          .lean();

        const count = await VoterIdModel.countDocuments({ userId });

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
        summary: "Get All  Voter Id with Sensitive Data",
        description: "Get all Voter Id of a user ",
      },
    }
  )
  .put(
    "/edit",
    async ({ set, body, query }) => {
      try {
        const { cardId } = query;
        const { userId, voterId, fullName, dateOfBirth, fatherName, address } =
          body;

        const existingCard = await VoterIdModel.findOne({
          _id: cardId,
          userId,
        });

        if (!existingCard) {
          set.status = 400;
          return {
            message: "Card Not Found",
          };
        }
        existingCard.voterId = voterId;
        existingCard.fullName = fullName;
        existingCard.dateOfBirth = new Date(dateOfBirth);
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
        summary: "Edit Voter Id",
        description: "Edit a Voter Id  of a user",
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
        voterId: t.String({
          examples: ["ABCDE1234F"],
        }),
        fullName: t.String({
          examples: ["John Doe"],
        }),
        dateOfBirth: t.String({
          examples: ["1990-01-01"],
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

        const existingCard = await VoterIdModel.findOneAndDelete({
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
        summary: "Delete Voter Id",
        description: "Delete a Voter Id of a user",
      },
    }
  );

export { VoterIdRouter };

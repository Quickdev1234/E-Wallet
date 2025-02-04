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
  );

export { VoterIdRouter };

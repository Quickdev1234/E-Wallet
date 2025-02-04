import Elysia, { t } from "elysia";
import { UserModel } from "../../../models/user/user-model";
import { AadhaarcardModel } from "../../../models/cards/aadhaarcard-model";

const AadhaarCardRouter = new Elysia({
  prefix: "/aadhaarcard",
  detail: {
    tags: ["Aadhar Card Management"],
  },
})

  .post(
    "/create",
    async ({ set, body }) => {
      try {
        const {
          userId,
          aadhaarNumber,
          fullName,
          dateOfBirth,
          mobileNumber,
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
        const isPanExist = await AadhaarcardModel.findOne({
          aadhaarNumber,
        });

        if (isPanExist) {
          set.status = 400;
          return {
            message: "Pan card already exist",
          };
        }

        const card = new AadhaarcardModel({
          userId,
          aadhaarNumber,
          fullName,
          dateOfBirth,
          mobileNumber,
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
        aadhaarNumber: t.String({
          examples: ["ABCDE1234F"],
        }),
        fullName: t.String({
          examples: ["John Doe"],
        }),
        dateOfBirth: t.String({
          examples: ["1990-01-01"],
        }),
        mobileNumber: t.String({
          examples: ["1234567890"],
        }),
        fatherName: t.String({
          examples: ["John Doe"],
        }),
        address: t.String({
          examples: ["123 Main Street, City, Country"],
        }),
      }),
      detail: {
        summary: "Create Aadhaar Card",
        description: "Create a new Aadhaar card",
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

        const cards = await AadhaarcardModel.find({ userId })
          .skip((Number(page) - 1) * Number(limit))
          .limit(Number(limit))
          .sort({ createdAt: -1 })
          .lean();

        const count = await AadhaarcardModel.countDocuments({ userId });

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
        summary: "Get All Aadhaar Cards with Sensitive Data",
        description: "Get all Aadhaar cards of a user ",
      },
    }
  );

export { AadhaarCardRouter };

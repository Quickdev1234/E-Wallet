import Elysia, { t } from "elysia";
import { UserModel } from "../../../models/user/user-model";
import { DrivingLicenseModel } from "../../../models/cards/drivinglicence-model";

const DrivingLicenseRouter = new Elysia({
  prefix: "/drivinglicense",
  detail: {
    tags: ["Driving License Management"],
  },
})

  .post(
    "/create",
    async ({ set, body }) => {
      try {
        const {
          userId,
          licenseNumber,
          fullName,
          dateOfBirth,
          address,
          issueDate,
          expiryDate,
        } = body;

        const isUserExist = await UserModel.findById(userId);

        if (!isUserExist) {
          set.status = 400;
          return {
            message: "User Not Found",
          };
        }
        const isDLExist = await DrivingLicenseModel.findOne({
          licenseNumber,
        });

        if (isDLExist) {
          set.status = 400;
          return {
            message: " card already exist",
          };
        }

        const card = new DrivingLicenseModel({
          userId,
          licenseNumber,
          fullName,
          dateOfBirth,
          issueDate,
          expiryDate,
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
        licenseNumber: t.String({
          examples: ["ABCDE1234F"],
        }),
        fullName: t.String({
          examples: ["John Doe"],
        }),
        dateOfBirth: t.String({
          examples: ["1990-01-01"],
        }),
        issueDate: t.String({
          examples: ["1990-01-01"],
        }),
        expiryDate: t.String({
          examples: ["1990-01-01"],
        }),
        address: t.String({
          examples: ["123 Main Street, City, Country"],
        }),
      }),
      detail: {
        summary: "Create Driving License",
        description: "Create a new Driving License",
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

        const cards = await DrivingLicenseModel.find({ userId })
          .skip((Number(page) - 1) * Number(limit))
          .limit(Number(limit))
          .sort({ createdAt: -1 })
          .lean();

        const count = await DrivingLicenseModel.countDocuments({ userId });

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
        summary: "Get All  Driving License with Sensitive Data",
        description: "Get all  Driving License of a user ",
      },
    }
  );

export { DrivingLicenseRouter };

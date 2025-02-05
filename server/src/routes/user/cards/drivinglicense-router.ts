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
  )
  .put(
    "/edit",
    async ({ set, body, query }) => {
      try {
        const { cardId } = query;
        const {
          userId,
          licenseNumber,
          fullName,
          dateOfBirth,
          issueDate,
          expiryDate,
          address,
        } = body;

        const existingCard = await DrivingLicenseModel.findOne({
          _id: cardId,
          userId,
        });

        if (!existingCard) {
          set.status = 400;
          return {
            message: "Card Not Found",
          };
        }
        existingCard.licenseNumber = licenseNumber;
        existingCard.fullName = fullName;
        existingCard.dateOfBirth = new Date(dateOfBirth);
        existingCard.issueDate = issueDate;
        existingCard.expiryDate = expiryDate;
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
        summary: "Edit Driving License ard",
        description: "Edit a Driving License  of a user",
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
    }
  )
  .delete(
    "/delete",
    async ({ set, query }) => {
      try {
        const { cardId } = query;

        const existingCard = await DrivingLicenseModel.findOneAndDelete({
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
        summary: "Delete Driver License",
        description: "Delete a Driver License of a user",
      },
    }
  );

export { DrivingLicenseRouter };

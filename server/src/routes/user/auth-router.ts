import Elysia, { t } from "elysia";
import { UserModel } from "../../models/user/user-model";
import { jwt } from "../../lib/jwt";

const UserAuthRouter = new Elysia({
  prefix: "/auth",
  detail: {
    tags: ["User Auth"],
  },
})
  .post(
    "/register",
    async ({ set, body }) => {
      try {
        const { userName, email, password, phoneNumber } = body;

        if (!userName || !email || !password || !phoneNumber) {
          set.status = 400;
          return {
            message: "All fields are required",
          };
        }

        let isUserExist = await UserModel.findOne({
          email,
          phoneNumber,
        });

        if (isUserExist) {
          set.status = 400;
          return {
            message: "User already exist",
            success: false,
          };
        }

        const user = new UserModel({
          userName,
          phoneNumber,
          email,
          password,
        });

        user.lastLogin = new Date();
        await user.save();
        set.status = 201;

        return {
          message: "User registered successfully",
          success: true,
        };
      } catch (error: any) {
        console.log(error);
        set.status = 500;
        return {
          message: error.message,
        };
      }
    },
    {
      body: t.Object({
        userName: t.String({
          examples: ["John"],
        }),
        email: t.String({
          examples: ["jhon@gmail.com"],
        }),
        password: t.String({
          examples: ["12345678"],
        }),
        phoneNumber: t.String({
          examples: ["9074914469"],
        }),
      }),
      detail: {
        summary: "User Registration",
        description: "Register a new user",
      },
    }
  )
  .post(
    "/login",
    async ({ set, body }) => {
      try {
        const { email, password } = body;

        const isUserExist = await UserModel.findOne({
          email,
        });

        if (!isUserExist) {
          set.status = 400;
          return {
            message: "User not found",
          };
        }

        let isPasswordMatched = await Bun.password.verify(
          password,
          isUserExist.password
        );

        if (!isPasswordMatched) {
          set.status = 400;
          return {
            message: "Invalid password",
          };
        }

        const token = jwt.sign({
          id: isUserExist._id,
          email: isUserExist.email,
        });

        isUserExist.lastLogin = new Date();
        isUserExist.save();

        return {
          message: "Login Successful",
          success: true,
          token,
          id: isUserExist._id,
          userName: isUserExist.userName,
        };
      } catch (error: any) {
        console.log(error);
        set.status = 500;
        return {
          message: error.message,
        };
      }
    },
    {
      body: t.Object({
        email: t.String({
          examples: ["jhon@gmail.com"],
        }),
        password: t.String({
          examples: ["12345678"],
        }),
      }),
      detail: {
        summary: "User Login",
        description: "User Login",
      },
    }
  )
  .post(
    "/forget-password",
    async ({ set, body }) => {
      try {
        const { email } = body;

        const isUserExist = await UserModel.findOne({
          email,
        });

        if (!isUserExist) {
          set.status = 400;
          return {
            message: "User not found",
          };
        }

        const token = jwt.sign({
          id: isUserExist._id,
          email: isUserExist.email,
        });

        set.status = 200;

        return {
          message: "user found",
          success: true,
          token,
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
      body: t.Object({
        email: t.String({
          examples: ["jhon@gmail.com"],
        }),
      }),
      detail: {
        summary: "Forget Password",
        description: "Forget Password",
      },
    }
  )
  .post(
    "/reset-password",
    async ({ set, body }) => {
      try {
        const { password, token } = body;

        const decoded: any = jwt.verify(token);

        const { id } = decoded;

        if (!decoded) {
          set.status = 400;
          return {
            message: "Invalid token try again",
          };
        }

        const isUserExist = await UserModel.findById(id);

        if (!isUserExist) {
          set.status = 400;
          return {
            message: "User not found",
          };
        }

        isUserExist.password = password;
        await isUserExist.save();

        set.status = 200;

        return {
          message: "Password reset successfully",
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
      body: t.Object({
        password: t.String({
          examples: ["12345678"],
        }),
        token: t.String({
          examples: ["12345678"],
        }),
      }),
      detail: {
        summary: "Reset Password",
        description: "Reset Password",
      },
    }
  );

export { UserAuthRouter };

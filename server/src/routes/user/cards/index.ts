import Elysia from "elysia";
import { DebitCardRouter } from "./debitcard_router";
import { CreditCardRouter } from "./creditcard-router";
import { PanCardRouter } from "./pancard-router";
import { AadhaarCardRouter } from "./aadhaarcard-router";
import { DrivingLicenseRouter } from "./drivinglicense-router";
import { VoterIdRouter } from "./voterid-router";

const CardRouter = new Elysia({
  prefix: "/card",
})
  .use(DebitCardRouter)
  .use(CreditCardRouter)
  .use(PanCardRouter)
  .use(AadhaarCardRouter)
  .use(DrivingLicenseRouter)
  .use(VoterIdRouter);

export { CardRouter };

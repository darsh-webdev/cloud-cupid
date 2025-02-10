import { verifyEmail } from "@/app/actions/authActions";
import CardWrapper from "@/components/CardWrapper";
import ResultMessage from "@/components/ResultMessage";
import { ActionResult } from "@/types";
import { MdOutlineMailOutline } from "react-icons/md";

const VerifyEmailPage = async ({
  searchParams,
}: {
  searchParams: { token: string };
}) => {
  const result: ActionResult<string> | null = searchParams.token
    ? await verifyEmail(searchParams.token)
    : { status: "error", error: "No verification token provided" };

  return (
    <CardWrapper
      headerText="Verify your email address"
      headerIcon={MdOutlineMailOutline}
      footer={<ResultMessage result={result} />}
    />
  );
};

export default VerifyEmailPage;

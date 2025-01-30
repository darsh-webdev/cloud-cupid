import { Button } from "@nextui-org/react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

const SocialLogin = () => {
  const providers = [
    {
      name: "google",
      icon: <FcGoogle size={20} />,
      text: "Google",
    },
    {
      name: "github",
      icon: <FaGithub size={20} />,
      text: "Github",
    },
  ];

  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: "/members",
    });
  };

  return (
    <div className="flex items-center w-full gap-2">
      {providers.map((provider) => (
        <Button
          key={provider.name}
          size="lg"
          fullWidth
          variant="bordered"
          onPress={() => onClick(provider.name as "google" | "github")}
        >
          {provider.icon}
        </Button>
      ))}
    </div>
  );
};

export default SocialLogin;

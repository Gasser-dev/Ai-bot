import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import type { RootState } from "@/redux";
import { rdx_login } from "@/redux/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactElement;
  items?: MenuItem[];
}

interface Navbar1Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  mobileExtraLinks?: {
    name: string;
    url: string;
  }[];
  auth?: {
    login: {
      text: string;
      url: string;
    };
    signup: {
      text: string;
      url: string;
    };
  };
}

const Navbar1 = ({
  logo = {
    url: "#",
    src: "#",
    alt: "logo",
    title: "AiBot",
  },
  mobileExtraLinks = [
    { name: "Press", url: "#" },
    { name: "Contact", url: "#" },
    { name: "Imprint", url: "#" },
    { name: "Sitemap", url: "#" },
  ],
  auth = {
    login: { text: "Log in", url: "#" },
    signup: { text: "Sign up", url: "#" },
  },
}: Navbar1Props) => {
  const isloggedIn = useAppSelector((state: RootState) => state.userSlice.loggedIn)
  const dispatch = useAppDispatch()
  const data = JSON.parse(localStorage.getItem("user") || "{}")
  const navigate = useNavigate()
  const name = data?.name
  const handle_logout = () => {
    dispatch(rdx_login(false))
    localStorage.removeItem("user")
    toast.success("Logged out successfully")
    setTimeout(() => {
      window.location.href = "/"
    }, 500)
  }
  return (
    <section className="py-4">
      <div className="container min-w-screen px-4">
        <nav className="hidden justify-between lg:flex">
          {/* logo */}
          <div className="flex items-center gap-6">
            <a href={logo.url} className="flex items-center gap-2">
              <img src={logo.src} className="w-8" alt={logo.alt} />
              <span className="text-lg text-white font-semibold">{logo.title}</span>
            </a>
          </div>
          {
            !isloggedIn ? (
              <div className="flex gap-2">
              <Button onClick={() => navigate("/login")} asChild variant="outline" size="sm">
                <a>{auth.login.text}</a>
              </Button>
              <Button onClick={() => navigate("/signin")} asChild size="sm">
                <a>{auth.signup.text}</a>
              </Button>
            </div>
            )
            :
            <div className="flex gap-2 items-center">
              <p className="text-white">welcome back {name}</p>
              <Button onClick={handle_logout} variant="outline" role="button">
                Logout
              </Button>
            </div>
          }
        </nav>
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <a href={logo.url} className="flex items-center gap-2">
              <img src={logo.src} className="w-8" alt={logo.alt} />
              <span className="text-lg text-white font-semibold">{logo.title}</span>
            </a>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <a href={logo.url} className="flex items-center gap-2">
                      <img src={logo.src} className="w-8" alt={logo.alt} />
                      <span className="text-lg font-semibold">
                        {logo.title}
                      </span>
                    </a>
                  </SheetTitle>
                </SheetHeader>
                <div className="my-6 flex flex-col gap-6">
                  <div className="border-t py-4">
                    <div className="grid grid-cols-2 justify-start">
                      {mobileExtraLinks.map((link, idx) => (
                        <a
                          key={idx}
                          className="inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-accent-foreground"
                          href={link.url}
                        >
                          {link.name}
                        </a>
                      ))}
                    </div>
                  </div>
                  {
            !isloggedIn ? (
              <div className="flex flex-col gap-3">
              <Button asChild variant="outline">
                <a href={auth.login.url}>{auth.login.text}</a>
              </Button>
              <Button asChild >
                <a href={auth.signup.url}>{auth.signup.text}</a>
              </Button>
            </div>
            )
            :
            <div className="flex flex-col items-center gap-3">
              <p>welcome back {name}</p>
              <Button onClick={handle_logout} variant="outline">
                Logout
              </Button>
            </div>
          }
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Navbar1 };

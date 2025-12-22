import Image from "next/image";
import { ModeToggle } from "../ui/ModeToggle";
import Link from "next/link";

export function Navbar() {
  return (
    <div className="max-w-7xl relative mx-auto pt-2 z-9">
      <div className="flex justify-between items-center ">
        {/* logo */}
        <Link href={"/"} className="cursor-pointer ">
          <Image
            className="cursor-pointer hover:scale-110 transition-all duration-300"
            src={"/hero.png"}
            width={50}
            height={50}
            alt="Brand-logo"
          />
        </Link>

        {/* theme */}
        <ModeToggle />
      </div>
    </div>
  );
}
